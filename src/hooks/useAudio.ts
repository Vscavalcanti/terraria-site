import { useEffect, useState } from 'react';
import { AudioManager, AudioState } from '../audio/AudioManager';

export function useAudio() {
  const [state, setState] = useState<AudioState>(AudioManager.getState());

  useEffect(() => {
    const unsubscribe = AudioManager.subscribe(setState);
    return () => {
      unsubscribe();
    };
  }, []);

  return { state, manager: AudioManager };
}
