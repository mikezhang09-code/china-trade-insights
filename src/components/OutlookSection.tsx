import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { useLanguage } from "@/contexts/LanguageContext";
import { AlertTriangle, TrendingUp, Scale, Globe2 } from "lucide-react";

const OutlookSection = () => {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const implications = [
    {
      icon: AlertTriangle,
      region: t('globalBacklash'),
      items: [
        "EU investigating anti-dumping measures on Chinese EVs",
        "Brazil, Indonesia, Turkey imposing protectionist measures",
        "U.S. universal tariffs of 10-60%, avg. 57.6%",
      ],
    },
    {
      icon: Scale,
      region: t('theParadox'),
      items: [
        "Surplus exceeds Saudi Arabia's entire GDP",
        'A "recessionary surplus" - expanding because China buys less',
        "34% of high-growth sector firms operating at a loss",
      ],
    },
    {
      icon: Globe2,
      region: t('outlook2030'),
      items: [
        "Currency appreciation pressure toward 6.85-6.90 RMB/USD",
        "15th Five-Year Plan faces existential consumption crisis",
        "Export-to-grow model hitting structural limits",
      ],
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-background relative" ref={ref}>
      <div className="container mx-auto px-4">
        <SectionHeader
          label={t('outlookLabel')}
          title={t('outlookTitle')}
          description={t('outlookDescription')}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {implications.map((item, index) => (
            <motion.div
              key={item.region}
              className="card-gradient border border-border rounded-xl p-6 md:p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-4">
                {item.region}
              </h3>
              <ul className="space-y-3">
                {item.items.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Conclusion quote */}
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <blockquote className="relative">
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-6xl text-primary/20 font-display">
              "
            </div>
            <p className="font-display text-2xl md:text-3xl lg:text-4xl font-medium text-foreground leading-relaxed mb-6">
              China's leaders exported their surplus demand problem rather than solving it 
              through consumption promotion.
            </p>
            <footer className="text-muted-foreground">
              — Analysis of the $1.2 Trillion Paradox
            </footer>
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
};

export default OutlookSection;
