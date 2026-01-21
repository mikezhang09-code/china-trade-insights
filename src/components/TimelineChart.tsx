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

const data = [
  { year: "2018", surplus: 352, exports: 2487, imports: 2135, event: "Trade war begins" },
  { year: "2019", surplus: 420, exports: 2498, imports: 2078, event: "Stabilization" },
  { year: "2020", surplus: 533, exports: 2590, imports: 2057, event: "Pandemic onset" },
  { year: "2021", surplus: 670, exports: 3364, imports: 2694, event: "Post-pandemic surge" },
  { year: "2022", surplus: 878, exports: 3593, imports: 2715, event: "Record high (at time)" },
  { year: "2023", surplus: 800, exports: 3500, imports: 2700, event: "Global slowdown" },
  { year: "2024", surplus: 990, exports: 3650, imports: 2660, event: "Continued elevation" },
  { year: "2025", surplus: 1189, exports: 3850, imports: 2661, event: "All-time record" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const item = data.find((d) => d.year === label);
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
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 md:py-32 bg-background relative" ref={ref}>
      <div className="container mx-auto px-4">
        <SectionHeader
          label="Historical Evolution"
          title="The Surge: 2018-2025"
          description="Despite the U.S.-China trade war beginning in 2018, China's trade surplus paradoxically entered a new expansionary phase, nearly quadrupling in seven years."
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
                <Tooltip content={<CustomTooltip />} />
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
