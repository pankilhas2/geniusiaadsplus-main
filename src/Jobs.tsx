
import React, { useState } from 'react';
import { supabase } from './supabaseClient';
import { GoogleGenAI } from '@google/genai';
import type { Database } from './supabaseClient';

type AgendamentoInsert = Database['public']['Tables']['agendamentos']['Insert'];

// A chave de API deve ser gerenciada por variáveis de ambiente.
const API_KEY = process.env.API_KEY;

export default function Jobs() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [vaga, setVaga] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.from('agendamentos').insert({
      nome,
      email,
      whatsapp,
      vaga
    });

    if (error) {
      setMensagem('Erro ao agendar: ' + error.message);
    } else {
      setMensagem('Agendamento realizado com sucesso!');
      setNome('');
      setEmail('');
      setWhatsapp('');
      setVaga('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-3">
      <input
        type="text"
        className="border p-2 rounded w-full"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value ?? '')}
      />
      <input
        type="email"
        className="border p-2 rounded w-full"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value ?? '')}
      />
      <input
        type="text"
        className="border p-2 rounded w-full"
        placeholder="WhatsApp"
        value={whatsapp}
        onChange={(e) => setWhatsapp(e.target.value ?? '')}
      />
      <input
        type="text"
        className="border p-2 rounded w-full"
        placeholder="Vaga desejada"
        value={vaga}
        onChange={(e) => setVaga(e.target.value ?? '')}
      />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        Agendar
      </button>
      {mensagem && <p className="text-sm text-center mt-2">{mensagem}</p>}
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