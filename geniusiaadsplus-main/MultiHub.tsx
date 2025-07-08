
import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import type { Database } from './supabaseClient';

const WHATSAPP_ADMIN = import.meta.env.VITE_WHATSAPP_ADMIN || '558899999999';

const cidades = ['São Paulo', 'Rio de Janeiro', 'Fortaleza', 'Salvador', 'Recife'];
const restaurantesMock = [
  { nome: 'Churrascaria Boi Na Brasa', distanciaKm: 1.2, avaliacao: 4.8 },
  { nome: 'Sushi Sampa', distanciaKm: 0.8, avaliacao: 4.6 },
  { nome: 'Cantina Italiana', distanciaKm: 2.3, avaliacao: 4.5 },
];
const gerarPreco = () => (200 + Math.random() * 500).toFixed(2);

type VooInsert = Database['public']['Tables']['voos_interesse']['Insert'];
type RestauranteInsert = Database['public']['Tables']['restaurantes_interesse']['Insert'];
type HotelInsert = Database['public']['Tables']['hoteis_interesse']['Insert'];

export default function MultiHub() {
  const [abaAtiva, setAbaAtiva] = useState<'voo' | 'restaurante' | 'hotel'>('voo');
  const [voo, setVoo] = useState({ origem: '', destino: '', data: '', preco: '' });
  const [hotel, setHotel] = useState({ cidade: '', entrada: '', saida: '', preco: '' });
  const [posicao, setPosicao] = useState<{ lat: number; lng: number } | null>(null);
  const [loadingGeo, setLoadingGeo] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (abaAtiva === 'restaurante') {
        if (posicao) {
            setLoadingGeo(false);
            return;
        }
      setLoadingGeo(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosicao({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setLoadingGeo(false);
        },
        () => setLoadingGeo(false)
      );
    }
  }, [abaAtiva, posicao]);

  const sendWhatsappMessage = (message: string) => {
    const link = `https://wa.me/${WHATSAPP_ADMIN}?text=${encodeURIComponent(message)}`;
    window.open(link, '_blank');
    alert('Interesse salvo e WhatsApp aberto!');
  }

  const handleVooAction = async () => {
    const precoNum = parseFloat(voo.preco);
    if (!voo.origem || !voo.destino || !voo.data || !voo.preco || isNaN(precoNum)) {
        alert('Por favor, preencha todos os campos de voo corretamente.');
        return;
    }
    const vooDetails: VooInsert = {
        origem: voo.origem,
        destino: voo.destino,
        data_voo: voo.data,
        preco: precoNum,
    };
    setLoading(true);
    const { error } = await supabase.from('voos_interesse').insert([vooDetails]);
    setLoading(false);
    if (error) {
        alert(`Erro ao salvar interesse: ${error.message}`);
    } else {
        const mensagem = `✈️ Interesse em voo:\nOrigem: ${vooDetails.origem}\nDestino: ${vooDetails.destino}\nData: ${vooDetails.data_voo}\nPreço: R$ ${vooDetails.preco.toFixed(2)}`;
        sendWhatsappMessage(mensagem);
    }
  }

  const handleRestauranteAction = async (restaurante: {nome: string}) => {
    if (!posicao) {
        alert('Localização não disponível.');
        return;
    }
    const restauranteDetails: RestauranteInsert = {
        nome_restaurante: restaurante.nome,
        latitude: posicao.lat,
        longitude: posicao.lng,
    };
    setLoading(true);
    const { error } = await supabase.from('restaurantes_interesse').insert([restauranteDetails]);
    setLoading(false);
    if (error) {
        alert(`Erro ao salvar interesse: ${error.message}`);
    } else {
        const mensagem = `🍽️ Interesse em restaurante:\nNome: ${restauranteDetails.nome_restaurante}\nLocalização: ${restauranteDetails.latitude}, ${restauranteDetails.longitude}`;
        sendWhatsappMessage(mensagem);
    }
  }
  
  const handleHotelAction = async () => {
    const precoNum = parseFloat(hotel.preco);
    if (!hotel.cidade || !hotel.entrada || !hotel.saida || !hotel.preco || isNaN(precoNum)) {
        alert('Por favor, preencha todos os campos de hotel corretamente.');
        return;
    }
     const hotelDetails: HotelInsert = {
        cidade: hotel.cidade,
        data_entrada: hotel.entrada,
        data_saida: hotel.saida,
        preco: precoNum
    };
    setLoading(true);
    const { error } = await supabase.from('hoteis_interesse').insert([hotelDetails]);
    setLoading(false);
    if (error) {
        alert(`Erro ao salvar interesse: ${error.message}`);
    } else {
        const mensagem = `🏨 Interesse em hospedagem:\nCidade: ${hotelDetails.cidade}\nEntrada: ${hotelDetails.data_entrada}\nSaída: ${hotelDetails.data_saida}\nPreço: R$ ${hotelDetails.preco.toFixed(2)}`;
        sendWhatsappMessage(mensagem);
    }
  }


  return (
    <div className="space-y-6">
      <div className="flex gap-3 justify-center border-b pb-2">
        <button onClick={() => setAbaAtiva('voo')} className={`px-4 py-2 rounded-t-lg transition-colors ${abaAtiva === 'voo' ? 'bg-indigo-600 text-white' : 'hover:bg-gray-200'}`}>✈️ Voos</button>
        <button onClick={() => setAbaAtiva('restaurante')} className={`px-4 py-2 rounded-t-lg transition-colors ${abaAtiva === 'restaurante' ? 'bg-indigo-600 text-white' : 'hover:bg-gray-200'}`}>🍽️ Restaurantes</button>
        <button onClick={() => setAbaAtiva('hotel')} className={`px-4 py-2 rounded-t-lg transition-colors ${abaAtiva === 'hotel' ? 'bg-indigo-600 text-white' : 'hover:bg-gray-200'}`}>🏨 Hotéis</button>
      </div>

      {abaAtiva === 'voo' && (
         <div className="space-y-4">
          <h2 className="text-xl font-bold">Consulta de Voos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <select value={voo.origem} onChange={e => setVoo({ ...voo, origem: e.target.value })} className="p-2 border rounded"><option value="">Origem</option>{cidades.map(c => <option key={c}>{c}</option>)}</select>
            <select value={voo.destino} onChange={e => setVoo({ ...voo, destino: e.target.value })} className="p-2 border rounded"><option value="">Destino</option>{cidades.map(c => <option key={c}>{c}</option>)}</select>
            <input type="date" value={voo.data} onChange={e => setVoo({ ...voo, data: e.target.value })} className="p-2 border rounded" />
          </div>
          <button onClick={() => setVoo({ ...voo, preco: gerarPreco() })} className="bg-indigo-600 text-white px-4 py-2 rounded">Buscar</button>
          {voo.preco && <div className="bg-gray-100 p-4 rounded text-black space-y-2"> <p>📍 {voo.origem} → {voo.destino}</p> <p>📅 Data: {voo.data}</p> <p>💵 Preço estimado: R$ {voo.preco}</p> <button disabled={loading} onClick={handleVooAction} className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50">{loading ? 'Enviando...' : 'Reservar via WhatsApp'}</button> </div>}
        </div>
      )}

      {abaAtiva === 'restaurante' && (
         <div className="space-y-4">
          <h2 className="text-xl font-bold">Restaurantes Próximos</h2>
          {loadingGeo && <p>⏳ Obtendo localização...</p>}
          {!loadingGeo && posicao && <div className="space-y-3">{restaurantesMock.map((r, i) => ( <div key={i} className="border rounded p-4 bg-white shadow"> <h3 className="font-semibold">{r.nome}</h3> <p>📍 {r.distanciaKm} km | ⭐ {r.avaliacao}</p> <div className="flex gap-2 mt-2 flex-wrap"> <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(r.nome)}`} target="_blank"  rel="noopener noreferrer" className="bg-blue-600 text-white px-3 py-1 rounded">Ver no Mapa</a> <button disabled={loading} onClick={() => handleRestauranteAction({ nome: r.nome })} className="bg-green-600 text-white px-3 py-1 rounded disabled:opacity-50">{loading ? 'Enviando...' : 'Reservar via WhatsApp'}</button> </div> </div> ))}</div>}
          {!loadingGeo && !posicao && <p className="text-red-600">⚠️ Não foi possível obter localização.</p>}
        </div>
      )}

      {abaAtiva === 'hotel' && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Busca de Hotéis</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <select value={hotel.cidade} onChange={e => setHotel({ ...hotel, cidade: e.target.value })} className="p-2 border rounded"><option value="">Cidade</option>{cidades.map(c => <option key={c}>{c}</option>)}</select>
            <input type="date" value={hotel.entrada} onChange={e => setHotel({ ...hotel, entrada: e.target.value })} className="p-2 border rounded" placeholder="Entrada"/>
            <input type="date" value={hotel.saida} onChange={e => setHotel({ ...hotel, saida: e.target.value })} className="p-2 border rounded" placeholder="Saída"/>
          </div>
          <button onClick={() => setHotel({ ...hotel, preco: gerarPreco() })} className="bg-indigo-600 text-white px-4 py-2 rounded">Buscar Hotéis</button>
          {hotel.preco && <div className="bg-gray-100 p-4 rounded text-black space-y-2"> <p>📍 Cidade: {hotel.cidade}</p> <p>📅 Entrada: {hotel.entrada} | Saída: {hotel.saida}</p> <p>💵 Diária estimada: R$ {hotel.preco}</p> <button disabled={loading} onClick={handleHotelAction} className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50">{loading ? 'Enviando...' : 'Reservar via WhatsApp'}</button> </div>}
        </div>
      )}
    </div>
  );
}