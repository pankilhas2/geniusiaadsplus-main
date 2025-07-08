
import React, { useState } from 'react';
import { supabase } from './supabaseClient';
import type { Database } from './supabaseClient';

type HotelInsert = Database['public']['Tables']['hoteis_interesse']['Insert'];

export default function Hoteis() {
  const [form, setForm] = useState({ cidade: '', data_entrada: '', data_saida: '', preco: '' });
  const [sucesso, setSucesso] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSucesso(false);
    setErrorMsg('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSucesso(false);
    setErrorMsg('');
    
    const precoValue = parseFloat(form.preco);
    if (isNaN(precoValue) || precoValue <= 0) {
        setErrorMsg('Por favor, insira um preço válido.');
        setLoading(false);
        return;
    }

    if (form.data_entrada && form.data_saida && form.data_entrada >= form.data_saida) {
        setErrorMsg('A data de saída deve ser posterior à data de entrada.');
        setLoading(false);
        return;
    }

    const payload: HotelInsert = { 
        cidade: form.cidade,
        data_entrada: form.data_entrada,
        data_saida: form.data_saida,
        preco: precoValue
    };

    const { error } = await supabase.from('hoteis_interesse').insert([payload]);
    
    setLoading(false);
    if (!error) {
      setSucesso(true);
      setForm({ cidade: '', data_entrada: '', data_saida: '', preco: '' });
    } else {
      setErrorMsg('Erro ao enviar: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 space-y-4">
      <h2 className="text-xl font-bold mb-4">🏨 Interesse em Hotéis</h2>
      <input name="cidade" value={form.cidade} onChange={handleChange} placeholder="Cidade" required className="w-full p-2 border rounded-md" />
      <label className="text-sm text-gray-600">Data de Entrada</label>
      <input name="data_entrada" type="date" value={form.data_entrada} onChange={handleChange} required className="w-full p-2 border rounded-md" />
      <label className="text-sm text-gray-600">Data de Saída</label>
      <input name="data_saida" type="date" value={form.data_saida} onChange={handleChange} required className="w-full p-2 border rounded-md" />
      <input name="preco" type="number" step="0.01" min="0" value={form.preco} onChange={handleChange} placeholder="Preço máximo por diária (R$)" required className="w-full p-2 border rounded-md" />
      <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors">
        {loading ? 'Enviando...' : 'Enviar Interesse'}
      </button>
      {sucesso && <p className="text-green-600 mt-3 text-center">✅ Interesse em hotel enviado com sucesso!</p>}
      {errorMsg && <p className="text-red-600 mt-3 text-center">{errorMsg}</p>}
    </form>
  );
}