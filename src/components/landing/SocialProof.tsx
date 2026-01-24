import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Building2, Users, Clock } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

export const SocialProof = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const stats = [
    {
      icon: Building2,
      value: t("socialProof.businesses"),
    },
    {
      icon: Users,
      value: t("socialProof.employees"),
    },
    {
      icon: Clock,
      value: t("socialProof.attendances"),
    },
  ];

  return (
    <section ref={ref} className="py-8 bg-muted/30 border-y border-border/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="text-lg font-semibold text-foreground whitespace-nowrap">
                {stat.value}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
