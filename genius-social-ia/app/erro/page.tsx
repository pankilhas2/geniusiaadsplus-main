import { XCircle } from "phosphor-react";

export default function ErroPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-red-50 dark:bg-red-900 p-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-md w-full flex flex-col items-center gap-6">
        <XCircle size={64} className="text-red-600 mb-2 animate-bounce" />
        <h1 className="text-3xl font-bold text-red-700 dark:text-red-300 mb-2 text-center">Não foi possível concluir o pagamento</h1>
        <p className="text-gray-700 dark:text-gray-300 text-center mb-4 text-lg">Ocorreu um problema ao processar seu pagamento. Por favor, tente novamente ou escolha outro método.<br/>Se o erro persistir, entre em contato com nosso suporte.</p>
        <a href="/produtos" className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition text-lg">Voltar para Produtos</a>
      </div>
    </main>
  );
} 