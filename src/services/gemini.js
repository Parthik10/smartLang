import { GoogleGenerativeAI } from "@google/generative-ai";

// Ensure you have your VITE_GEMINI_API_KEY in a .env file
const API_KEY =import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error("VITE_GEMINI_API_KEY is not defined in your environment variables. Please add it to your .env file.");
}

const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/**
 * Checks the grammar of a given sentence.
 * @param {string} sentence The sentence to check.
 * @returns {Promise<string>} The correction result.
 */
export const checkGrammar = async (sentence) => {
  if (!sentence.trim()) return "Please enter a sentence.";

  const prompt = `Correct the following English sentence. If it's already correct, respond with only the word "Correct". If it's incorrect, provide the corrected sentence followed by a brief, one-sentence explanation of the changes, like this: 'Corrected sentence. - Explanation.'

Original: "${sentence}"`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Full error response from Gemini API (grammar check):", error);
    return "Error: Could not connect to the grammar checking service. Check the browser console for details.";
  }
};

/**
 * Generates a simple sentence based on a category.
 * @param {string} category The category for sentence generation.
 * @returns {Promise<string>} The generated sentence.
 */
export const generateSentence = async (category) => {
  if (!category) return "";

  const prompt = `Generate one simple, beginner-friendly English sentence about ${category}, ensuring the sentence is at least 20 words long.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().replace(/"/g, ''); // Remove quotes from the response
  } catch (error) {
    console.error("Full error response from Gemini API (sentence generation):", error);
    return "Error: Could not generate a sentence. Check the browser console for details.";
  }
}; 