import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { FileUpload } from '../components/plagiarism/FileUpload';
import { Button } from '../components/common/Button';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { analyzePlagiarism } from '../services/api';
import { usePlagiarism } from '../context/PlagiarismContext';
import { ROUTES } from '../config/routes';

const DocumentUploadPage = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { setResults, setError } = usePlagiarism();

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    try {
      const results = await analyzePlagiarism(file);
      setResults(results);
      navigate(ROUTES.RESULTS);
    } catch (err) {
      setError(err.message || 'Failed to process document. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Layout>
<div className="container mx-auto px-4 py-8 sm:py-16 max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-8">
          Upload Your Document
        </h1>
        <div className="bg-white shadow-md rounded-lg p-8">
          <FileUpload
            onFileSelect={setFile}
            accept=".txt,.doc,.docx,.pdf"
            maxSize={2 * 1024 * 1024}
          />

          {file && (
            <>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  Selected file: {file.name}
                </p>
                <p className="text-sm text-gray-500">
                  Size: {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>

              <Button
                onClick={handleUpload}
                disabled={uploading ||  
                  (file?.size / 1024 / 1024).toFixed(2) > 2 || !file}
                className="w-full mt-6"
              >
                {

                    uploading ? (
                    <div className="flex items-center justify-center">
                      <LoadingSpinner size="small" />
                      <span className="ml-2">Analyzing document...</span>
                    </div>
                  ) : (
                    'Check for Plagiarism'
                  )}

              </Button>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};
export default DocumentUploadPage;