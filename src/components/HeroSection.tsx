import { motion } from "framer-motion";
import AnimatedCounter from "./AnimatedCounter";
import { TrendingUp, Globe2, Factory } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center hero-glow overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--muted-foreground)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Floating elements */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 rounded-full border border-primary/20"
        animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-40 right-20 w-32 h-32 rounded-full border border-primary/10"
        animate={{ y: [0, 20, 0], rotate: [360, 180, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <motion.div
          className="text-center max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Date badge */}
          <motion.div
            className="inline-flex items-center gap-2 bg-secondary/50 border border-border rounded-full px-4 py-2 mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-muted-foreground font-medium">
              January 2026 Analysis
            </span>
          </motion.div>

          {/* Main headline */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            The Great
            <br />
            <span className="text-gradient-gold">Divergence</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            China's historic trade surplus of <span className="text-primary font-semibold">$1.2 trillion</span> in 2025 
            marks an unprecedented milestone in global trade — the first time any nation has exceeded the 
            trillion-dollar threshold. This is the anatomy of an economic paradox.
          </p>

          {/* Main stat display */}
          <motion.div
            className="flex flex-col items-center mb-16"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="flex items-baseline gap-2">
              <span className="text-primary text-2xl md:text-3xl font-mono">$</span>
              <AnimatedCounter
                end={1.2}
                decimals={1}
                duration={2.5}
                className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-gradient-gold"
              />
              <span className="text-primary text-2xl md:text-4xl font-mono">T</span>
            </div>
            <span className="data-label text-muted-foreground mt-4">
              2025 Trade Surplus
            </span>
          </motion.div>

          {/* Quick stats */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="flex items-center gap-4 bg-card/50 border border-border rounded-lg p-4">
              <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-success" />
              </div>
              <div className="text-left">
                <p className="font-mono text-2xl font-bold text-success">+20%</p>
                <p className="text-sm text-muted-foreground">YoY Growth</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-card/50 border border-border rounded-lg p-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Globe2 className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-mono text-2xl font-bold text-foreground">~10%</p>
                <p className="text-sm text-muted-foreground">of China's GDP</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-card/50 border border-border rounded-lg p-4">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <Factory className="w-6 h-6 text-accent" />
              </div>
              <div className="text-left">
                <p className="font-mono text-2xl font-bold text-foreground">35%</p>
                <p className="text-sm text-muted-foreground">Global Mfg Output</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 1.5, duration: 1.5, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/50 flex justify-center pt-2">
            <div className="w-1.5 h-3 rounded-full bg-primary" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
