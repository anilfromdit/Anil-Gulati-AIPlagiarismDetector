import React, { createContext, useContext, useState } from 'react';

const PlagiarismContext = createContext();

export const PlagiarismProvider = ({ children }) => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const value = {
    results,
    setResults,
    loading,
    setLoading,
    error,
    setError
  };

  return (
    <PlagiarismContext.Provider value={value}>
      {children}
    </PlagiarismContext.Provider>
  );
};

export const usePlagiarism = () => {
  const context = useContext(PlagiarismContext);
  if (!context) {
    throw new Error('usePlagiarism must be used within a PlagiarismProvider');
  }
  return context;
};