import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getResults } from '../services/api';

export default function Comparison() {
  const { fileUploadId } = useParams(); // Get ID from URL
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const data = await getResults(fileUploadId);
        setResults(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [fileUploadId]);

  if (loading) return <div className="text-white text-center p-8">Loading results...</div>;
  if (error) return <div className="text-red-500 text-center p-8">Error: {error}</div>;
  if (!results) return <div className="text-white text-center p-8">No results found</div>;

  return (
    <div className="min-h-screen bg-[#0d1527] p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-serif text-[#cca43b] mb-8">Plagiarism Analysis Results</h1>
        
        <div className="bg-[#162235] border border-gray-800/60 rounded-2xl p-6">
          <p className="text-gray-400 mb-6">
            Analyzed {results.totalMatches} file comparisons
          </p>

          {/* Results Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left p-4 text-[#cca43b]">File 1</th>
                  <th className="text-left p-4 text-[#cca43b]">File 2</th>
                  <th className="text-left p-4 text-[#cca43b]">Plagiarism %</th>
                  <th className="text-left p-4 text-[#cca43b]">Exact Match %</th>
                  <th className="text-left p-4 text-[#cca43b]">Paraphrase %</th>
                </tr>
              </thead>
              <tbody>
                {results.results.map((result, idx) => (
                  <tr key={idx} className="border-b border-gray-700/40 hover:bg-[#1a2d44]">
                    <td className="p-4 text-gray-300">{result.file1}</td>
                    <td className="p-4 text-gray-300">{result.file2}</td>
                    <td className="p-4">
                      <span className={`font-bold ${result.plagiarismPercentage > 50 ? 'text-red-400' : 'text-green-400'}`}>
                        {result.plagiarismPercentage}%
                      </span>
                    </td>
                    <td className="p-4 text-gray-300">{result.exactMatchPercentage.toFixed(2)}%</td>
                    <td className="p-4 text-gray-300">{result.paraphrasePercentage.toFixed(2)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}