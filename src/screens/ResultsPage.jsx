import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { ResultsDisplay } from '../components/plagiarism/ResultsDisplay';
import { Button } from '../components/common/Button';
import { usePlagiarism } from '../context/PlagiarismContext';
import { ROUTES } from '../config/routes';

const ResultsPage = () => {
  const navigate = useNavigate();
  const { results, error } = usePlagiarism();

  if (error) {
    return (
      <Layout>
<div className="container mx-auto px-4 py-8 sm:py-16 max-w-3xl">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <p className="text-red-700">{error}</p>
            <Button
              onClick={() => navigate(ROUTES.UPLOAD)}
              variant="secondary"
              className="mt-4"
            >
              Try Again
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  if (!results) {
    navigate(ROUTES.UPLOAD);
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <h1 className="text-3xl font-bold text-center mb-8">
          Plagiarism Detection Results
        </h1>

        <ResultsDisplay results={results} />

        <Button
          onClick={() => navigate(ROUTES.UPLOAD)}
          variant="secondary"
          className="mt-8 w-full"
        >
          Check Another Document
        </Button>
      </div>
    </Layout>
  );
};

export default ResultsPage;