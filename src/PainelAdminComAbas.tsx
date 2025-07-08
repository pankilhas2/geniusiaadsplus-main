
import React, { useEffect, useState, useCallback } from 'react';
import { supabase } from './supabaseClient';
import type { Database } from './supabaseClient';

type Aba = 'empregos' | 'voos' | 'hoteis' | 'restaurantes';
type TableName = keyof Database['public']['Tables'];

export default function PainelAdminComAbas() {
  const [aba, setAba] = useState<Aba>('empregos');
  const [dados, setDados] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState('');

  const tabelas: Record<Aba, TableName> = {
    empregos: 'agendamentos',
    voos: 'voos_interesse',
    hoteis: 'hoteis_interesse',
    restaurantes: 'restaurantes_interesse',
  };

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000);
  };

  const carregarDados = useCallback(async () => {
    setLoading(true);
    const tableName = tabelas[aba];
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .order('id', { ascending: false });
      
    setLoading(false);
    if (error) {
        showNotification(`Erro ao carregar dados: ${error.message}`)
        setDados([]);
    } else if (data) {
        setDados(data);
    }
  }, [aba]);

  useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  const copiar = (valor: string) => {
    navigator.clipboard.writeText(valor);
    showNotification('📲 Copiado: ' + valor);
  };

  const favoritar = async (id: number, favoritoAtual: boolean) => {
    const tableName = tabelas[aba];
    const { error } = await supabase
        .from(tableName)
        .update({ favorito: !favoritoAtual })
        .eq('id', id);

    if (error) {
        showNotification(`Erro ao favoritar: ${error.message}`);
    } else {
        carregarDados();
    }
  };

  const excluir = async (id: number) => {
    if(window.confirm('Tem certeza que deseja excluir este item?')) {
        const tableName = tabelas[aba];
        const { error } = await supabase.from(tableName).delete().eq('id', id);
        if (error) {
            showNotification(`Erro ao excluir: ${error.message}`);
        } else {
            showNotification('🗑️ Item excluído com sucesso.');
            carregarDados();
        }
    }
  };

  const exportar = () => {
    if (dados.length === 0) {
        showNotification("Não há dados para exportar.");
        return;
    }
    const keys = Object.keys(dados[0] || {});
    const header = keys.join(',') + '\n';
    const rows = dados.map((d) => keys.map((k) => `"${String(d[k]).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([`\uFEFF${header}${rows}`], { type: 'text/csv;charset=utf-8;' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${aba}_export.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const renderTable = () => {
    if (loading) return <p className="text-center p-8">Carregando dados...</p>;
    if (!dados || dados.length === 0) return <p className="text-center p-8">Nenhum registro encontrado.</p>;

    const headers = Object.keys(dados[0]);

    return (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50">
                    <tr>
                        {headers.map((col) => (
                            <th key={col} className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider capitalize">{col.replace(/_/g, ' ')}</th>
                        ))}
                        <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {dados.map((dado) => (
                        <tr key={dado.id} className="hover:bg-gray-50">
                            {headers.map((key, i) => (
                                <td key={i} className="px-4 py-4 whitespace-nowrap">{String(dado[key] ?? '')}</td>
                            ))}
                            <td className="px-4 py-4 whitespace-nowrap space-x-2">
                                {'whatsapp' in dado && dado.whatsapp && (
                                    <button onClick={() => copiar(dado.whatsapp)} title="Copiar WhatsApp" className="text-blue-600 hover:text-blue-800 text-xl">📲</button>
                                )}
                                {'favorito' in dado && (
                                    <button onClick={() => favoritar(dado.id, dado.favorito)} title="Favoritar" className="text-yellow-500 hover:text-yellow-700 text-xl">{dado.favorito ? '⭐' : '☆'}</button>
                                )}
                                <button onClick={() => excluir(dado.id)} title="Excluir" className="text-red-600 hover:text-red-800 text-xl">🗑️</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">⚙️ Painel Administrativo</h2>

        {notification && (
            <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 my-4 rounded-md" role="alert">
              <p>{notification}</p>
            </div>
        )}

        <div className="flex border-b mb-4 flex-wrap">
            {Object.keys(tabelas).map((key) => (
                <button
                    key={key}
                    className={`px-4 py-2 text-sm font-medium -mb-px border-b-2 transition-colors duration-200 ${aba === key ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                    onClick={() => setAba(key as Aba)}
                >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                </button>
            ))}
        </div>

        <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
            <h3 className="text-lg font-semibold capitalize">{aba}</h3>
            <button onClick={exportar} disabled={dados.length === 0} className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-green-700 disabled:opacity-50">
                📥 Exportar CSV
            </button>
        </div>

        {renderTable()}
    </div>
  );
}
