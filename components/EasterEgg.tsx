'use client';

import { useState, useEffect } from 'react';
import { useKonami } from '@/lib/useKonami';
import confetti from 'canvas-confetti';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/AlertDialog';

export default function EasterEgg() {
  const [open, setOpen] = useState(false);

  useKonami(() => setOpen(true));

  useEffect(() => {
    if (open) {
      const end = Date.now() + 3 * 1000 // 3 seconds
      const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"]

      const frame = () => {
        if (Date.now() > end) return

        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          startVelocity: 60,
          origin: { x: 0, y: 0.5 },
          colors: colors,
        })
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          startVelocity: 60,
          origin: { x: 1, y: 0.5 },
          colors: colors,
        })

        requestAnimationFrame(frame)
      }

      frame()
    }
  }, [open]);

  return (
    <>
      {open && (
        <audio
          src="/audio/confetti-pop.mp3"
          autoPlay
        />
      )}
      <AlertDialog
        open={open}
        onOpenChange={setOpen}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>🎉 Easter Egg Found!</AlertDialogTitle>
            <AlertDialogDescription>
              You're a curious developer. 😎
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setOpen(false)}>
              Cool!
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
