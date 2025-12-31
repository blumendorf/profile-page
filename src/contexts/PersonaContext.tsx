import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type Persona = 'nonTechnical' | 'technical';

interface PersonaContextType {
  // Split mode state
  isSplitMode: boolean;
  splitPosition: number; // 0-100, where 50 = middle

  // Actions
  toggleSplitMode: () => void;
  setSplitPosition: (position: number) => void;

  // Computed
  dominantPersona: Persona;
}

const PersonaContext = createContext<PersonaContextType | null>(null);

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

export const usePersona = () => {
  const context = useContext(PersonaContext);
  if (!context) {
    throw new Error('usePersona must be used within PersonaProvider');
  }
  return context;
};

