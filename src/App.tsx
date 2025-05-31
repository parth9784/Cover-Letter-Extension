import React, { useState } from "react";
import { aiService } from "./service/AiService";
import { Loader, Copy, Check, Download } from "lucide-react";
import { jsPDF } from "jspdf";
const App = () => {
  const [resume, setResume] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(coverLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFont("Helvetica");
    doc.setFontSize(12);
    const wrappedText = doc.splitTextToSize(coverLetter, 180);
    doc.text(wrappedText, 15, 20);

    doc.save("cover_letter.pdf");
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resume || !jobDescription || !companyName) {
      alert("Please fill all fields before submitting.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("jobDescription", jobDescription);
    formData.append("companyName", companyName);

    try {
      const response = await aiService.getResponse(formData);
      setCoverLetter(response || "Cover letter generated successfully!");
    } catch (err) {
      console.error(err);
      alert("Error generating cover letter.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[380px] min-h-[500px] bg-white rounded-2xl shadow-lg p-5 font-sans border border-gray-100 ::-webkit-scrollbar">
      <form onSubmit={handleSubmit} className="space-y-5">
        <h2 className="text-3xl font-bold text-indigo-700 text-center tracking-tight poppins-regular">
          Cover Letter Generator
        </h2>

        <div>
          <label className="block text-sm text-gray-600 mb-1 font-medium">
            Upload Resume (PDF)
          </label>
          <input
            title="input"
            type="file"
            accept=".pdf"
            onChange={(e) => setResume(e.target.files?.[0] || null)}
            className="block w-full text-sm file:bg-indigo-100 file:text-indigo-700 file:rounded-lg file:border-0 file:py-2 file:px-4 hover:file:bg-indigo-200 transition-colors duration-200"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1 font-medium">
            Company Name
          </label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="e.g. Google"
            className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1 font-medium">
            Job Description
          </label>
          <textarea
            rows={5}
            placeholder="Paste job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="w-full p-2.5 border border-gray-300 rounded-lg resize-none text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition duration-200 flex justify-center items-center gap-2"
        >
          {loading ? (
            <>
              <Loader size={17} className="animate-spin" /> Generating...
            </>
          ) : (
            "Generate Cover Letter"
          )}
        </button>

        {coverLetter && (
          <div className="mt-4 p-4 bg-gray-50 border cursor-pointer border-gray-200 rounded-lg text-sm max-h-48 overflow-y-auto shadow-inner scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-track-gray-100 relative">
            <strong className="block mb-2 text-indigo-600 font-semibold">
              Generated Cover Letter:
            </strong>
            <p className="whitespace-pre-line text-gray-800">{coverLetter}</p>

            <button
              type="button"
              onClick={handleCopy}
              className="absolute top-2 right-2 text-indigo-600 hover:text-indigo-800 transition"
              title="Copy to clipboard"
            >
              {copied ? <Check size={18} /> : <Copy className="cursor-pointer" size={18} />}
            </button>
            <button
              type="button"
              onClick={handleDownloadPDF}
              className="absolute top-2 right-10 text-indigo-600 hover:text-indigo-800 transition"
              title="Download PDF"
            >
              <Download className="cursor-pointer" size={18} />
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default App;
