import { useState } from "react";
import { supabase } from "./supabaseClient";

export default function Restaurantes() {
  const [form, setForm] = useState({ cidade: "", tipo: "" });
  const [respostaIA, setRespostaIA] = useState("");

  const handleChange = (e: any) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { error } = await supabase.from("restaurantes_interesse").insert([form]);
    if (!error) {
      const prompt = `Quais são os restaurantes mais famosos e recomendados em ${form.cidade}, focados em comida ${form.tipo}?`;
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
      <h2 className="text-lg font-bold">Restaurantes</h2>
      <input name="cidade" onChange={handleChange} placeholder="Cidade" className="input" />
      <input name="tipo" onChange={handleChange} placeholder="Tipo de comida" className="input" />
      <button className="btn">Enviar</button>
      {respostaIA && <div className="mt-3 p-3 bg-gray-100 rounded">{respostaIA}</div>}
    </form>
  );
}