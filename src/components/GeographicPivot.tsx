import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { ArrowRight, Ship, MapPin } from "lucide-react";

const flowData = [
  {
    from: "China",
    to: "ASEAN",
    label: "Intermediate Goods",
    subLabel: "Chips, Textiles, Components",
  },
  {
    from: "ASEAN",
    to: "Global Market",
    label: "Assembly & Re-labeling",
    subLabel: "Vietnam, Thailand",
  },
  {
    from: "Global Market",
    to: "USA/EU",
    label: "Finished Goods",
    subLabel: "Bypassing Direct Tariffs",
  },
];

const GeographicPivot = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 md:py-32 bg-muted/20 relative" ref={ref}>
      <div className="container mx-auto px-4">
        <SectionHeader
          label="Trade Flow Analysis"
          title="The Connector Economy"
          description="Exports to the U.S. fell 20%, yet total exports rose. The solution? Strategic transshipment through ASEAN partners."
        />

        {/* Flow Diagram */}
        <motion.div
          className="card-gradient border border-border rounded-xl p-6 md:p-10 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
            {flowData.map((flow, index) => (
              <div key={flow.from} className="flex items-center gap-4 md:gap-6">
                {/* Node */}
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.15 }}
                >
                  <div
                    className={`w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center mb-3 ${
                      index === 0
                        ? "bg-gradient-to-br from-primary to-accent"
                        : index === 1
                        ? "bg-gradient-to-br from-chart-3 to-chart-4"
                        : "bg-gradient-to-br from-success to-chart-4"
                    }`}
                  >
                    {index === 0 ? (
                      <Ship className="w-10 h-10 text-background" />
                    ) : (
                      <MapPin className="w-10 h-10 text-background" />
                    )}
                  </div>
                  <p className="font-display text-lg font-bold text-foreground">
                    {flow.from}
                  </p>
                </motion.div>

                {/* Arrow with label (not on last item) */}
                {index < flowData.length - 1 && (
                  <motion.div
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.15 }}
                  >
                    <p className="text-xs text-primary font-medium mb-1 text-center hidden md:block">
                      {flow.label}
                    </p>
                    <div className="flex items-center">
                      <div className="w-8 md:w-16 h-0.5 bg-gradient-to-r from-primary to-accent" />
                      <ArrowRight className="w-5 h-5 text-accent" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 text-center hidden md:block">
                      {flow.subLabel}
                    </p>
                  </motion.div>
                )}
              </div>
            ))}

            {/* Final destination */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-chart-5 to-destructive flex items-center justify-center mb-3">
                <MapPin className="w-10 h-10 text-background" />
              </div>
              <p className="font-display text-lg font-bold text-foreground">
                USA / EU
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Regional stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Latin America */}
          <motion.div
            className="card-gradient border border-border rounded-xl p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h4 className="font-display text-xl font-bold text-foreground mb-4">
              Latin America: Strategic Backyard
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <div>
                  <p className="text-foreground font-medium">Port of Chancay (Peru)</p>
                  <p className="text-sm text-muted-foreground">
                    A new direct artery to Shanghai, bypassing U.S. routes
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <div>
                  <p className="text-foreground font-medium">The Soy Swap</p>
                  <p className="text-sm text-muted-foreground">
                    Shifting purchases to Brazil to sideline U.S. farmers
                  </p>
                </div>
              </li>
            </ul>
          </motion.div>

          {/* ASEAN */}
          <motion.div
            className="card-gradient border border-border rounded-xl p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h4 className="font-display text-xl font-bold text-foreground mb-4">
              ASEAN: The Connector Hub
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-success mt-2 flex-shrink-0" />
                <div>
                  <p className="text-foreground font-medium">+13.4% Export Growth</p>
                  <p className="text-sm text-muted-foreground">
                    ASEAN overtook EU/US as China's #1 trading partner
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-success mt-2 flex-shrink-0" />
                <div>
                  <p className="text-foreground font-medium">RCEP Integration</p>
                  <p className="text-sm text-muted-foreground">
                    Regional trade pact with China at the center
                  </p>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GeographicPivot;
