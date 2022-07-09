import React, { ReactNode, useContext, useState } from 'react';
import { Movie } from '../services/moviesApi';

interface NominationContextState {
  nominations: Movie[];
  showPopup: boolean;
  setShowPopup?: (value: boolean) => void;
  updateNomination?: (value: Movie) => void;
  removeNomination?: (id: string) => void;
}

export const NominationContext = React.createContext<NominationContextState>({
  nominations: [],
  showPopup: false,
});

interface NominationProviderProps {
  children: ReactNode;
}

export const NominationProvider: React.FC<NominationProviderProps> = ({
  children,
}) => {
  const [nominations, setNominations] = useState<Movie[]>([]);
  const [showPopup, setShowPopup] = useState(false);

  const updateNomination = (movie: Movie) => {
    setNominations((prevNominations) => [...prevNominations, movie]);
  };
  const removeNomination = (id: string) => {
    setNominations((prevNominations) =>
      prevNominations.filter((m) => m.imdbID !== id),
    );
  };
  return (
    <NominationContext.Provider
      value={{
        nominations,
        updateNomination,
        removeNomination,
        setShowPopup,
        showPopup,
      }}
    >
      {children}
    </NominationContext.Provider>
  );
};

export const useNominationContext = () => {
  const context = useContext(NominationContext);

  if (!context || !context.nominations) {
    throw new Error(
      'useNominationContext must be used within movie page or NominationContext component.',
    );
  }

  return context;
};
