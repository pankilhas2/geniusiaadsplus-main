import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from './supabaseClient';
import type { Database } from './supabaseClient';

type Aba = 'agendamentos' | 'voos' | 'restaurantes' | 'hoteis';
type TableName = keyof Database['public']['Tables'];

export default function AdminPanel() {
  const [aba, setAba] = useState<Aba>('agendamentos');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const tableNameMap: Record<Aba, TableName> = {
        agendamentos: 'agendamentos',
        voos: 'voos_interesse',
        restaurantes: 'restaurantes_interesse',
        hoteis: 'hoteis_interesse'
    };
    const tableName = tableNameMap[aba];
    
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .order('criado_em', { ascending: false });

    if (error) {
      alert(`Erro ao buscar dados de ${aba}: ${error.message}`);
      setData([]);
    } else {
      setData(data || []);
    }
    setLoading(false);
  }, [aba]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  const renderTable = () => {
    if(loading) return <p className="text-center p-4">Carregando dados...</p>;
    if(data.length === 0) return <p className="text-center p-4">Nenhum registro encontrado.</p>;

    const headers = Object.keys(data[0] || {});
    return (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        {headers.map(h => <th key={h} scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider capitalize">{h.replace(/_/g, ' ')}</th>)}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                            {headers.map(h => <td key={`${item.id}-${h}`} className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                                {h === 'criado_em' && item[h] ? new Date(item[h]).toLocaleString('pt-BR') : item[h] === null ? '-' : String(item[h])}
                            </td>)}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
  }

  const abas: { id: Aba; label: string }[] = [
      {id: 'agendamentos', label: 'Agendamentos'},
      {id: 'voos', label: 'Voos'},
      {id: 'restaurantes', label: 'Restaurantes'},
      {id: 'hoteis', label: 'Hotéis'}
  ];

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-6">Painel Administrativo</h1>
      <div className="flex gap-1 sm:gap-3 mb-6 border-b flex-wrap">
          {abas.map(a => (
               <button
                  key={a.id}
                  onClick={() => setAba(a.id)}
                  className={`px-4 py-2 text-sm sm:text-base rounded-t-lg transition-colors focus:outline-none ${aba === a.id ? 'bg-indigo-600 text-white font-semibold' : 'text-gray-600 hover:bg-gray-200'}`}
                >
                  {a.label}
                </button>
          ))}
      </div>
      <div>
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold capitalize">Interesses de {aba.replace(/_/g, ' ')}</h2>
            <button onClick={fetchData} disabled={loading} className="text-sm bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300 disabled:opacity-50">
                {loading ? 'Atualizando...' : 'Atualizar'}
            </button>
        </div>
        {renderTable()}
      </div>
    </div>
  );
}