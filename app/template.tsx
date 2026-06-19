'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

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
let previousIndex = -1;

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const currentIndex = getRouteIndex(pathname);
  const containerRef = useRef<HTMLDivElement>(null);

  // If navigating to a lower index (e.g. Projects to Home), slide from left (-1)
  // Otherwise, slide from right (1)
  const direction = previousIndex !== -1 && currentIndex < previousIndex ? -1 : 1;

  useEffect(() => {
    previousIndex = currentIndex;

    // Trigger CSS animation on mount
    const el = containerRef.current;
    if (el) {
      // Reset animation
      el.style.animation = 'none';
      // Force reflow
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      el.offsetHeight;
      el.style.animation = '';
      el.classList.add('page-enter');

      const handleEnd = () => el.classList.remove('page-enter');
      el.addEventListener('animationend', handleEnd, { once: true });
      return () => el.removeEventListener('animationend', handleEnd);
    }
  }, [currentIndex, pathname]);

  return (
    <div
      ref={containerRef}
      style={{
        '--page-dir': direction,
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
