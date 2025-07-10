"use client";
import { useState } from "react";
import { ChartBar, Users, ShoppingCart, BookOpen, Lightning } from "phosphor-react";

export default function DashboardPage() {
  // Painel de teste de pagamentos
  const [email, setEmail] = useState("");
  const [produto, setProduto] = useState("Ebook Dicas de IA");
  const [preco, setPreco] = useState(49.9);
  const [loading, setLoading] = useState(false);

  async function testarPagamento(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: produto, price: preco, email }),
    });
    const data = await res.json();
    if (data?.init_point) {
      window.open(data.init_point, "_blank");
    } else {
      alert("Erro ao redirecionar para o Mercado Pago");
    }
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6 transition-colors">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-300 mb-6 flex items-center gap-2">
          <ChartBar size={32} className="text-purple-600" /> Bem-vindo ao Painel Genius Social IA
        </h1>
        {/* Painel de teste de pagamentos */}
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-blue-700 dark:text-blue-300">Testar Pagamento Mercado Pago</h2>
          <form onSubmit={testarPagamento} className="flex flex-col md:flex-row gap-4 items-center">
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Seu e-mail para teste"
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={produto}
              onChange={e => setProduto(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
            >
              <option value="Ebook Dicas de IA">Ebook Dicas de IA</option>
              <option value="Plano ENEM 2025">Plano ENEM 2025</option>
              <option value="Assinatura Genius Social IA">Assinatura Genius Social IA</option>
            </select>
            <input
              type="number"
              min={1}
              step={0.01}
              value={preco}
              onChange={e => setPreco(Number(e.target.value))}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white w-28"
            />
            <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition disabled:opacity-60">
              {loading ? "Carregando..." : "Testar Pagamento"}
            </button>
          </form>
        </section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col items-center">
            <ShoppingCart size={32} className="text-green-600 mb-2" />
            <span className="text-4xl font-bold text-green-600 mb-2">R$ 1.250,00</span>
            <span className="text-gray-700 dark:text-gray-300">Vendas no mês</span>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col items-center">
            <Users size={32} className="text-blue-600 mb-2" />
            <span className="text-4xl font-bold text-blue-600 mb-2">+320</span>
            <span className="text-gray-700 dark:text-gray-300">Novos usuários</span>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col items-center">
            <BookOpen size={32} className="text-purple-600 mb-2" />
            <span className="text-4xl font-bold text-purple-600 mb-2">12</span>
            <span className="text-gray-700 dark:text-gray-300">Produtos ativos</span>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-700 dark:text-blue-300 flex items-center gap-2">
            <ChartBar size={24} className="text-purple-600" /> Atividades Recentes
          </h2>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li className="flex items-center gap-2"><ShoppingCart size={18} className="text-green-600" /> Nova venda: Ebook Dicas de IA - <span className="text-green-600">R$ 49,90</span></li>
            <li className="flex items-center gap-2"><Users size={18} className="text-blue-600" /> Novo usuário: maria@email.com</li>
            <li className="flex items-center gap-2"><BookOpen size={18} className="text-purple-600" /> Produto cadastrado: Plano ENEM 2025</li>
            <li className="flex items-center gap-2"><ShoppingCart size={18} className="text-green-600" /> Venda: Assinatura Genius Social - <span className="text-green-600">R$ 19,90</span></li>
          </ul>
        </div>
      </div>
    </main>
  );
} 