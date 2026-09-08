import { useEffect, useState, useCallback } from 'react';

export function usePresentationMode(onPrev: () => void, onNext: () => void) {
  const [active, setActive] = useState(false);

  const toggle = useCallback(() => setActive((a) => !a), []);
  const exit = useCallback(() => setActive(false), []);

  useEffect(() => {
    if (!active) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') onPrev();
      else if (e.key === 'ArrowRight') onNext();
      else if (e.key === 'Escape') exit();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [active, onPrev, onNext, exit]);

  return { active, toggle, exit };
}
