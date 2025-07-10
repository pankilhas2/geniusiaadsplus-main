
import React, { useState } from 'react';
import { supabase } from './supabaseClient';
import type { Database } from './supabaseClient';

type VooInsert = Database['public']['Tables']['voos_interesse']['Insert'];

export default function Voos() {
  const [form, setForm] = useState({ origem: '', destino: '', data_voo: '', preco: '' });
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

    const payload: VooInsert = { 
        origem: form.origem,
        destino: form.destino,
        data_voo: form.data_voo,
        preco: precoValue 
    };

    const { error } = await supabase.from('voos_interesse').insert([payload]);

    setLoading(false);
    if (!error) {
      setSucesso(true);
      setForm({ origem: '', destino: '', data_voo: '', preco: '' });
    } else {
      setErrorMsg('Erro ao enviar: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 space-y-4">
      <h2 className="text-xl font-bold mb-4">🛫 Interesse em Voos</h2>
      
      <label htmlFor="origem" className="text-sm text-gray-600">Origem</label>
      <input id="origem" name="origem" value={form.origem} onChange={handleChange} placeholder="Origem" required className="w-full p-2 border rounded-md" />
      <label htmlFor="destino" className="text-sm text-gray-600">Destino</label>
      <input id="destino" name="destino" value={form.destino} onChange={handleChange} placeholder="Destino" required className="w-full p-2 border rounded-md" />
      <label htmlFor="data_voo" className="text-sm text-gray-600">Data do Voo</label>
      <input id="data_voo" name="data_voo" type="date" value={form.data_voo} onChange={handleChange} required className="w-full p-2 border rounded-md" />
      <label htmlFor="preco" className="text-sm text-gray-600">Preço máximo (R$)</label>
      <input id="preco" name="preco" type="number" step="0.01" min="0" value={form.preco} onChange={handleChange} placeholder="Preço máximo (R$)" required className="w-full p-2 border rounded-md" />
      
      <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors">
        {loading ? 'Enviando...' : 'Enviar Interesse'}
      </button>
      
      {sucesso && <p className="text-green-600 mt-3 text-center">✅ Interesse em voo enviado com sucesso!</p>}
      {errorMsg && <p className="text-red-600 mt-3 text-center">{errorMsg}</p>}
    </form>
  );
}