import { useContext } from 'react';
import { PersonaContext } from './persona-types';

export const usePersona = () => {
  const context = useContext(PersonaContext);
  if (!context) {
    throw new Error('usePersona must be used within PersonaProvider');
  }
  return context;
};

