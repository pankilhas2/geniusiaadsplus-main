import { useState, useCallback } from 'react';

function Assistant() {
  const [prompt, setPrompt] = useState('');
  const [resposta, setResposta] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = useCallback(async () => {
    setLoading(true);
    setResposta('');

    try {
      const respostaGemini = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });

      const dados = await respostaGemini.json();
      setResposta(dados.resultado || 'Erro ao responder');
    } catch (error) {
      console.error('Erro:', error);
      setResposta('Erro ao processar a resposta');
    } finally {
      setLoading(false);
    }
  }, [prompt]);

  const speak = useCallback(() => {
    if (!resposta) return;
    const utterance = new SpeechSynthesisUtterance(resposta);
    window.speechSynthesis.speak(utterance);
  }, [resposta]);

  const copy = useCallback(() => {
    if (!resposta) return;
    navigator.clipboard.writeText(resposta);
  }, [resposta]);

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
          <p className="whitespace-pre-wrap">{resposta}</p>
          <div className="flex gap-4 mt-3 pt-3 border-t">
            <button onClick={speak} className="text-purple-600 hover:underline">🔊 Ouvir</button>
            <button onClick={copy} className="text-purple-600 hover:underline">📋 Copiar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Assistant;