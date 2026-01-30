import { motion, useInView } from 'framer-motion';
import { useRef, useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Minus, Plus, Sparkles, Calculator, Users, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

interface ModuleItem {
  name: string;
  price: string;
  description: string;
  category: string;
}

const categoryLabels: Record<string, { en: string; id: string; icon: string }> = {
  hr: { en: 'HR & Attendance', id: 'HR & Absensi', icon: '👥' },
  payroll: { en: 'Payroll', id: 'Payroll', icon: '💰' },
  finance: { en: 'Finance', id: 'Keuangan', icon: '📊' },
  operations: { en: 'Operations', id: 'Operasional', icon: '📦' },
  ai: { en: 'AI & Analytics', id: 'AI & Analitik', icon: '🤖' },
};

export const Pricing = () => {
  const { t, tArray, locale } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isYearly, setIsYearly] = useState(false);
  const [employeeCount, setEmployeeCount] = useState(10);
  const [selectedModules, setSelectedModules] = useState<Set<number>>(new Set([0, 2, 4])); // GPS, Leave & Payroll by default
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const modules = tArray<ModuleItem>('pricing.modules.items');

  // Get unique categories from modules
  const categories = useMemo(() => {
    const cats = new Set(modules.map((m) => m.category));
    return Array.from(cats);
  }, [modules]);

  // Filter modules by active category
  const filteredModules = useMemo(() => {
    if (!activeCategory) return modules;
    return modules.filter((m) => m.category === activeCategory);
  }, [modules, activeCategory]);

  const parsePrice = (price: string) => parseInt(price.replace(/[.,]/g, ''));

  const toggleModule = (index: number) => {
    const newSelected = new Set(selectedModules);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedModules(newSelected);
  };

  const adjustEmployees = (delta: number) => {
    setEmployeeCount((prev) => Math.max(1, Math.min(500, prev + delta)));
  };

  const { totalPerEmployee, totalMonthly, totalYearly, savings } = useMemo(() => {
    let perEmployee = 0;
    selectedModules.forEach((index) => {
      if (modules[index]) {
        perEmployee += parsePrice(modules[index].price);
      }
    });

    const monthly = perEmployee * employeeCount;
    const yearly = monthly * 12;
    const yearlyDiscounted = Math.round(yearly * 0.8);
    const savedAmount = yearly - yearlyDiscounted;

    return {
      totalPerEmployee: perEmployee,
      totalMonthly: monthly,
      totalYearly: yearlyDiscounted,
      savings: savedAmount,
    };
  }, [selectedModules, employeeCount, modules]);

  const formatPrice = (num: number) => {
    return num.toLocaleString('id-ID');
  };

  // Determine recommended bundle based on selected modules
  const getRecommendation = () => {
    const selected = Array.from(selectedModules);
    const selectedCategories = new Set(selected.map((i) => modules[i]?.category).filter(Boolean));

    // HR Complete: using payroll or multiple categories
    if (selectedCategories.has('payroll') || selectedModules.size >= 4) {
      return 'hr';
    }
    // Starter: basic HR modules
    if (selectedModules.size >= 2) {
      return 'starter';
    }
    return null;
  };

  const recommendation = getRecommendation();

  const recommendationMessages: Record<string, { en: string; id: string }> = {
    hr: {
      en: 'Tip: HR Complete bundle saves you more for these features!',
      id: 'Tip: Paket HR Complete lebih hemat untuk fitur-fitur ini!',
    },
    starter: {
      en: 'Tip: Add more modules to unlock full HR capabilities',
      id: 'Tip: Tambah modul untuk fitur HR yang lebih lengkap',
    },
  };

  return (
    <section
      id="pricing"
      className="py-24 lg:py-32 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
            <Calculator className="w-4 h-4" />
            {t('nav.pricing')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground">
            {t('pricing.sectionTitle')}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{t('pricing.sectionSubtitle')}</p>
        </motion.div>

        {/* Main Calculator Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-background rounded-3xl border border-border/60 shadow-xl overflow-hidden">
            {/* Calculator Header */}
            <div className="bg-primary/5 border-b border-border/50 p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Employee Counter */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {locale === 'id' ? 'Jumlah Karyawan' : 'Number of Employees'}
                    </p>
                    <div className="flex items-center gap-3 mt-1">
                      <button
                        onClick={() => adjustEmployees(-5)}
                        className="w-8 h-8 rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <input
                        type="number"
                        value={employeeCount}
                        onChange={(e) =>
                          setEmployeeCount(
                            Math.max(1, Math.min(500, parseInt(e.target.value) || 1))
                          )
                        }
                        className="w-16 text-center text-2xl font-bold text-foreground bg-transparent border-none focus:outline-none"
                      />
                      <button
                        onClick={() => adjustEmployees(5)}
                        className="w-8 h-8 rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Billing Toggle */}
                <div className="inline-flex items-center p-1 bg-muted/50 rounded-full border border-border/50">
                  <button
                    onClick={() => setIsYearly(false)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      !isYearly
                        ? 'bg-background shadow-sm text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {t('pricing.monthly')}
                  </button>
                  <button
                    onClick={() => setIsYearly(true)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                      isYearly
                        ? 'bg-background shadow-sm text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {t('pricing.yearly')}
                    <span className="px-1.5 py-0.5 rounded-full bg-green-500/10 text-green-600 text-xs font-bold">
                      -20%
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Module Selection */}
            <div className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                <p className="text-sm font-medium text-muted-foreground">
                  {t('pricing.modules.title')}
                </p>

                {/* Category Filter */}
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => setActiveCategory(null)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      activeCategory === null
                        ? 'bg-primary text-white'
                        : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                    }`}
                  >
                    {locale === 'id' ? 'Semua' : 'All'}
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                        activeCategory === cat
                          ? 'bg-primary text-white'
                          : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                      }`}
                    >
                      <span>{categoryLabels[cat]?.icon}</span>
                      <span>
                        {locale === 'id' ? categoryLabels[cat]?.id : categoryLabels[cat]?.en}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredModules.map((module) => {
                  // Find original index for selection tracking
                  const originalIndex = modules.findIndex((m) => m.name === module.name);
                  const isSelected = selectedModules.has(originalIndex);
                  const price = parsePrice(module.price);
                  const displayPrice = isYearly ? Math.round(price * 0.8) : price;

                  return (
                    <motion.button
                      key={module.name}
                      onClick={() => toggleModule(originalIndex)}
                      whileTap={{ scale: 0.98 }}
                      layout
                      className={`relative p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                        isSelected
                          ? 'border-primary bg-primary/5 shadow-sm'
                          : 'border-border/50 hover:border-primary/30 bg-background'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{categoryLabels[module.category]?.icon}</span>
                          <h4 className="font-medium text-foreground">{module.name}</h4>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                            isSelected ? 'border-primary bg-primary' : 'border-muted-foreground/30'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 text-white" />}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">{module.description}</p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-lg font-bold text-primary">
                          {t('pricing.currency')}
                          {formatPrice(displayPrice)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {t('pricing.perEmployee')}
                        </span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Selected count indicator */}
              <div className="mt-4 text-center">
                <span className="text-sm text-muted-foreground">
                  {selectedModules.size} {locale === 'id' ? 'modul dipilih' : 'modules selected'}
                </span>
              </div>
            </div>

            {/* Price Summary */}
            <div className="bg-muted/30 border-t border-border/50 p-6">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                {/* Price Breakdown */}
                <div className="flex-1 w-full">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">
                        {locale === 'id' ? 'Per Karyawan' : 'Per Employee'}
                      </p>
                      <p className="text-lg font-semibold text-foreground">
                        {t('pricing.currency')}
                        {formatPrice(
                          isYearly ? Math.round(totalPerEmployee * 0.8) : totalPerEmployee
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        {employeeCount} {locale === 'id' ? 'Karyawan' : 'Employees'} ×{' '}
                        {isYearly
                          ? locale === 'id'
                            ? '12 Bulan'
                            : '12 Months'
                          : locale === 'id'
                            ? '1 Bulan'
                            : '1 Month'}
                      </p>
                      <p className="text-lg font-semibold text-foreground">
                        {t('pricing.currency')}
                        {formatPrice(isYearly ? totalYearly : totalMonthly)}
                      </p>
                    </div>
                    {isYearly && savings > 0 && (
                      <div>
                        <p className="text-xs text-muted-foreground">
                          {locale === 'id' ? 'Hemat' : 'You Save'}
                        </p>
                        <p className="text-lg font-semibold text-green-600">
                          {t('pricing.currency')}
                          {formatPrice(savings)}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Recommendation Badge */}
                  {recommendation && recommendationMessages[recommendation] && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>
                        {locale === 'id'
                          ? recommendationMessages[recommendation].id
                          : recommendationMessages[recommendation].en}
                      </span>
                    </motion.div>
                  )}
                </div>

                {/* Total & CTA */}
                <div className="flex flex-col items-center lg:items-end gap-3">
                  <div className="text-center lg:text-right">
                    <p className="text-sm text-muted-foreground">
                      Total{' '}
                      {isYearly
                        ? locale === 'id'
                          ? 'Tahunan'
                          : 'Yearly'
                        : locale === 'id'
                          ? 'Bulanan'
                          : 'Monthly'}
                    </p>
                    <p className="text-4xl font-heading font-bold text-foreground">
                      {t('pricing.currency')}
                      {formatPrice(isYearly ? totalYearly : totalMonthly)}
                    </p>
                    {!isYearly && (
                      <p className="text-xs text-muted-foreground">
                        {locale === 'id' ? 'atau' : 'or'} {t('pricing.currency')}
                        {formatPrice(totalYearly)}/{locale === 'id' ? 'tahun' : 'year'} (
                        {locale === 'id' ? 'hemat' : 'save'} 20%)
                      </p>
                    )}
                  </div>
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-white rounded-xl px-8 h-12 font-medium"
                  >
                    {locale === 'id' ? 'Mulai Sekarang' : 'Start Now'}
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Guarantee */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center text-sm text-muted-foreground mt-10"
        >
          {t('pricing.guarantee')} • {t('pricing.noCard')}
        </motion.p>
      </div>
    </section>
  );
};
