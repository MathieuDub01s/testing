import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

// Type de l'objet "personne"
export type Personne = {
  nom: string;
  motDePasse: string;
  image: string;
  son: string;
  couleur: string;
};

// Type du contexte
type PersonneContextType = {
  personne: Personne;
  setPersonne: Dispatch<SetStateAction<Personne>>;
};

// Création du contexte avec une valeur par défaut (null qu'on cast)
export const PersonneContext = createContext<PersonneContextType | undefined>(undefined);

// Type des props du provider
type PersonneProviderProps = {
  children: ReactNode;
};

export const PersonneProvider = ({ children }: PersonneProviderProps) => {
  const [personne, setPersonne] = useState<Personne>({
    nom: '',
    motDePasse: '',
    image: '',
    son: '',
    couleur: '',
  });

  return (
    <PersonneContext.Provider value={{ personne, setPersonne }}>
      {children}
    </PersonneContext.Provider>
  );
};
