import { Question } from "phosphor-react";

const faqs = [
  { q: "Como funciona a automação de IA?", a: "A IA automatiza tarefas repetitivas, analisa dados e sugere ações inteligentes para seu negócio." },
  { q: "Preciso saber programar?", a: "Não! Nossa plataforma é feita para qualquer pessoa usar, sem código." },
  { q: "Quais integrações estão disponíveis?", a: "Mercado Pago, Stripe, Google, WhatsApp e muito mais." },
  { q: "Como posso testar?", a: "Basta criar uma conta gratuita e começar a explorar!" },
];

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-8 transition-colors">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-300 mb-8 flex items-center gap-2"><Question size={32}/> Perguntas Frequentes</h1>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <details key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 group transition-all">
              <summary className="font-semibold text-blue-700 dark:text-blue-300 cursor-pointer flex items-center gap-2 group-open:text-green-600 transition-colors duration-200"><Question size={18} />{f.q}</summary>
              <p className="text-gray-700 dark:text-gray-300 mt-2 transition-all duration-200 group-open:pl-4">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </main>
  );
} 