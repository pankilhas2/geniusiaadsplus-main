"use client";
import { useState } from "react";
import { ShoppingCart, PlusCircle } from "phosphor-react";

interface Produto {
  nome: string;
  descricao: string;
  preco: number;
  imagem: string;
  link: string;
}

const produtosMock: Produto[] = [
  {
    nome: "Ebook Dicas de IA",
    descricao: "Aprenda a usar Inteligência Artificial no seu dia a dia!",
    preco: 49.9,
    imagem: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
    link: "#",
  },
  {
    nome: "Plano ENEM 2025",
    descricao: "Dicas e estratégias para arrasar no ENEM!",
    preco: 29.9,
    imagem: "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80",
    link: "#",
  },
  {
    nome: "Assinatura Genius Social IA",
    descricao: "Acesso premium ao app Poliglota IA.",
    preco: 19.9,
    imagem: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
    link: "#",
  },
];

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState<Produto[]>(produtosMock);
  const [form, setForm] = useState<Produto>({ nome: "", descricao: "", preco: 0, imagem: "", link: "" });
  const [adicionando, setAdicionando] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleAddProduto(e: React.FormEvent) {
    e.preventDefault();
    setProdutos([{ ...form, preco: Number(form.preco) }, ...produtos]);
    setForm({ nome: "", descricao: "", preco: 0, imagem: "", link: "" });
    setAdicionando(false);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6 transition-colors">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-300 mb-6 flex items-center gap-2">
          <ShoppingCart size={32} className="text-green-600" /> Produtos Digitais à Venda
        </h1>
        <button
          onClick={() => setAdicionando(!adicionando)}
          className="mb-6 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition flex items-center gap-2"
        >
          <PlusCircle size={22} /> {adicionando ? "Cancelar" : "+ Adicionar Produto"}
        </button>
        {adicionando && (
          <form onSubmit={handleAddProduto} className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">Nome do Produto</label>
              <input
                name="nome"
                required
                value={form.nome}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: Ebook Dicas de IA"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">Preço (R$)</label>
              <input
                name="preco"
                type="number"
                min="0"
                step="0.01"
                required
                value={form.preco}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="49.90"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">Descrição</label>
              <textarea
                name="descricao"
                required
                value={form.descricao}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Descreva o produto"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">URL da Imagem</label>
              <input
                name="imagem"
                required
                value={form.imagem}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">Link do Produto</label>
              <input
                name="link"
                required
                value={form.link}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://..."
              />
            </div>
            <div className="md:col-span-2 flex justify-end">
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition flex items-center gap-2">
                <PlusCircle size={20} /> Salvar Produto
              </button>
            </div>
          </form>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {produtos.map((produto, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 flex flex-col">
              <img src={produto.imagem} alt={produto.nome} className="rounded-lg h-40 object-cover mb-4" />
              <h2 className="text-lg font-bold text-blue-700 dark:text-blue-300 mb-2 flex items-center gap-2">
                <ShoppingCart size={20} className="text-green-600" /> {produto.nome}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 flex-1 mb-2">{produto.descricao}</p>
              <div className="text-green-600 font-bold text-xl mb-2">R$ {produto.preco.toFixed(2)}</div>
              <a href={produto.link} target="_blank" rel="noopener noreferrer" className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg text-center transition flex items-center justify-center gap-2">
                <ShoppingCart size={18} /> Comprar
              </a>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
} 