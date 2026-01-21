import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import SectionHeader from "./SectionHeader";
import AnimatedCounter from "./AnimatedCounter";
import { useLanguage } from "@/contexts/LanguageContext";
import { Zap, Sun, Battery, TrendingUp, TrendingDown, Minus } from "lucide-react";

const NewThreeSection = () => {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const products = [
    {
      icon: Zap,
      name: t('electricVehicles'),
      stats: {
        exports: t('evExports'),
        growth: t('evGrowth'),
        trend: "up",
        marketShare: t('evMarketShare'),
      },
      description: t('evDescription'),
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Sun,
      name: t('solarPhotovoltaics'),
      stats: {
        exports: t('solarExports'),
        growth: t('solarGrowth'),
        trend: "down",
        marketShare: t('solarMarketShare'),
      },
      description: t('solarDescription'),
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Battery,
      name: t('lithiumBatteries'),
      stats: {
        exports: t('batteryExports'),
        growth: t('batteryGrowth'),
        trend: "up",
        marketShare: t('batteryMarketShare'),
      },
      description: t('batteryDescription'),
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-background relative" ref={ref}>
      <div className="container mx-auto px-4">
        <SectionHeader
          label={t('sectoralTransformation')}
          title={t('newThree')}
          description={t('newThreeDescription')}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              className="relative group"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <div className="card-gradient border border-border rounded-xl p-6 md:p-8 h-full relative overflow-hidden">
                {/* Gradient accent at top */}
                <div
                  className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${product.color}`}
                />

                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${product.color} flex items-center justify-center mb-6 shadow-lg`}
                >
                  <product.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                  {product.name}
                </h3>

                <p className="text-muted-foreground mb-6">{product.description}</p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/30 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground mb-1">Exports</p>
                    <p className="font-mono font-bold text-foreground">
                      {product.stats.exports}
                    </p>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground mb-1">Growth</p>
                    <div className="flex items-center gap-1">
                      {product.stats.trend === "up" ? (
                        <TrendingUp className="w-4 h-4 text-success" />
                      ) : product.stats.trend === "down" ? (
                        <TrendingDown className="w-4 h-4 text-destructive" />
                      ) : (
                        <Minus className="w-4 h-4 text-muted-foreground" />
                      )}
                      <p
                        className={`font-mono font-bold ${
                          product.stats.trend === "up"
                            ? "text-success"
                            : product.stats.trend === "down"
                            ? "text-destructive"
                            : "text-foreground"
                        }`}
                      >
                        {product.stats.growth}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 bg-primary/5 border border-primary/20 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">Market Position</p>
                  <p className="font-medium text-primary">
                    {product.stats.marketShare}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Combined stat */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="inline-flex flex-col items-center bg-card border border-border rounded-2xl p-8">
            <p className="data-label text-muted-foreground mb-2">
              {t('combinedNewThreeExports')}
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-primary text-lg font-mono">¥</span>
              <AnimatedCounter
                end={1}
                decimals={0}
                className="text-5xl md:text-6xl font-bold text-gradient-gold"
              />
              <span className="text-primary text-2xl font-mono ml-1">{t('trillionPlus')}</span>
            </div>
            <p className="text-muted-foreground mt-2">(~$150B, +29.9% YoY)</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewThreeSection;
