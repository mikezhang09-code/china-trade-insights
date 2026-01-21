import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import SectionHeader from "./SectionHeader";
import {
  Globe,
  TrendingDown,
  Coins,
  Factory,
  Car,
  Package,
  AlertTriangle,
} from "lucide-react";

const drivers = [
  {
    icon: Globe,
    number: "01",
    title: "Strategic Export Redirection",
    description:
      "US-bound exports plummeted 20%, but Chinese manufacturers seamlessly redirected shipments to alternative markets through years of Belt & Road preparation.",
    stats: [
      { region: "Africa", growth: "+25.8%", color: "text-success" },
      { region: "ASEAN", growth: "+13.4%", color: "text-success" },
      { region: "EU", growth: "+8.4%", color: "text-success" },
      { region: "USA", growth: "-20%", color: "text-destructive" },
    ],
  },
  {
    icon: TrendingDown,
    number: "02",
    title: "Weak Domestic Demand",
    description:
      "The property crisis devastated household wealth. With real estate investment declining 15.9% and home prices down 20% from 2021 peaks, consumers retreated.",
    highlight: "Retail sales growth hit just 1.3% in November 2025",
  },
  {
    icon: Coins,
    number: "03",
    title: "Currency & Deflation",
    description:
      "The yuan weakened ~10% against the euro, while 38 consecutive months of negative producer price inflation acted as a de facto export subsidy.",
    highlight: "Export prices fell ~20% cumulatively since early 2022",
  },
  {
    icon: Factory,
    number: "04",
    title: "Import Substitution",
    description:
      "Made in China 2025 drove self-sufficiency across strategic sectors. Semiconductor self-sufficiency rose from 5% (2018) to nearly 30% (2024).",
    highlight: "70% self-sufficiency target for core components",
  },
  {
    icon: Car,
    number: "05",
    title: "High-Value Manufacturing",
    description:
      "The 'New Three' (EVs, batteries, solar) superseded traditional exports. China exported 5.8 million vehicles in 2025, a 20% jump with EVs surging 50%.",
    highlight: "China controls 69% of global EV battery market",
  },
  {
    icon: Package,
    number: "06",
    title: "Structural Overcapacity",
    description:
      "34% of firms in high-growth sectors operated at a loss in 2025. 'Involution' drives relentless price competition, with excess capacity forcing export dependency.",
    highlight: "Manufacturing overcapacity in autos, steel, and chemicals",
  },
];

const DriverCard = ({
  driver,
  index,
}: {
  driver: (typeof drivers)[0];
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="relative"
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="card-gradient border border-border rounded-xl p-6 md:p-8 h-full hover:border-primary/50 transition-colors duration-300">
        {/* Number and Icon */}
        <div className="flex items-center gap-4 mb-6">
          <span className="font-mono text-4xl font-bold text-primary/20">
            {driver.number}
          </span>
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <driver.icon className="w-6 h-6 text-primary" />
          </div>
        </div>

        <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-4">
          {driver.title}
        </h3>

        <p className="text-muted-foreground mb-6">{driver.description}</p>

        {/* Stats grid for first driver */}
        {driver.stats && (
          <div className="grid grid-cols-2 gap-3">
            {driver.stats.map((stat) => (
              <div
                key={stat.region}
                className="bg-muted/30 rounded-lg p-3 text-center"
              >
                <p className="text-xs text-muted-foreground mb-1">
                  {stat.region}
                </p>
                <p className={`font-mono font-bold ${stat.color}`}>
                  {stat.growth}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Highlight for other drivers */}
        {driver.highlight && (
          <div className="flex items-start gap-3 bg-primary/5 border border-primary/20 rounded-lg p-4">
            <AlertTriangle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <p className="text-sm text-foreground font-medium">
              {driver.highlight}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const DriversSection = () => {
  return (
    <section className="py-20 md:py-32 bg-muted/20 relative">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container mx-auto px-4">
        <SectionHeader
          label="Structural Analysis"
          title="Six Drivers of the Surplus"
          description="The historic surplus is not a function of any single factor but rather the convergence of six reinforcing structural dynamics."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {drivers.map((driver, index) => (
            <DriverCard key={driver.number} driver={driver} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DriversSection;
