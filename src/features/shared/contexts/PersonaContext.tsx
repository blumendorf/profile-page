import { useState, useCallback, ReactNode } from 'react';
import { PersonaContext, type Persona } from './persona-types';

export type { Persona } from './persona-types';

export const PersonaProvider = ({ children }: { children: ReactNode }) => {
  const [isSplitMode, setIsSplitMode] = useState(false);
  const [splitPosition, setSplitPositionState] = useState(50);

  const toggleSplitMode = useCallback(() => {
    setIsSplitMode(prev => !prev);
    // Reset to center when toggling
    setSplitPositionState(50);
  }, []);

  const setSplitPosition = useCallback((position: number) => {
    setSplitPositionState(Math.max(0, Math.min(100, position)));
  }, []);

  // Which persona is dominant based on split position
  const dominantPersona: Persona = splitPosition < 50 ? 'nonTechnical' : 'technical';

  return (
    <PersonaContext.Provider value={{
      isSplitMode,
      splitPosition,
      toggleSplitMode,
      setSplitPosition,
      dominantPersona,
    }}>
      {children}
    </PersonaContext.Provider>
  );
};

