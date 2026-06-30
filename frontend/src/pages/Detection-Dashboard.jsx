import React from "react";
import { AlertTriangle, FileText } from "lucide-react";

const documents = [
  "Document A",
  "Document B",
  "Document C",
  "Document D",
  "Document E",
];

const similarityData = [
  [100, 78, 23, 15, 45],
  [78, 100, 82, 34, 67],
  [23, 82, 100, 12, 29],
  [15, 34, 12, 100, 8],
  [45, 67, 29, 8, 100],
];

const getColor = (value) => {
  if (value === 100) return "bg-[#173866]";
  if (value <= 30) return "bg-[#0c4d4d] border border-green-600";
  if (value <= 60) return "bg-[#4d4a2c] border border-yellow-600";
  return "bg-[#4d2743] border border-pink-600";
};

export default function PlagiarismDashboard() {
  return (
    <div className="min-h-screen bg-[#071a35] text-white p-10">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-5xl font-serif text-yellow-400">
            Plagiarism Detection Results
          </h1>

          <p className="text-slate-400 mt-2 text-lg">
            Pairwise similarity analysis of uploaded documents
          </p>
        </div>

        <button className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-medium hover:bg-yellow-300 transition">
          Run New Check
        </button>
      </div>

      {/* Summary Card */}
      <div className="bg-[#102b55] rounded-3xl border border-slate-700 p-8 mb-10">
        <h2 className="text-4xl font-serif text-yellow-400 mb-8">Summary</h2>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Highest Similarity */}
          <div className="flex gap-5 items-center">
            <div className="w-14 h-14 rounded-xl bg-red-500/10 flex items-center justify-center">
              <AlertTriangle className="text-red-400" size={28} />
            </div>

            <div>
              <p className="text-slate-400">Highest Similarity</p>

              <h3 className="text-5xl text-red-400 font-semibold">82%</h3>

              <p className="text-lg text-slate-300">Document B vs Document C</p>
            </div>
          </div>

          {/* Average Similarity */}
          <div className="flex gap-5 items-center">
            <div className="w-14 h-14 rounded-xl bg-yellow-500/10 flex items-center justify-center">
              <FileText className="text-yellow-400" size={28} />
            </div>

            <div>
              <p className="text-slate-400">Average Similarity</p>

              <h3 className="text-5xl text-yellow-400 font-semibold">39%</h3>

              <p className="text-lg text-slate-300">
                Across all document pairs
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Similarity Matrix */}
      <div className="bg-[#102b55] rounded-3xl border border-slate-700 p-8">
        <h2 className="text-4xl font-serif text-yellow-400 mb-10">
          Similarity Matrix
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-center">
            <thead>
              <tr>
                <th className="border border-slate-600 p-4"></th>

                {documents.map((doc) => (
                  <th
                    key={doc}
                    className="border border-slate-600 p-4 text-yellow-400 text-xl"
                  >
                    {doc}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {documents.map((rowDoc, rowIndex) => (
                <tr key={rowDoc}>
                  <td className="border border-slate-600 p-4 text-left text-yellow-400 text-xl">
                    {rowDoc}
                  </td>

                  {similarityData[rowIndex].map((value, colIndex) => (
                    <td
                      key={colIndex}
                      className={`border border-slate-600 p-4 h-28 ${getColor(
                        value,
                      )}`}
                    >
                      <div className="flex flex-col items-center gap-3">
                        <span
                          className={`text-2xl font-medium ${
                            value <= 30
                              ? "text-green-400"
                              : value <= 60
                                ? "text-yellow-400"
                                : value === 100
                                  ? "text-slate-400"
                                  : "text-pink-400"
                          }`}
                        >
                          {value}%
                        </span>

                        {value !== 100 && (
                          <button className="bg-[#03152d] border border-yellow-500 text-yellow-400 px-4 py-2 rounded-lg text-sm hover:bg-[#0a2142]">
                            View Details
                          </button>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="flex gap-8 mt-10 text-slate-300">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded border border-green-500 bg-[#0c4d4d]" />
            <span>Low (0-30%)</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded border border-yellow-500 bg-[#4d4a2c]" />
            <span>Medium (31-60%)</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded border border-pink-500 bg-[#4d2743]" />
            <span>High (61-100%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
