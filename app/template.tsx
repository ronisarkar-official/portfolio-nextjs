'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

// Define the order of your navbar links
const navOrder = ['/', '/projects', '/blog', '/contact'];

function getRouteIndex(path: string) {
  if (path === '/') return 0;
  // Check for exact or prefix matches (e.g., /blog/my-post)
  for (let i = 1; i < navOrder.length; i++) {
    if (path.startsWith(navOrder[i])) {
      return i;
    }
  }
  return 0; // fallback
}

// Keep track of the previous route index across remounts
// Since this is a module-level variable on the client, it persists across page navigations!
let previousIndex = -1;

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const currentIndex = getRouteIndex(pathname);

  // If navigating to a lower index (e.g. Projects to Home), slide from left (-1)
  // Otherwise, slide from right (1)
  const direction = previousIndex !== -1 && currentIndex < previousIndex ? -1 : 1;
  const startX = 60 * direction;

  useEffect(() => {
    previousIndex = currentIndex;
  }, [currentIndex]);

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, x: startX, scale: 0.98, filter: 'blur(8px)' }}
      animate={{ opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' }}
      transition={{ 
        type: "spring",
        stiffness: 280,
        damping: 25,
        mass: 1
      }}
      className="will-change-transform"
    >
      {children}
    </motion.div>
  );
}
