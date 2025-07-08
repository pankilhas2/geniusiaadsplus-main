
import React, { useState } from 'react';
import { supabase } from './supabaseClient';
import type { Database } from './supabaseClient';

type AgendamentoInsert = Database['public']['Tables']['agendamentos']['Insert'];

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
}

const WHATSAPP_ADMIN = import.meta.env.VITE_WHATSAPP_ADMIN || '558899999999';

const mockJobs: Job[] = [
  { id: 1, title: 'Atendente de Loja', company: 'Loja Fácil', location: 'São Paulo' },
  { id: 2, title: 'Auxiliar de Escritório', company: 'Global Office', location: 'Rio de Janeiro' },
  { id: 3, title: 'Motorista de Aplicativo', company: 'Genius Ride', location: 'Fortaleza' },
];

const Jobs = () => {
  const [search, setSearch] = useState('');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [agendamento, setAgendamento] = useState({ nome: '', whatsapp: '', email: '' });
  const [loading, setLoading] = useState(false);

  const jobsFiltrados = mockJobs.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.location.toLowerCase().includes(search.toLowerCase())
  );

  const handleAgendar = async () => {
    if (!agendamento.nome || !agendamento.whatsapp || !selectedJob) {
      alert('Por favor, preencha nome e WhatsApp.');
      return;
    }
    setLoading(true);

    const vagaTexto = `${selectedJob.title} – ${selectedJob.company} (${selectedJob.location})`;
    
    const newAgendamento: AgendamentoInsert = {
        nome: agendamento.nome,
        whatsapp: agendamento.whatsapp,
        email: agendamento.email,
        vaga: vagaTexto,
    };

    const { error } = await supabase.from('agendamentos').insert([newAgendamento]);

    if (error) {
        alert('Erro ao salvar agendamento: ' + error.message);
        setLoading(false);
        return;
    }

    const mensagem = `👋 Olá! Novo agendamento de vaga:\n\n` +
      `👤 Nome: ${agendamento.nome}\n📱 WhatsApp: ${agendamento.whatsapp}` +
      (agendamento.email ? `\n📧 E-mail: ${agendamento.email}` : '') +
      `\n📌 Vaga: ${vagaTexto}`;

    const link = `https://wa.me/${WHATSAPP_ADMIN}?text=${encodeURIComponent(mensagem)}`;
    window.open(link, '_blank');
    setLoading(false);
    setSelectedJob(null); // Reset form
    setAgendamento({ nome: '', whatsapp: '', email: '' });
    alert('Interesse enviado com sucesso! Abrindo WhatsApp...');
  };
  
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Busque Vagas de Emprego</h2>
      <input
        type="text"
        placeholder="Buscar por cargo ou cidade..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border rounded"
      />

      {!selectedJob && (
        <div className="space-y-3">
          {jobsFiltrados.map((job) => (
            <div key={job.id} className="border rounded p-4 shadow-sm hover:shadow-lg transition">
              <h3 className="text-lg font-bold">{job.title}</h3>
              <p className="text-sm text-gray-600">{job.company} – {job.location}</p>
              <button onClick={() => setSelectedJob(job)} className="mt-2 bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700">
                Agendar Entrevista
              </button>
            </div>
          ))}
          {jobsFiltrados.length === 0 && <p>Nenhuma vaga encontrada.</p>}
        </div>
      )}

      {selectedJob && (
        <div className="space-y-3 border rounded p-4 bg-gray-100 text-black">
          <h3 className="font-bold">Agendamento para: {selectedJob.title}</h3>
          <input type="text" placeholder="Seu nome completo" value={agendamento.nome} onChange={(e) => setAgendamento({ ...agendamento, nome: e.target.value })} className="w-full p-2 border rounded" />
          <input type="text" placeholder="WhatsApp com DDD" value={agendamento.whatsapp} onChange={(e) => setAgendamento({ ...agendamento, whatsapp: e.target.value })} className="w-full p-2 border rounded" />
          <input type="email" placeholder="E-mail (opcional)" value={agendamento.email} onChange={(e) => setAgendamento({ ...agendamento, email: e.target.value })} className="w-full p-2 border rounded" />
          <div className="flex gap-2 flex-wrap">
            <button onClick={handleAgendar} disabled={loading} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50">
              {loading ? 'Enviando...' : 'Confirmar e Enviar WhatsApp'}
            </button>
            <button onClick={() => setSelectedJob(null)} className="text-sm text-gray-600 underline">
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Jobs;