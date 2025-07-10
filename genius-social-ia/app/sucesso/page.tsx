import { CheckCircle } from "phosphor-react";

export default function SucessoPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-green-50 dark:bg-green-900 p-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-md w-full flex flex-col items-center gap-6">
        <CheckCircle size={64} className="text-green-600 mb-2 animate-bounce" />
        <h1 className="text-3xl font-bold text-green-700 dark:text-green-300 mb-2 text-center">Pagamento realizado com sucesso!</h1>
        <p className="text-gray-700 dark:text-gray-300 text-center mb-4 text-lg">Seu pagamento foi aprovado. Em breve você receberá o acesso ao seu produto digital no e-mail cadastrado.<br/>Obrigado por confiar no <span className='font-bold text-blue-600'>Genius Social IA</span>!</p>
        <a href="/dashboard" className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition text-lg">Ir para o Dashboard</a>
      </div>
    </main>
  );
} 