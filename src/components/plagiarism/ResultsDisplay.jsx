import React from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Download, AlertTriangle } from 'lucide-react';

export const ResultsDisplay = ({ results }) => {
  const getSeverityColor = (percentage) => {
    if (percentage < 20) return 'bg-green-100 text-green-800';
    if (percentage < 40) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const handleDownload = () => {
    const report = generateReport(results);
    const blob = new Blob([report], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'plagiarism-report.txt';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const generateReport = (results) => {
    return `Plagiarism Analysis Report
Generated: ${new Date().toLocaleString()}

Overall Plagiarism: ${results.percentage.toFixed(1)}%

Detected Matches:
${results.matches.map(match => `
"${match.text}"
Source: ${match.source}
`).join('\n')}

Analysis:
${results.analysis}
`;
  };

  return (
    <div className="space-y-6">
      <Card className="text-center">
        <div className={`inline-block px-6 py-4 rounded-lg ${getSeverityColor(results.percentage)}`}>
          <span className="text-4xl font-bold">
            {results.percentage.toFixed(1)}%
          </span>
          <p className="text-sm">Plagiarized Content</p>
        </div>
      </Card>

      {results.matches.length > 0 && (
        <Card>
          <h3 className="text-xl font-semibold mb-4">Potential Matches</h3>
          <div className="space-y-4">
            {results.matches.map((match, index) => (
              <div 
                key={index}
                className="p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded"
              >
                <p className="text-gray-700 mb-2">"{match.text}"</p>
                <p className="text-sm text-gray-500">Source: {match.source}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {results.analysis && (
        <Card>
          <h3 className="text-xl font-semibold mb-4">Writing Style Analysis</h3>
          <p className="text-gray-700">{results.analysis}</p>
        </Card>
      )}

      {results.percentage >= 20 && (
        <div className="flex items-center p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
          <AlertTriangle className="w-5 h-5 text-yellow-500 mr-2" />
          <p className="text-sm text-yellow-700">
            Some sections of this document may require citation or revision. 
            Review the matched content carefully.
          </p>
        </div>
      )}

      <Button 
        onClick={handleDownload}
        className="flex items-center justify-center w-full"
      >
        <Download className="w-5 h-5 mr-2" />
        Download Detailed Report
      </Button>
    </div>
  );
};