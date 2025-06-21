import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import InputSection from "./components/translation/InputSection";
import OutputSection from "./components/translation/OutputSection";
import TokenList from "./components/visualization/TokenList";
import ParseTree from "./components/visualization/ParseTree";
import { checkGrammar, generateSentence } from "./services/gemini";

function App() {
  const [input, setInput] = useState("");
  const [translation, setTranslation] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showReportForm, setShowReportForm] = useState(false);
  const [tokens, setTokens] = useState([]);
  const [parseTree, setParseTree] = useState(null);
  const [reportData, setReportData] = useState({
    original_text: "",
    incorrect_translation: "",
    expected_translation: "",
    notes: "",
  });
  const [grammarResult, setGrammarResult] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000/api";

  const handleTranslate = async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    setError("");
    setTranslation("");
    setTokens([]);
    setParseTree(null);
    setGrammarResult("");

    // Step 1: Check grammar before translation
    const grammarCheckResult = await checkGrammar(input);
    setGrammarResult(grammarCheckResult);

    // Step 2: Proceed with translation
    try {
      const response = await fetch(`${API_URL}/translate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }), // Always translate the original input
      });

      const data = await response.json();

      if (data.success) {
        setTranslation(data.translation);
        setTokens(data.tokens || []);
        setParseTree(data.parseTree || null);
      } else {
        const msg = data.error?.includes("structure")
          ? "Could not understand sentence structure. Try simplifying it."
          : data.error || "Translation failed.";
        setError(msg);
      }
    } catch (err) {
      setError("Error connecting to the server.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateAndSetInput = async (category) => {
    if (!category) return;
    setIsGenerating(true);
    setGrammarResult("");
    setInput("");
    const generated = await generateSentence(category);
    setInput(generated);
    setIsGenerating(false);
  };

  const handleReportError = () => {
    setShowReportForm(true);
    setReportData({
      original_text: input,
      incorrect_translation: translation,
      expected_translation: "",
      notes: "",
    });
  };

  const submitErrorReport = async () => {
    try {
      const response = await fetch(`${API_URL}/report-error`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reportData),
      });

      const data = await response.json();

      if (data.success) {
        alert("Error report submitted successfully");
        setShowReportForm(false);
      } else {
        alert("Failed to submit error report");
      }
    } catch (err) {
      alert("Error connecting to the server");
      console.error(err);
    }
  };

  return (
    <>
      <div className="app-container">
        <Header />

        <div className="translation-container">
          <div className="translation-grid">
            <InputSection
              input={input}
              setInput={setInput}
              handleTranslate={handleTranslate}
              isLoading={isLoading || isGenerating}
              handleGenerate={handleGenerateAndSetInput}
              grammarResult={grammarResult}
            />
            <OutputSection
              translation={translation}
              error={error}
              handleReportError={handleReportError}
            />
          </div>

          <div className="visualization-container">
            {tokens.length > 0 && (
              <div className="visualization-section">
                <TokenList tokens={tokens} />
              </div>
            )}
            {parseTree && (
              <div className="visualization-section">
                <ParseTree tree={parseTree} />
              </div>
            )}
          </div>
        </div>

        {showReportForm && (
          <div className="modal-overlay">
            <div className="report-form">
              <div className="report-form-header">
                <h2>Report Translation Error</h2>
                <button 
                  className="close-button"
                  onClick={() => setShowReportForm(false)}
                >
                  ×
                </button>
              </div>
              
              <div className="form-field">
                <label>Original Text:</label>
                <input 
                  type="text" 
                  value={reportData.original_text} 
                  readOnly 
                />
              </div>
              
              <div className="form-field">
                <label>Incorrect Translation:</label>
                <input
                  type="text"
                  value={reportData.incorrect_translation}
                  readOnly
                />
              </div>
              
              <div className="form-field">
                <label>Expected Translation:</label>
                <input
                  type="text"
                  value={reportData.expected_translation}
                  onChange={(e) => setReportData({...reportData, expected_translation: e.target.value})}
                />
              </div>
              
              <div className="form-field">
                <label>Additional Notes:</label>
                <textarea
                  value={reportData.notes}
                  onChange={(e) => setReportData({...reportData, notes: e.target.value})}
                />
              </div>
              
              <div className="button-group">
                <button
                  className="cancel-button"
                  onClick={() => setShowReportForm(false)}
                >
                  Cancel
                </button>
                <button
                  className="submit-button"
                  onClick={submitErrorReport}
                >
                  Submit Report
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default App;
