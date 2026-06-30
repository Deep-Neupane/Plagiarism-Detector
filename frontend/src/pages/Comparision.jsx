import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getResults, getMatchedSections } from '../services/api';
import { highlightText } from '../utils/highlighter';

export default function Comparison() {
  const { fileUploadId } = useParams();
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedMatch, setExpandedMatch] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsData, setDetailsData] = useState(null);

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

  const handleShowMore = async (matchId, resultIndex) => {
    try {
      setDetailsLoading(true);
      
      // Check localStorage cache first
      const cached = localStorage.getItem(`match_${matchId}`);
      if (cached) {
        setDetailsData(JSON.parse(cached));
        setExpandedMatch(resultIndex);
        return;
      }

      // Fetch if not cached
      const data = await getMatchedSections(matchId);
      
      // Store in localStorage
      localStorage.setItem(`match_${matchId}`, JSON.stringify(data));
      
      setDetailsData(data);
      setExpandedMatch(resultIndex);
    } catch (err) {
      console.error('Error fetching matched sections:', err);
      alert('Error loading details: ' + err.message);
    } finally {
      setDetailsLoading(false);
    }
  };

  if (loading) return <div className="text-white text-center p-8">Loading results...</div>;
  if (error) return <div className="text-red-500 text-center p-8">Error: {error}</div>;
  if (!results) return <div className="text-white text-center p-8">No results found</div>;

  return (
    <div className="min-h-screen bg-[#0d1527] p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-serif text-[#cca43b] mb-8">Plagiarism Analysis Results</h1>
        
        <div className="bg-[#162235] border border-gray-800/60 rounded-2xl p-6">
          <p className="text-gray-400 mb-6">
            Analyzed {results.totalMatches} file comparisons
          </p>

          {/* Results Table */}
          <div className="overflow-x-auto mb-8">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left p-4 text-[#cca43b]">File 1</th>
                  <th className="text-left p-4 text-[#cca43b]">File 2</th>
                  <th className="text-left p-4 text-[#cca43b]">Plagiarism %</th>
                  <th className="text-left p-4 text-[#cca43b]">Exact Match %</th>
                  <th className="text-left p-4 text-[#cca43b]">Paraphrase %</th>
                  <th className="text-left p-4 text-[#cca43b]">Action</th>
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
                    <td className="p-4">
                      <button
                        onClick={() => handleShowMore(result.id || idx, idx)}
                        disabled={detailsLoading}
                        className="px-3 py-1 bg-[#cca43b] text-[#0d1527] rounded text-sm font-bold hover:bg-[#e0b441] disabled:opacity-50"
                      >
                        {detailsLoading && expandedMatch === idx ? 'Loading...' : 'Show More'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Detailed View */}
          {expandedMatch !== null && detailsData && (
            <div className="mt-8 border-t border-gray-700 pt-8">
              <h2 className="text-2xl font-serif text-[#cca43b] mb-6">
                Detailed Comparison: {detailsData.file1} vs {detailsData.file2}
              </h2>

              <div className="grid grid-cols-2 gap-6">
                {/* File 1 */}
                <div>
                  <h3 className="text-lg font-bold text-[#cca43b] mb-4">{detailsData.file1}</h3>
                  <div className="bg-[#0d1527] border border-gray-700 rounded p-4 max-h-96 overflow-y-auto">
                    <p className="text-gray-300 whitespace-pre-wrap text-sm leading-relaxed">
                      {detailsData.text1}
                    </p>
                  </div>
                </div>

                {/* File 2 */}
                <div>
                  <h3 className="text-lg font-bold text-[#cca43b] mb-4">{detailsData.file2}</h3>
                  <div className="bg-[#0d1527] border border-gray-700 rounded p-4 max-h-96 overflow-y-auto">
                    <p className="text-gray-300 whitespace-pre-wrap text-sm leading-relaxed">
                      {detailsData.text2}
                    </p>
                  </div>
                </div>
              </div>

              {/* Matched Sections List */}
              {detailsData.matched_sections && detailsData.matched_sections.length > 0 && (
                <div className="mt-6 border-t border-gray-700 pt-6">
                  <h3 className="text-lg font-bold text-[#cca43b] mb-4">
                    Matched Sections ({detailsData.matched_sections.length})
                  </h3>
                  <div className="space-y-3">
                    {detailsData.matched_sections.map((section, idx) => (
                      <div key={idx} className="bg-[#1a2d44] border border-gray-700/40 rounded p-3">
                        <p className="text-gray-300 font-mono text-sm">
                          "{section.matched_text}"
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          File 1: chars {section.start_char_file1}-{section.end_char_file1} | 
                          File 2: chars {section.start_char_file2}-{section.end_char_file2}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => setExpandedMatch(null)}
                className="mt-6 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Close Details
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        mark {
          background-color: rgba(204, 164, 59, 0.3);
          color: #cca43b;
        }
      `}</style>
    </div>
  );
}