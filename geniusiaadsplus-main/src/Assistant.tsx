
import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';

// API key must be handled via environment variables.
const API_KEY = process.env.API_KEY;

const Assistant = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAsk = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResponse('');
    setError('');

    if (!API_KEY) {
      setError("API key is not configured. Please contact the administrator.");
      setLoading(false);
      return;
    }

    try {
      const ai = new GoogleGenAI({ apiKey: API_KEY });
      const result = await ai.models.generateContent({
        model: 'gemini-2.5-flash-preview-04-17',
        contents: query,
      });
      setResponse(result.text);
    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      if (errorMessage.includes('API key not valid')) {
          setError('The provided API key is not valid. Please contact the administrator.');
      } else {
          setError(`Sorry, an error occurred while contacting the AI. (${errorMessage})`);
      }
    } finally {
      setLoading(false);
    }
  };

  const speak = () => {
    if (!response || typeof window.speechSynthesis === 'undefined') return;
    speechSynthesis.cancel(); // Cancel any previous speech
    const utterance = new SpeechSynthesisUtterance(response);
    utterance.lang = 'pt-BR';
    speechSynthesis.speak(utterance);
  };

  const copy = () => {
    if (!response) return;
    navigator.clipboard.writeText(response)
      .then(() => alert('Texto copiado!'))
      .catch(() => alert('Falha ao copiar texto.'));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Assistente com IA Gemini</h2>
      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Pergunte algo..."
        className="border w-full p-2 rounded"
        rows={3}
      />
      <button onClick={handleAsk} disabled={loading} className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50">
        {loading ? 'Pensando...' : 'Perguntar à IA'}
      </button>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">{error}</div>}

      {response && (
        <div className="bg-gray-100 p-4 rounded text-black mt-4">
          <p className="whitespace-pre-wrap">{response}</p>
          <div className="flex gap-4 mt-3 pt-3 border-t">
            <button onClick={speak} className="text-purple-600 hover:underline">🔊 Ouvir</button>
            <button onClick={copy} className="text-purple-600 hover:underline">📋 Copiar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Assistant;