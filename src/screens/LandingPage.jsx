
import React from 'react';
import { Layout } from '../components/layout/Layout';
import {  Upload, FileText, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../config/routes';


const LandingPage = () => (
    <Layout>
      {/* <Navigation /> */}
      <main className="flex-grow container mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="text-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Real-time AI-Powered Plagiarism Detection
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Instantly verify the originality of your documents with cutting-edge AI technology
          </p>
          <Link to={ROUTES.UPLOAD} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
     
          <button className="">
            Upload Your Document
          </button>
     </Link>
        </section>
  
        {/* Features Section */}
        <section className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <FileText className="mx-auto h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Accurate Detection</h3>
            <p className="text-gray-600">Advanced AI algorithms detect even subtle plagiarism</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <Shield className="mx-auto h-12 w-12 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Comprehensive Reporting</h3>
            <p className="text-gray-600">Detailed insights with precise source tracking</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <Upload className="mx-auto h-12 w-12 text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Easy Upload</h3>
            <p className="text-gray-600">Simple, secure document upload process</p>
          </div>
        </section>
      </main>
  
    </Layout>
  );

  export default LandingPage;