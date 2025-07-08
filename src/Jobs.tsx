
import React, { useState } from 'react';
import { supabase } from './supabaseClient';
import { GoogleGenAI } from '@google/genai';
import type { Database } from './supabaseClient';

type AgendamentoInsert = Database['public']['Tables']['agendamentos']['Insert'];

// A chave de API deve ser gerenciada por variáveis de ambiente.
const API_KEY = process.env.API_KEY;

export default function Jobs() {
  const [form, setForm] = useState({ nome: '', email: '', whatsapp: '', vaga: '' });
  const [respostaIA, setRespostaIA] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [loadingIA, setLoadingIA] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSucesso(false);
    setErrorMsg('');
    setRespostaIA('');
  };

  const gerarRespostaIA = async () => {
    if (!API_KEY) {
      setRespostaIA("A funcionalidade de IA não está configurada.");
      return;
    }
    setLoadingIA(true);
    setRespostaIA('');
    try {
      const ai = new GoogleGenAI({ apiKey: API_KEY });
      const prompt = `Como um especialista em RH, me dê uma dica curta e impactante para uma entrevista para a vaga de "${form.vaga}".`;
      const result = await ai.models.generateContent({
        model: 'gemini-2.5-flash-preview-04-17',
        contents: prompt,
      });
      setRespostaIA(result.text);
    } catch (e) {
      console.error(e);
      setRespostaIA('Desculpe, não foi possível obter uma dica da IA no momento.');
    } finally {
      setLoadingIA(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSucesso(false);
    setErrorMsg('');

    const payload: AgendamentoInsert = { ...form };

    const { error } = await supabase.from('agendamentos').insert([payload]);

    setLoading(false);

    if (!error) {
      setSucesso(true);
      setForm({ nome: '', email: '', whatsapp: '', vaga: '' });
      gerarRespostaIA();
    } else {
      setErrorMsg('Erro ao enviar: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 space-y-4">
      <h2 className="text-xl font-bold mb-4">📄 Interesse em Empregos</h2>
      <input name="nome" value={form.nome} onChange={handleChange} placeholder="Nome completo" required className="w-full p-2 border rounded-md" />
      <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full p-2 border rounded-md" />
      <input name="whatsapp" value={form.whatsapp} onChange={handleChange} placeholder="WhatsApp" required className="w-full p-2 border rounded-md" />
      <input name="vaga" value={form.vaga} onChange={handleChange} placeholder="Vaga de interesse" required className="w-full p-2 border rounded-md" />
      <button type="submit" disabled={loading || loadingIA} className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors">
        {loading ? 'Enviando Dados...' : 'Enviar Interesse'}
      </button>

      {sucesso && <p className="text-green-600 mt-3 text-center">✅ Dados enviados com sucesso!</p>}
      {errorMsg && <p className="text-red-600 mt-3 text-center">{errorMsg}</p>}

      {(loadingIA || respostaIA) && (
        <div className="mt-4 p-4 border bg-gray-50 rounded-lg shadow-inner">
          <strong className="text-indigo-700">🤖 Dica do Genius para sua entrevista:</strong>
          {loadingIA ? (
            <p className="animate-pulse">Pensando em uma dica para você...</p>
          ) : (
            <p className="mt-2 text-gray-800">{respostaIA}</p>
          )}
        </div>
      )}
    </form>
  );
}