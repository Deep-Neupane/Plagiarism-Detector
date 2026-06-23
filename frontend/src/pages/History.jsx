import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:3000/api';

export default function History() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/history`);
        const data = await response.json();
        setMatches(data.results);
      } catch (error) {
        console.error('Error fetching history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) return <div className="text-white text-center p-8">Loading history...</div>;

  return (
    <div className="min-h-screen bg-[#0d1527] p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-serif text-[#cca43b] mb-8">Analysis History</h1>
        
        {matches.length === 0 ? (
          <div className="text-gray-400 text-center p-8">No analysis history yet</div>
        ) : (
          <div className="bg-[#162235] border border-gray-800/60 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700 bg-[#1a2d44]">
                    <th className="text-left p-4 text-[#cca43b]">File 1</th>
                    <th className="text-left p-4 text-[#cca43b]">File 2</th>
                    <th className="text-left p-4 text-[#cca43b]">Plagiarism %</th>
                    <th className="text-left p-4 text-[#cca43b]">Date</th>
                    <th className="text-left p-4 text-[#cca43b]">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {matches.map((match) => (
                    <tr key={match.id} className="border-b border-gray-700/40 hover:bg-[#1a2d44]">
                      <td className="p-4 text-gray-300">{match.file1}</td>
                      <td className="p-4 text-gray-300">{match.file2}</td>
                      <td className="p-4">
                        <span className={`font-bold ${match.plagiarismPercentage > 50 ? 'text-red-400' : 'text-green-400'}`}>
                          {match.plagiarismPercentage}%
                        </span>
                      </td>
                      <td className="p-4 text-gray-300 text-sm">
                        {new Date(match.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => navigate(`/comparision/${match.fileUploadId}`)}
                          className="px-4 py-2 bg-[#cca43b] text-[#0d1527] rounded hover:bg-[#e0b441] text-sm font-bold"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}