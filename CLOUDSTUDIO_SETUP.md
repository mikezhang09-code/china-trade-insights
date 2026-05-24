# CloudStudio Vite Dev Server Setup Guide

When running a Vite dev server inside CloudStudio, the built-in preview/browser accesses the app via a reverse proxy at `https://<space-key>.<preview-domain>/proxy/<port>/`. This requires specific Vite configuration to work properly.

## Problem Summary

CloudStudio runs workspaces in containers. The IDE's built-in preview browser and external browsers **cannot reach `localhost`** inside the container. The `/proxy/<port>/` path routes traffic through CloudStudio's reverse proxy to the container's port.

This causes several issues with a default Vite setup:

1. **Connection refused** — Vite only listening on IPv6
2. **Host blocked** — Vite rejects requests from the proxy host
3. **Asset 404s** — Vite generates paths that bypass the proxy
4. **Route not found** — React Router doesn't work with the proxy path prefix

## Fixes

### 1. Host Binding — Use `0.0.0.0`

CloudStudio's proxy connects via IPv4. Setting `host: "::"` (IPv6 only) causes "connection refused".

```ts
server: {
  host: "0.0.0.0",
}
```

### 2. Allowed Hosts — Allow the Proxy Host

Vite rejects requests from unknown hosts. The CloudStudio proxy host must be explicitly allowed.

```ts
const spaceKey = process.env.X_IDE_SPACE_KEY || "";
const previewDomain = process.env.X_IDE_PREVIEW_DOMAIN || "";
const proxyHost = spaceKey && previewDomain ? `${spaceKey}.${previewDomain}` : "";

server: {
  allowedHosts: proxyHost ? [proxyHost] : [],
}
```

### 3. Base Path — Include `/proxy/<port>/` Prefix

The browser loads the page at `/proxy/8080/`, but Vite by default generates asset paths like `/src/main.tsx` which resolve to `https://host/src/main.tsx` — bypassing the proxy entirely.

**Important:** The CloudStudio proxy **strips** the `/proxy/8080/` prefix before forwarding to Vite. So you need both `base` and a rewrite middleware:

- `base: "/proxy/8080/"` — Makes Vite generate HTML with paths like `/proxy/8080/src/main.tsx`
- Rewrite middleware — Re-adds `/proxy/8080/` to incoming requests that the proxy stripped

```ts
{
  base: "/proxy/8080/",
  server: {
    origin: proxyHost ? `https://${proxyHost}` : "",
  },
  plugins: [
    // Rewrite middleware
    proxyHost && {
      name: "cloudstudio-proxy-rewrite",
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          const url = req.url || "/";
          if (!url.startsWith("/proxy/8080")) {
            req.url = "/proxy/8080" + url;
          }
          next();
        });
      },
    },
  ].filter(Boolean),
}
```

Also set `server.origin` to the external URL so the HMR websocket connects correctly.

### 4. React Router — Conditional Router for CloudStudio vs Production

`BrowserRouter` doesn't work behind the CloudStudio proxy because the proxy strips `/proxy/8080/` before forwarding to Vite. React Router sees the URL as `/` but `basename="/proxy/8080/"` expects it to start with that prefix — resulting in a blank screen or 404.

The fix is to use `HashRouter` in CloudStudio dev mode and `BrowserRouter` in production. `HashRouter` uses `#` fragments which are never stripped by proxies.

**Important:** Do NOT pass `basename` to `HashRouter` — it causes the same mismatch error since the hash URL doesn't start with `/proxy/8080/`.

```tsx
import { BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";

const isCloudStudio = import.meta.env.BASE_URL !== "/";
const Router = isCloudStudio ? HashRouter : BrowserRouter;

// In JSX — only pass basename for BrowserRouter (production)
<Router {...(!isCloudStudio ? { basename: import.meta.env.BASE_URL } : {})}>
  <Routes>...</Routes>
</Router>
```

**Why this is safe for GitHub Pages:** In production builds, `BASE_URL` is `"/"`, so `isCloudStudio` is `false` and `BrowserRouter` is used with `basename="/"`. No URL structure changes — your GitHub Pages routes work exactly as before.

### 5. CSS `@import` Must Precede `@tailwind` Directives

Move `@import` statements to the top of your CSS file, before any `@tailwind` directives:

```css
/* Correct order */
@import url('https://fonts.googleapis.com/css2?family=...');

@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Complete Working `vite.config.ts`

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

const spaceKey = process.env.X_IDE_SPACE_KEY || "";
const previewDomain = process.env.X_IDE_PREVIEW_DOMAIN || "";
const proxyHost = spaceKey && previewDomain ? `${spaceKey}.${previewDomain}` : "";
const proxyBase = proxyHost ? `/proxy/8080/` : "/";

export default defineConfig(({ mode }) => ({
  base: proxyBase,
  server: {
    host: "0.0.0.0",
    port: 8080,
    origin: proxyHost ? `https://${proxyHost}` : "",
    allowedHosts: proxyHost ? [proxyHost] : [],
  },
  plugins: [
    react(),
    proxyHost && {
      name: "cloudstudio-proxy-rewrite",
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          const url = req.url || "/";
          if (!url.startsWith("/proxy/8080")) {
            req.url = "/proxy/8080" + url;
          }
          next();
        });
      },
    },
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
```

## CloudStudio Environment Variables

| Variable | Example | Purpose |
|---|---|---|
| `X_IDE_SPACE_KEY` | `45d03683cde44598afe34d8f0b21542a` | Workspace identifier |
| `X_IDE_PREVIEW_DOMAIN` | `ap-shanghai2.cloudstudio.club` | Proxy domain |
| `IDE_APP_ACCESS_URL_DOMAIN` | `preview.cloudstudio.work` | Alternative preview domain |
| `__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS` | `.cloudstudio.club` | Vite auto-allowed hosts |

## Access URL Pattern

```
https://<space-key>.<preview-domain>/proxy/<port>/
```

Example:
```
https://45d03683cde44598afe34d8f0b21542a.ap-shanghai2.cloudstudio.club/proxy/8080/
```

## How the Proxy Works

```
Browser                            CloudStudio Proxy              Vite Dev Server
  |                                      |                             |
  | GET /proxy/8080/src/main.tsx         |                             |
  |------------------------------------->|                             |
  |                                      | GET /src/main.tsx           |
  |                                      |---------------------------->|
  |                                      |                             |
  |                                      |  (middleware re-adds prefix)|
  |                                      |  /proxy/8080/src/main.tsx   |
  |                                      |  Vite resolves correctly    |
  |                                      |<----------------------------|
  | <--- 200 (JS content) ---------------|                             |
```

Key insight: The proxy **strips** `/proxy/8080/` before forwarding. The Vite middleware re-adds it so Vite (with `base: "/proxy/8080/"`) can resolve the routes correctly.
