import { useState } from "react";
import { ShoppingCart, Pencil, Trash, PlusCircle, Lock } from "phosphor-react";

const SENHA_ADMIN = "pank2030";

const produtosIniciais = [
  { nome: "Ebook Dicas de IA", descricao: "Aprenda a usar IA no dia a dia.", preco: 49.9 },
  { nome: "Plano ENEM 2025", descricao: "Dicas para o ENEM.", preco: 29.9 },
  { nome: "Assinatura Genius Social IA", descricao: "Acesso premium ao app.", preco: 19.9 },
];

export default function AdminPage() {
  const [autenticado, setAutenticado] = useState(false);
  const [senha, setSenha] = useState("");
  const [produtos, setProdutos] = useState(produtosIniciais);
  const [novo, setNovo] = useState({ nome: "", descricao: "", preco: 0 });
  const [editando, setEditando] = useState<number | null>(null);
  const [msg, setMsg] = useState("");

  function autenticar(e: React.FormEvent) {
    e.preventDefault();
    if (senha === SENHA_ADMIN) {
      setAutenticado(true);
      setMsg("");
    } else {
      setMsg("Senha incorreta!");
    }
  }

  function adicionarProduto(e: React.FormEvent) {
    e.preventDefault();
    setProdutos([novo, ...produtos]);
    setNovo({ nome: "", descricao: "", preco: 0 });
  }

  function excluirProduto(idx: number) {
    setProdutos(produtos.filter((_, i) => i !== idx));
  }

  function salvarEdicao(idx: number) {
    setEditando(null);
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-2xl w-full flex flex-col items-center gap-6">
        <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-300 mb-2 flex items-center gap-2"><Lock size={32}/> Painel Admin</h1>
        {!autenticado ? (
          <form onSubmit={autenticar} className="flex flex-col gap-4 w-full max-w-xs">
            <input
              type="password"
              placeholder="Senha do administrador"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
              required
            />
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow transition">Entrar</button>
            {msg && <div className="text-red-600 text-center">{msg}</div>}
          </form>
        ) : (
          <>
            <form onSubmit={adicionarProduto} className="flex flex-col md:flex-row gap-2 w-full mb-4 items-center">
              <input
                type="text"
                placeholder="Nome do produto"
                value={novo.nome}
                onChange={e => setNovo({ ...novo, nome: e.target.value })}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
                required
              />
              <input
                type="text"
                placeholder="Descrição"
                value={novo.descricao}
                onChange={e => setNovo({ ...novo, descricao: e.target.value })}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
                required
              />
              <input
                type="number"
                min={1}
                step={0.01}
                placeholder="Preço"
                value={novo.preco}
                onChange={e => setNovo({ ...novo, preco: Number(e.target.value) })}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white w-24"
                required
              />
              <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg shadow transition flex items-center gap-2"><PlusCircle size={20}/>Adicionar</button>
            </form>
            <div className="w-full">
              <h2 className="text-xl font-bold mb-2 text-blue-700 dark:text-blue-300">Produtos Digitais</h2>
              <ul className="space-y-2">
                {produtos.map((p, idx) => (
                  <li key={idx} className="flex flex-col md:flex-row items-center gap-2 bg-gray-50 dark:bg-gray-900 rounded-lg p-3 shadow">
                    <span className="flex-1 font-semibold text-blue-700 dark:text-blue-300 flex items-center gap-2"><ShoppingCart size={20}/>{p.nome}</span>
                    <span className="flex-1 text-gray-700 dark:text-gray-300">{p.descricao}</span>
                    <span className="text-green-600 font-bold">R$ {p.preco.toFixed(2)}</span>
                    <button onClick={() => setEditando(idx)} title="Editar produto" className="p-2 rounded hover:bg-blue-100 dark:hover:bg-blue-700 transition-colors"><Pencil size={18}/></button>
                    <button onClick={() => excluirProduto(idx)} title="Excluir produto" className="p-2 rounded hover:bg-red-100 dark:hover:bg-red-700 transition-colors"><Trash size={18}/></button>
                    {editando === idx && (
                      <button onClick={() => salvarEdicao(idx)} title="Salvar edição" className="p-2 rounded bg-green-600 text-white ml-2 transition-colors">Salvar</button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </main>
  );
} 