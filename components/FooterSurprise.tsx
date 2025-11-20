'use client';

import { Rocket } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';
import { Tooltip, TooltipTrigger, TooltipPanel } from '@/components/animate-ui/components/base/tooltip';

export default function FooterSurprise() {
  const controls = useAnimation();

  const launchRocket = async () => {
    await controls.start({
      y: -1000,
      opacity: 0,
      transition: { duration: 1.5, ease: 'easeIn' },
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    await controls.start({ y: 0, opacity: 0, transition: { duration: 0 } });
    await controls.start({ opacity: 1, transition: { duration: 0.5 } });
  };

  return (
    <Tooltip delay={200}>
      <TooltipTrigger
        onClick={launchRocket}
        className="flex items-center justify-center p-2 text-muted-foreground hover:text-primary transition-colors"
        aria-label="Launch to top"
      >
        <motion.div animate={controls}>
          <Rocket className="size-5 hover:animate-bounce" />
        </motion.div>
      </TooltipTrigger>
      <TooltipPanel>
        Blast off! 🚀
      </TooltipPanel>
    </Tooltip>
  );
}
