import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="py-12 bg-card border-t border-border">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h4 className="font-display text-2xl font-bold text-gradient-gold mb-4">
            The Great Divergence
          </h4>
          <p className="text-muted-foreground text-sm max-w-2xl mx-auto mb-6">
            An analysis of China's historic $1.2 trillion trade surplus in 2025 and its 
            implications for global trade. Data compiled from AP News, IMF, Chinese Customs 
            Administration, and other authoritative sources.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <span>January 2026</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground" />
            <span>Geoeconomic Analysis</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
