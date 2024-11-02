import { useState } from 'react';
import { validateFile } from '../utils/fileValidation';

export const useFileUpload = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const handleFileUpload = async (event) => {
    const selectedFile = event.target.files[0];
    const validation = validateFile(selectedFile);

    if (!validation.isValid) {
      setError(validation.error);
      setFile(null);
      setIsValid(false);
      return;
    }

    setError(null);
    setFile(selectedFile);
    setIsValid(true);
  };

  const resetFile = () => {
    setFile(null);
    setError(null);
    setIsValid(false);
  };

  return { file, error, loading, handleFileUpload, resetFile, isValid };
};
