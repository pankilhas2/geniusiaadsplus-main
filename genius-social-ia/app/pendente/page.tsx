import { Hourglass } from "phosphor-react";

export default function PendentePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-yellow-50 dark:bg-yellow-900 p-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-md w-full flex flex-col items-center gap-6">
        <Hourglass size={64} className="text-yellow-500 mb-2 animate-pulse" />
        <h1 className="text-3xl font-bold text-yellow-700 dark:text-yellow-300 mb-2 text-center">Pagamento em análise</h1>
        <p className="text-gray-700 dark:text-gray-300 text-center mb-4 text-lg">Seu pagamento está sendo processado. Assim que for confirmado, você receberá o acesso ao produto no e-mail cadastrado.<br/>Fique atento à sua caixa de entrada!</p>
        <a href="/dashboard" className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-2 rounded-lg shadow transition text-lg">Ir para o Dashboard</a>
      </div>
    </main>
  );
} 