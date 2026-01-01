import { createContext } from 'react';

export type Persona = 'nonTechnical' | 'technical';

export interface PersonaContextType {
  // Split mode state
  isSplitMode: boolean;
  splitPosition: number; // 0-100, where 50 = middle

  // Actions
  toggleSplitMode: () => void;
  setSplitPosition: (position: number) => void;

  // Computed
  dominantPersona: Persona;
}

export const PersonaContext = createContext<PersonaContextType | null>(null);

