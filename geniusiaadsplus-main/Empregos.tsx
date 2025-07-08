import { useState } from "react";
import { supabase } from "./supabaseClient";

export default function Empregos() {
  const [form, setForm] = useState({ nome: "", email: "", whatsapp: "", vaga: "" });
  const [respostaIA, setRespostaIA] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from("agendamentos").insert([form]);
    if (!error) {
      const prompt = `A vaga desejada é: ${form.vaga}. Envie uma dica valiosa de entrevista para essa função.`;
      const resposta = await gerarRespostaIA(prompt);
      setRespostaIA(resposta);
    } else {
      setRespostaIA("Erro ao salvar no banco.");
    }
    setLoading(false);
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
      <h2 className="text-lg font-bold">Vagas de Emprego</h2>
      <input name="nome" onChange={handleChange} placeholder="Nome" className="input" />
      <input name="email" onChange={handleChange} placeholder="Email" className="input" />
      <input name="whatsapp" onChange={handleChange} placeholder="WhatsApp" className="input" />
      <input name="vaga" onChange={handleChange} placeholder="Vaga desejada" className="input" />
      <button type="submit" disabled={loading} className="btn">
        {loading ? "Enviando..." : "Enviar"}
      </button>
      {respostaIA && <div className="mt-3 p-3 bg-gray-100 rounded">{respostaIA}</div>}
    </form>
  );
}