
import React, { useState } from 'react';
import { supabase } from './supabaseClient';
import type { Database } from './supabaseClient';

type RestauranteInsert = Database['public']['Tables']['restaurantes_interesse']['Insert'];

export default function Restaurantes() {
  const [form, setForm] = useState({ nome_restaurante: '', latitude: '', longitude: '' });
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
    
    const lat = parseFloat(form.latitude);
    const lon = parseFloat(form.longitude);

    if (isNaN(lat) || isNaN(lon)) {
        setErrorMsg('Por favor, insira valores válidos para latitude e longitude.');
        setLoading(false);
        return;
    }

    const payload: RestauranteInsert = { 
        nome_restaurante: form.nome_restaurante, 
        latitude: lat, 
        longitude: lon 
    };

    const { error } = await supabase.from('restaurantes_interesse').insert([payload]);

    setLoading(false);
    if (!error) {
      setSucesso(true);
      setForm({ nome_restaurante: '', latitude: '', longitude: '' });
    } else {
      setErrorMsg('Erro ao enviar: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 space-y-4">
      <h2 className="text-xl font-bold mb-4">🍽️ Interesse em Restaurantes</h2>
      <input name="nome_restaurante" value={form.nome_restaurante} onChange={handleChange} placeholder="Nome do restaurante" required className="w-full p-2 border rounded-md" />
      <input name="latitude" type="number" step="any" value={form.latitude} onChange={handleChange} placeholder="Latitude (ex: -3.74)" required className="w-full p-2 border rounded-md" />
      <input name="longitude" type="number" step="any" value={form.longitude} onChange={handleChange} placeholder="Longitude (ex: -38.52)" required className="w-full p-2 border rounded-md" />
      <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors">
        {loading ? 'Enviando...' : 'Enviar Interesse'}
      </button>
      {sucesso && <p className="text-green-600 mt-3 text-center">✅ Interesse em restaurante enviado com sucesso!</p>}
      {errorMsg && <p className="text-red-600 mt-3 text-center">{errorMsg}</p>}
    </form>
  );
}