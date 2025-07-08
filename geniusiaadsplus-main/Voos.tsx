import { useState } from "react";
import { supabase } from "./supabaseClient";

export default function Voos() {
  const [form, setForm] = useState({ origem: "", destino: "", data: "", preco: "" });
  const [respostaIA, setRespostaIA] = useState("");

  const handleChange = (e: any) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { error } = await supabase.from("voos_interesse").insert([form]);
    if (!error) {
      const prompt = `A pessoa quer viajar de ${form.origem} para ${form.destino} na data ${form.data}. Sugira um voo alternativo mais barato ou alguma dica para economizar.`;
      const resposta = await gerarRespostaIA(prompt);
      setRespostaIA(resposta);
    }
  };

  async function gerarRespostaIA(prompt: string): Promise<string> {
    const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyA9TQ1ZQEmJlhW7ggQczAhbglNvPdF6Su", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });
    const data = await res.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || "⚠️ IA sem resposta.";
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <h2 className="text-lg font-bold">Voos</h2>
      <input name="origem" onChange={handleChange} placeholder="Origem" className="input" />
      <input name="destino" onChange={handleChange} placeholder="Destino" className="input" />
      <input name="data" type="date" onChange={handleChange} className="input" />
      <input name="preco" type="number" onChange={handleChange} placeholder="Preço estimado" className="input" />
      <button className="btn">Enviar</button>
      {respostaIA && <div className="mt-3 p-3 bg-gray-100 rounded">{respostaIA}</div>}
    </form>
  );
}