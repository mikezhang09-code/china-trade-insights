import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

const spaceKey = process.env.X_IDE_SPACE_KEY || "";
const previewDomain = process.env.X_IDE_PREVIEW_DOMAIN || "";
const proxyHost = spaceKey && previewDomain ? `${spaceKey}.${previewDomain}` : "";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: proxyHost ? `/proxy/8080/` : "/",
  server: {
    host: "0.0.0.0",
    port: 8080,
    origin: proxyHost ? `https://${proxyHost}` : "",
    allowedHosts: proxyHost ? [proxyHost] : [],
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    // CloudStudio proxy strips /proxy/8080/ prefix before forwarding to Vite.
    // But Vite with base="/proxy/8080/" expects that prefix on all paths.
    // This middleware re-adds the prefix so Vite can resolve correctly.
    {
      name: "cloudstudio-proxy-rewrite",
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          if (!proxyHost) return next();
          const url = req.url || "/";
          // Skip if already has the prefix
          if (url.startsWith("/proxy/8080")) return next();
          // Rewrite Vite asset paths to include the prefix
          req.url = "/proxy/8080" + url;
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
