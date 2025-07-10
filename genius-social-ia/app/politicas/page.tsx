import { ShieldCheck } from "phosphor-react";

export default function PoliticasPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-8 transition-colors">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-300 mb-8 flex items-center gap-2"><ShieldCheck size={32}/> Política de Privacidade</h1>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 text-gray-700 dark:text-gray-300 space-y-4">
          <p>Levamos sua privacidade a sério. Seus dados são protegidos e nunca serão compartilhados sem sua autorização.</p>
          <p>Coletamos apenas informações essenciais para o funcionamento do serviço, como email e preferências de uso.</p>
          <p>Você pode solicitar a exclusão dos seus dados a qualquer momento entrando em contato pelo suporte.</p>
          <p>Para mais detalhes, consulte nossos Termos de Uso ou entre em contato com nossa equipe.</p>
        </div>
      </div>
    </main>
  );
} 