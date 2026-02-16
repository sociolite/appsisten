import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';

const integrations = [
  { name: 'SAP', logo: '/integrations/sap.png' },
  { name: 'PowerBI', logo: '/integrations/powerbi.png' },
  { name: 'Google Workspace', logo: '/integrations/google.png' },
  { name: 'Salesforce', logo: '/integrations/salesforce.png' },
  { name: 'Odoo', logo: '/integrations/odoo.png' },
  { name: 'Custom Tools', logo: '/integrations/custom.png' },
];

interface IntegrationNodeProps {
  name: string;
  logo: string;
  position: string;
  delay: number;
  lineOrigin: 'bottom' | 'top' | 'left' | 'right' | 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
}

const IntegrationNode = ({ name, logo, position, delay, lineOrigin }: IntegrationNodeProps) => {
  // Map orientations to line rotation/position
  const getLineStyles = () => {
    switch (lineOrigin) {
      case 'bottom': return { top: '100%', left: '50%', transform: 'translateX(-50%)', height: '100px', width: '2px' };
      case 'top': return { bottom: '100%', left: '50%', transform: 'translateX(-50%)', height: '100px', width: '2px' };
      case 'bottom-left': return { top: '100%', right: '100%', transform: 'translate(50%, -50%) rotate(-45deg)', height: '140px', width: '2px', transformOrigin: 'top' };
      case 'top-left': return { bottom: '100%', right: '100%', transform: 'translate(50%, 50%) rotate(45deg)', height: '140px', width: '2px', transformOrigin: 'bottom' };
      case 'bottom-right': return { top: '100%', left: '100%', transform: 'translate(-50%, -50%) rotate(45deg)', height: '140px', width: '2px', transformOrigin: 'top' };
      case 'top-right': return { bottom: '100%', left: '100%', transform: 'translate(-50%, 50%) rotate(-45deg)', height: '140px', width: '2px', transformOrigin: 'bottom' };
      default: return {};
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={`absolute ${position} z-20`}
    >
      <div className="group relative flex flex-col items-center">
         {/* Connecting Line (SVG Dashed) */}
         <div 
            className="absolute -z-10 flex justify-center"
            style={{
                ...getLineStyles(),
                width: '2px',
                pointerEvents: 'none'
            }} 
         >
            <svg width="2" height="100%" className="overflow-visible">
              <line 
                x1="1" 
                y1="0" 
                x2="1" 
                y2="100%" 
                stroke="#cbd5e1" 
                strokeWidth="2" 
                strokeDasharray="6 6"
              />
            </svg>
         </div>

        <div className="relative w-28 h-28 rounded-3xl bg-white shadow-lg border-2 border-white flex flex-col items-center justify-center p-4 hover:scale-105 transition-transform duration-300">
          {/* Online Status Dot */}
          <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />

          <img
            src={logo}
            alt={name}
            className="w-10 h-10 object-contain mb-2"
          />
          <span className="text-xs font-semibold text-center text-slate-600 leading-tight">
            {name}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export const Integrations = () => {
  const { t } = useLanguage();

  // Circular positioning for integrations around center
  const getPosition = (index: number, total: number) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
    const radius = 280; // Distance from center
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    };
  };

  return (
    <section id="integrations" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
            {t('integrations.title')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('integrations.subtitle')}
          </p>
        </div>

        {/* Desktop Hub Layout */}
        <div className="hidden lg:block relative max-w-5xl mx-auto h-[700px]">
          {/* Center Appsisten Node */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
            <div className="relative w-40 h-40 rounded-[2.5rem] bg-white shadow-2xl border-4 border-white/50 flex flex-col items-center justify-center p-6 mx-auto">
              {/* Glow effect behind center */}
              <div className="absolute inset-0 bg-blue-500/5 rounded-[2.5rem] blur-xl -z-10" />

              <img
                src="/images/logo.png"
                alt="Appsisten"
                className="w-16 h-16 object-contain mb-3"
              />
              <span className="font-bold text-lg text-foreground tracking-tight">Appsisten</span>
            </div>
            {/* 500+ sticker */}
            {/* <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-md border border-border/20 text-xs font-medium text-muted-foreground whitespace-nowrap">
              500+ Integrations
            </div> */}
          </div>

          {/* Integration Nodes with Fixed Positions */}
          {/* 1. SAP - Top Center */}
          <IntegrationNode
            name="SAP"
            logo="/integrations/sap.png"
            position="top-[10%] left-1/2 -translate-x-1/2"
            delay={0.1}
            lineOrigin="bottom"
          />

          {/* 2. Google Workspace - Top Right */}
          <IntegrationNode
            name="Google Workspace"
            logo="/integrations/google.png"
            position="top-[25%] right-[10%]"
            delay={0.2}
            lineOrigin="bottom-left"
          />

          {/* 3. Odoo - Bottom Right */}
          <IntegrationNode
            name="Odoo"
            logo="/integrations/odoo.png"
            position="bottom-[25%] right-[10%]"
            delay={0.3}
            lineOrigin="top-left"
          />

          {/* 4. Custom Tools - Bottom Center */}
          <IntegrationNode
            name="Custom Tools"
            logo="/integrations/custom.png"
            position="bottom-[10%] left-1/2 -translate-x-1/2"
            delay={0.4}
            lineOrigin="top"
          />

          {/* 5. Salesforce - Bottom Left */}
          <IntegrationNode
            name="Salesforce"
            logo="/integrations/salesforce.png"
            position="bottom-[25%] left-[10%]"
            delay={0.5}
            lineOrigin="top-right"
          />

          {/* 6. PowerBI - Top Left */}
          <IntegrationNode
            name="PowerBI"
            logo="/integrations/powerbi.png"
            position="top-[25%] left-[10%]"
            delay={0.6}
            lineOrigin="bottom-right"
          />

        </div>

        {/* Mobile Grid Layout */}
        <div className="lg:hidden">
          <div className="flex justify-center mb-12">
            {/* Simple Center Logo for Mobile */}
            <div className="relative w-32 h-32 rounded-3xl bg-white shadow-xl border border-border/50 flex flex-col items-center justify-center p-4">
              <img
                src="/images/logo.png"
                alt="Appsisten"
                className="w-12 h-12 object-contain mb-2"
              />
              <span className="font-bold text-sm text-foreground">Appsisten</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
            {integrations.map((integration) => (
              <div
                key={integration.name}
                className="bg-white rounded-2xl p-6 shadow-sm border border-border/40 flex flex-col items-center justify-center gap-3"
              >
                <img
                  src={integration.logo}
                  alt={integration.name}
                  className="w-8 h-8 object-contain"
                />
                <span className="text-sm font-medium text-foreground text-center">{integration.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
