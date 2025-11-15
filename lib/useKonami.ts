import { useEffect, useState } from 'react';

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowUp',
];

export function useKonami(onTrigger?: () => void) {
  const [konamiCode, setKonamiCode] = useState<string[]>([]);
  const [isKonami, setIsKonami] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setKonamiCode((prev) => {
        const newCode = [...prev, event.code];

        // Check if the sequence matches
        const isMatch = KONAMI_CODE.every((code, index) => code === newCode[index]);

        if (isMatch && newCode.length === KONAMI_CODE.length) {
          setIsKonami(true);
          return []; // Reset after trigger
        }

        // Keep only the last N keys to avoid memory issues
        return newCode.slice(-KONAMI_CODE.length);
      });
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Reset when triggered
  useEffect(() => {
    if (isKonami) {
      onTrigger?.();
      setIsKonami(false);
    }
  }, [isKonami, onTrigger]);

  return isKonami;
}
