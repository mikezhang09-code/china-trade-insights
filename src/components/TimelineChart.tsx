import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import SectionHeader from "./SectionHeader";
import { useLanguage } from "@/contexts/LanguageContext";

const CustomTooltip = ({ active, payload, label, data }: any) => {
  if (active && payload && payload.length) {
    const item = data.find((d: any) => d.year === label);
    return (
      <div className="bg-card border border-border rounded-lg p-4 shadow-lg">
        <p className="font-display text-lg font-bold text-foreground mb-1">
          {label}
        </p>
        <p className="text-sm text-muted-foreground mb-2">{item?.event}</p>
        <div className="space-y-1">
          <p className="text-sm">
            <span className="text-muted-foreground">Surplus:</span>{" "}
            <span className="text-primary font-mono font-bold">
              ${payload[0].value}B
            </span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

const TimelineChart = () => {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const data = [
    { year: "2018", surplus: 352, exports: 2487, imports: 2135, event: t('tradeWarBegins') },
    { year: "2019", surplus: 420, exports: 2498, imports: 2078, event: t('stabilization') },
    { year: "2020", surplus: 533, exports: 2590, imports: 2057, event: t('pandemicOnset') },
    { year: "2021", surplus: 670, exports: 3364, imports: 2694, event: t('postPandemicSurge') },
    { year: "2022", surplus: 878, exports: 3593, imports: 2715, event: t('recordHigh') },
    { year: "2023", surplus: 823, exports: 3380, imports: 2557, event: t('stabilization') },
    { year: "2024", surplus: 990, exports: 3520, imports: 2530, event: t('stabilization') },
    { year: "2025", surplus: 1200, exports: 3800, imports: 2600, event: t('trillionThreshold') },
  ];

  return (
    <section className="py-20 md:py-32 bg-background relative" ref={ref}>
      <div className="container mx-auto px-4">
        <SectionHeader
          label={t('historicalEvolution')}
          title={t('theSurge')}
          description={t('timelineDescription')}
        />

        <motion.div
          className="card-gradient border border-border rounded-xl p-4 md:p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="h-[400px] md:h-[500px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
              >
                <defs>
                  <linearGradient id="surplusGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(40, 85%, 55%)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="hsl(40, 85%, 55%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(220, 15%, 18%)"
                  vertical={false}
                />
                <XAxis
                  dataKey="year"
                  stroke="hsl(220, 10%, 55%)"
                  tick={{ fill: "hsl(220, 10%, 55%)", fontSize: 12 }}
                  axisLine={{ stroke: "hsl(220, 15%, 18%)" }}
                />
                <YAxis
                  stroke="hsl(220, 10%, 55%)"
                  tick={{ fill: "hsl(220, 10%, 55%)", fontSize: 12 }}
                  axisLine={{ stroke: "hsl(220, 15%, 18%)" }}
                  tickFormatter={(value) => `$${value}B`}
                />
                <Tooltip content={<CustomTooltip data={data} />} />
                <Area
                  type="monotone"
                  dataKey="surplus"
                  stroke="hsl(40, 85%, 55%)"
                  strokeWidth={3}
                  fill="url(#surplusGradient)"
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Key milestones */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { year: "2018", value: "$352B", label: "Trade War Start" },
              { year: "2020", value: "$533B", label: "Pandemic Surge" },
              { year: "2022", value: "$878B", label: "Previous Record" },
              { year: "2025", value: "$1.19T", label: "Historic Peak" },
            ].map((milestone, index) => (
              <div
                key={milestone.year}
                className="text-center p-4 border border-border/50 rounded-lg bg-muted/20"
              >
                <p className="text-primary font-mono text-sm mb-1">{milestone.year}</p>
                <p className="font-mono text-xl md:text-2xl font-bold text-foreground">
                  {milestone.value}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{milestone.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TimelineChart;
