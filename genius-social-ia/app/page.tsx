import { useState } from "react";
import { ChartBar, Users, ShoppingCart, BookOpen, Lightning, CheckCircle, User, UserPlus, Question, Lifebuoy, Globe, ShieldCheck, Star, Sparkle, Copy, SpeakerHigh } from "phosphor-react";

const GEMINI_API_KEY = "AIzaSyCCivpqHJ-TLG_4lIKyWMFQHZNBr7O7GuY";

const beneficios = [
  { icon: <Lightning size={32} className="text-yellow-400" />, title: "Automação Inteligente", desc: "Automatize tarefas repetitivas e ganhe tempo para o que importa." },
  { icon: <ChartBar size={32} className="text-purple-500" />, title: "Análises em Tempo Real", desc: "Acompanhe resultados e tome decisões baseadas em dados." },
  { icon: <CheckCircle size={32} className="text-green-500" />, title: "Facilidade de Uso", desc: "Interface intuitiva, sem complicação para você e sua equipe." },
];

const tarefas = [
  { title: "Gestão de Vendas", status: "Concluído", icon: <ShoppingCart size={20} className="text-green-600" /> },
  { title: "Relatórios Automáticos", status: "Em andamento", icon: <ChartBar size={20} className="text-purple-600" /> },
  { title: "Cadastro de Produtos", status: "Pendente", icon: <BookOpen size={20} className="text-blue-600" /> },
];

const planos = [
  { nome: "Starter", preco: "R$ 29/mês", desc: "Para quem está começando.", features: ["Automação básica", "Suporte por e-mail", "Até 3 integrações"] },
  { nome: "Profissional", preco: "R$ 59/mês", desc: "Para negócios em crescimento.", features: ["Automação avançada", "Suporte prioritário", "Até 10 integrações"], destaque: true },
  { nome: "Enterprise", preco: "Sob consulta", desc: "Para grandes empresas.", features: ["Automação customizada", "Consultoria dedicada", "Integrações ilimitadas"] },
];

const depoimentos = [
  { nome: "Ana Souza", cargo: "CEO na TechFlow", texto: "A automação de IA transformou nosso negócio!", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
  { nome: "Carlos Lima", cargo: "Gerente na NexaCorp", texto: "Economizamos tempo e aumentamos a produtividade.", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
  { nome: "Marina Dias", cargo: "Head de Vendas na GrowthPeak", texto: "Nossas vendas dobraram com as soluções inteligentes!", avatar: "https://randomuser.me/api/portraits/women/68.jpg" },
];

const faqs = [
  { q: "Como a automação de IA pode ajudar meu negócio?", a: "Reduz tarefas manuais, aumenta a eficiência e permite decisões mais inteligentes." },
  { q: "Preciso saber programar para usar?", a: "Não! Nossa plataforma é feita para qualquer pessoa usar, sem código." },
  { q: "Quais integrações estão disponíveis?", a: "Oferecemos integrações com Mercado Pago, Stripe, Google, e muito mais." },
];

export default function Home() {
  const ano = new Date().getFullYear();
  const [pergunta, setPergunta] = useState("");
  const [resposta, setResposta] = useState("");
  const [loading, setLoading] = useState(false);
  const [aba, setAba] = useState<'ia' | 'whatsapp'>("ia");
  const [whats, setWhats] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [copiado, setCopiado] = useState(false);

  async function perguntarIA(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setResposta("");
    setLoading(true);
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            { parts: [ { text: pergunta } ] }
          ]
        })
      });
      const data = await res.json();
      setResposta(data?.candidates?.[0]?.content?.parts?.[0]?.text || "Não foi possível obter resposta agora.");
    } catch {
      setResposta("Erro ao consultar a IA. Tente novamente.");
    }
    setLoading(false);
  }

  function copiarResposta() {
    if (resposta) {
      navigator.clipboard.writeText(resposta);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 1500);
    }
  }

  function falarResposta() {
    if (resposta) {
      const utter = new window.SpeechSynthesisUtterance(resposta);
      utter.lang = "pt-BR";
      window.speechSynthesis.speak(utter);
    }
  }

  function enviarWhats(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!whats || !resposta) return;
    const texto = encodeURIComponent(resposta);
    const numero = whats.replace(/\D/g, "");
    window.open(`https://wa.me/${numero}?text=${texto}`, "_blank");
    setEnviado(true);
    setTimeout(() => setEnviado(false), 2000);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
      {/* HERO SECTION */}
      <section className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80" alt="Banner" className="rounded-2xl w-32 h-32 object-cover mb-6 shadow-lg" />
        <h1 className="text-4xl sm:text-5xl font-bold text-blue-700 dark:text-blue-300 mb-4">Automação Inteligente para Seu Negócio</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">Transforme tarefas repetitivas em processos automáticos, aumente sua produtividade e foque no que realmente importa.</p>
        {/* CAMPO PERGUNTE A IA */}
        <form onSubmit={perguntarIA} className="w-full max-w-xl mx-auto flex flex-col sm:flex-row gap-2 mb-6">
          <input
            type="text"
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow"
            placeholder="Pergunte à nossa IA sua dúvida!"
            value={pergunta}
            onChange={e => setPergunta(e.target.value)}
            required
          />
          <button type="submit" disabled={loading || !pergunta.trim()} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition flex items-center gap-2 disabled:opacity-60">
            <Sparkle size={20}/> {loading ? "Consultando..." : "Perguntar"}
          </button>
        </form>
        {resposta && (
          <div className="w-full max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-4 text-left text-gray-800 dark:text-gray-100 mb-4 border border-blue-100 dark:border-blue-700">
            <span className="font-semibold text-blue-700 dark:text-blue-300">Resposta da IA:</span>
            <p className="mt-2 whitespace-pre-line">{resposta}</p>
            <div className="flex items-center gap-2 mt-2">
              <button onClick={copiarResposta} title="Copiar resposta" className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
                {copiado ? <CheckCircle size={20} className="text-green-500" /> : <Copy size={20} />}
              </button>
              <button onClick={falarResposta} title="Ouvir resposta" className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
                <SpeakerHigh size={20} />
              </button>
            </div>
          </div>
        )}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-2">
          <a href="/register" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg shadow transition flex items-center gap-2"><UserPlus size={20}/>Comece Agora</a>
          <a href="/produtos" className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-8 py-3 rounded-lg shadow transition flex items-center gap-2"><ShoppingCart size={20}/>Ver Produtos</a>
        </div>
      </section>
      {/* BENEFÍCIOS */}
      <section className="py-12 px-4 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-blue-700 dark:text-blue-300 mb-8">Por que escolher o Genius Social IA?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {beneficios.map((b, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col items-center text-center gap-3">
              {b.icon}
              <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300">{b.title}</h3>
              <p className="text-gray-700 dark:text-gray-300">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>
      {/* TAREFAS/WORKFLOWS */}
      <section className="py-12 px-4 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-blue-700 dark:text-blue-300 mb-8">Exemplos de Tarefas Automatizadas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tarefas.map((t, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col items-center gap-2">
              {t.icon}
              <h4 className="font-semibold text-lg text-blue-700 dark:text-blue-300">{t.title}</h4>
              <span className="text-xs px-2 py-1 rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200">{t.status}</span>
            </div>
          ))}
        </div>
      </section>
      {/* PLANOS */}
      <section className="py-12 px-4 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-blue-700 dark:text-blue-300 mb-8">Planos para Todos os Perfis</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {planos.map((p, i) => (
            <div key={i} className={`rounded-xl shadow p-6 flex flex-col items-center gap-3 border-2 ${p.destaque ? 'border-blue-600 dark:border-blue-400 scale-105' : 'border-transparent' } bg-white dark:bg-gray-800`}>
              {p.destaque && <span className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full mb-2">Mais Popular</span>}
              <h3 className="text-xl font-bold text-blue-700 dark:text-blue-300">{p.nome}</h3>
              <div className="text-3xl font-bold text-green-600 mb-2">{p.preco}</div>
              <p className="text-gray-700 dark:text-gray-300 mb-2">{p.desc}</p>
              <ul className="text-gray-600 dark:text-gray-300 text-sm mb-4 space-y-1">
                {p.features.map((f, j) => <li key={j} className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" />{f}</li>)}
              </ul>
              <a href="/register" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition">Escolher Plano</a>
            </div>
          ))}
        </div>
      </section>
      {/* DEPOIMENTOS */}
      <section className="py-12 px-4 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-blue-700 dark:text-blue-300 mb-8">O que dizem nossos clientes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {depoimentos.map((d, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col items-center gap-3 text-center">
              <img src={d.avatar} alt={d.nome} className="w-16 h-16 rounded-full object-cover border-4 border-blue-200 dark:border-blue-700 shadow" />
              <div className="flex items-center gap-1 justify-center"><Star size={18} className="text-yellow-400" /><Star size={18} className="text-yellow-400" /><Star size={18} className="text-yellow-400" /><Star size={18} className="text-yellow-400" /><Star size={18} className="text-yellow-400" /></div>
              <p className="text-gray-700 dark:text-gray-300 italic">"{d.texto}"</p>
              <span className="text-blue-700 dark:text-blue-300 font-semibold">{d.nome}</span>
              <span className="text-xs text-gray-500">{d.cargo}</span>
            </div>
          ))}
        </div>
      </section>
      {/* FAQ */}
      <section className="py-12 px-4 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-blue-700 dark:text-blue-300 mb-8">Perguntas Frequentes</h2>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <details key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
              <summary className="font-semibold text-blue-700 dark:text-blue-300 cursor-pointer flex items-center gap-2"><Question size={18} />{f.q}</summary>
              <p className="text-gray-700 dark:text-gray-300 mt-2">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
      {/* FOOTER */}
      <footer className="py-8 px-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-12">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300 font-bold text-lg">
            <Lightning size={24} className="text-yellow-400" /> Genius Social IA
          </div>
          <nav className="flex flex-wrap gap-4 text-sm">
            <a href="/login" className="hover:underline flex items-center gap-1"><User size={16}/>Login</a>
            <a href="/register" className="hover:underline flex items-center gap-1"><UserPlus size={16}/>Cadastro</a>
            <a href="/dashboard" className="hover:underline flex items-center gap-1"><ChartBar size={16}/>Dashboard</a>
            <a href="/produtos" className="hover:underline flex items-center gap-1"><ShoppingCart size={16}/>Produtos</a>
            <a href="/faq" className="hover:underline flex items-center gap-1"><Question size={16}/>FAQ</a>
            <a href="/suporte" className="hover:underline flex items-center gap-1"><Lifebuoy size={16}/>Suporte</a>
            <a href="/politicas" className="hover:underline flex items-center gap-1"><ShieldCheck size={16}/>Política</a>
            <a href="https://geniussocial.com.br" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1"><Globe size={16}/>Site Oficial</a>
          </nav>
          <span className="text-xs text-gray-400 text-center">&copy; {ano} Genius Social IA</span>
        </div>
      </footer>
    </main>
  );
}
