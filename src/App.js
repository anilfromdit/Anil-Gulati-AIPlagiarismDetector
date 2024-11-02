
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PlagiarismProvider } from './context/PlagiarismContext';
import LandingPage from './screens/LandingPage';
import DocumentUploadPage from './screens/DocumentUploadPage';
import ResultsPage from './screens/ResultsPage';
import ContactPage from './screens/ContactPage';
import { ROUTES } from './config/routes';

const App = () => {
  return (
    <PlagiarismProvider>
      <Router>
        <Routes>
          <Route path={ROUTES.HOME} element={<LandingPage />} />
          <Route path={ROUTES.UPLOAD} element={<DocumentUploadPage />} />
          <Route path={ROUTES.RESULTS} element={<ResultsPage />} />
          <Route path={ROUTES.CONTACT} element={<ContactPage />} />
        </Routes>
      </Router>
    </PlagiarismProvider>
  );
};

export default App;
