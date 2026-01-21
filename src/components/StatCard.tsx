import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import AnimatedCounter from "./AnimatedCounter";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  description?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  icon?: LucideIcon;
  delay?: number;
}

const StatCard = ({
  value,
  label,
  suffix = "",
  prefix = "",
  decimals = 0,
  description,
  trend,
  trendValue,
  icon: Icon,
  delay = 0,
}: StatCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="card-gradient border border-border rounded-lg p-6 md:p-8 relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      {/* Subtle glow effect */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      <div className="flex items-start justify-between mb-4">
        <span className="data-label text-muted-foreground">{label}</span>
        {Icon && <Icon className="w-5 h-5 text-primary" />}
      </div>

      <div className="flex items-baseline gap-1 mb-2">
        <AnimatedCounter
          end={value}
          prefix={prefix}
          suffix={suffix}
          decimals={decimals}
          className="text-3xl md:text-4xl font-bold text-foreground"
        />
      </div>

      {description && (
        <p className="text-sm text-muted-foreground mb-3">{description}</p>
      )}

      {trend && trendValue && (
        <div className="flex items-center gap-2">
          <span
            className={`text-sm font-medium ${
              trend === "up"
                ? "text-success"
                : trend === "down"
                ? "text-destructive"
                : "text-muted-foreground"
            }`}
          >
            {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"} {trendValue}
          </span>
        </div>
      )}
    </motion.div>
  );
};

export default StatCard;
