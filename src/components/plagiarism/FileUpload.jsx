import React from 'react';
import { Upload } from 'lucide-react';
import { Button } from '../common/Button';
import { Alert } from '../common/Alert';
import { useFileUpload } from '../../hooks/useFileUpload';

export const FileUpload = ({ onFileSelect }) => {
  const { file, error, handleFileUpload, resetFile, isValid } = useFileUpload();

  const handleChange = (e) => {
    handleFileUpload(e);
    // Only call onFileSelect if the file is valid
    if (e.target.files[0] && !error) {
      onFileSelect(e.target.files[0]);
    } else {
      onFileSelect(null); // Reset the parent's file state if invalid
    }
  };

  const handleReset = () => {
    resetFile();
    onFileSelect(null); // Reset parent's file state
  };

  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
      <input
        type="file"
        id="file-upload"
        onChange={handleChange}
        accept=".pdf,.doc,.docx"
        className="hidden"
      />
      
      <label htmlFor="file-upload" className="cursor-pointer block">
        <div className="mx-auto w-16 h-16 mb-4">
          <Upload className="w-full h-full text-blue-600" />
        </div>
        <span className="text-lg font-medium text-gray-700">
          {isValid && file ? file.name : 'Drop your file here or click to upload'}
        </span>
        <p className="text-sm text-gray-500 mt-2">
          Supported formats: PDF, DOC, DOCX (Max 2MB)
        </p>
      </label>

      {error && (
        <Alert
          type="error"
          message={error}
          onClose={handleReset}
          className="mt-4"
        />
      )}

      {isValid && file && (
        <div className="mt-4">
          <Button onClick={handleReset} variant="secondary">
            Remove File
          </Button>
        </div>
      )}
    </div>
  );
};
