import { Lifebuoy } from "phosphor-react";
import { useState } from "react";

export default function SuportePage() {
  const [mensagem, setMensagem] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setEnviando(true);
    setTimeout(() => {
      setEnviando(false);
      setSucesso(true);
      setMensagem("");
    }, 1500);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-8 transition-colors">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-300 mb-8 flex items-center gap-2"><Lifebuoy size={32}/> Suporte</h1>
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col gap-4">
          <textarea
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Descreva sua dúvida ou problema..."
            value={mensagem}
            onChange={e => setMensagem(e.target.value)}
            required
            rows={5}
          />
          <button type="submit" disabled={enviando || !mensagem.trim()} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow transition disabled:opacity-60">
            {enviando ? "Enviando..." : "Enviar Mensagem"}
          </button>
          {sucesso && <div className="text-green-600 text-center mt-2 animate-pulse">Mensagem enviada com sucesso! Em breve entraremos em contato.</div>}
        </form>
      </div>
    </main>
  );
} 