import { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [translation, setTranslation] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showReportForm, setShowReportForm] = useState(false);
  const [reportData, setReportData] = useState({
    original_text: "",
    incorrect_translation: "",
    expected_translation: "",
    notes: "",
  });

  const API_URL = "http://localhost:8000/api";

  const handleTranslate = async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    setError("");
    setTranslation("");

    try {
      const response = await fetch(`${API_URL}/translate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });

      const data = await response.json();

      if (data.success && data.translation) {
        setTranslation(data.translation);
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
    <div className="app-container">
      <header className="app-header">
        <div className="logo-container">
          <span className="logo-icon">🌐</span>
          <h1>SmartLang Translator</h1>
        </div>
        <p className="app-subtitle">English to Spanish Compiler-Based Translation</p>
      </header>

      <div className="translation-container">
        <div className="input-section">
          <div className="section-header">
            <h2>English Input</h2>
            <div className="language-badge">EN</div>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter English text here..."
            rows={5}
            className="input-textarea"
          />
          <button 
            className="translate-button" 
            onClick={handleTranslate} 
            disabled={isLoading || !input.trim()}
          >
            {isLoading ? (
              <span className="loading-indicator">
                <span className="loading-dot"></span>
                <span className="loading-dot"></span>
                <span className="loading-dot"></span>
              </span>
            ) : (
              <>Translate</>
            )}
          </button>
        </div>

        <div className="output-section">
          <div className="section-header">
            <h2>Spanish Translation</h2>
            <div className="language-badge">ES</div>
          </div>
          
          {error ? (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              <p>{error}</p>
            </div>
          ) : translation ? (
            <div className="translation-output">
              <p>{translation}</p>
              <button onClick={handleReportError} className="report-button">
                <span className="report-icon">🔍</span> Report Error
              </button>
            </div>
          ) : (
            <div className="placeholder-container">
              <p className="placeholder-text">Translation will appear here...</p>
              {isLoading && (
                <div className="translation-loading">
                  <div className="translation-loading-animation"></div>
                </div>
              )}
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
                onClick={() => setShowReportForm(false)} 
                className="close-button"
              >
                ×
              </button>
            </div>
            
            <div className="form-field">
              <label>Original Text:</label>
              <input type="text" value={reportData.original_text} readOnly />
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
                onChange={(e) =>
                  setReportData({
                    ...reportData,
                    expected_translation: e.target.value,
                  })
                }
                placeholder="Enter the correct translation"
              />
            </div>
            
            <div className="form-field">
              <label>Notes:</label>
              <textarea
                value={reportData.notes}
                onChange={(e) =>
                  setReportData({ ...reportData, notes: e.target.value })
                }
                placeholder="Please explain what's wrong with the translation"
                rows={3}
              />
            </div>
            
            <div className="button-group">
              <button 
                onClick={submitErrorReport} 
                className="submit-button"
                disabled={!reportData.expected_translation.trim()}
              >
                Submit Report
              </button>
              <button
                onClick={() => setShowReportForm(false)}
                className="cancel-button"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

  <footer className="app-footer">
  <p>
    Developed by <strong>SmartLang Team</strong> — Parthik Mangal, Sweta Chand, Abhishek Singh
  </p>
  <p>© 2023 SmartLang Translator | Compiler-Based Translation Technology</p>
</footer>

    </div>
  );
}

export default App;
