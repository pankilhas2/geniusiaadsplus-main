import { useState } from 'react';

export default function Assistant() {
  const [prompt, setPrompt] = useState('');
  const [resposta, setResposta] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleAsk() {
    setLoading(true);
    setResposta('');

    const respostaGemini = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });

    const dados = await respostaGemini.json();
    setResposta(dados.resultado || 'Erro ao responder');
    setLoading(false);
  }

  return (
    <div className="p-4">
      <textarea
        className="w-full p-2 border rounded"
        placeholder="Pergunte algo à IA..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value ?? '')}
      />
      <button
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleAsk}
        disabled={loading}
      >
        {loading ? 'Carregando...' : 'Perguntar'}
      </button>
      {resposta && (
        <div className="mt-4 p-2 border rounded bg-gray-100">
          {resposta}
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