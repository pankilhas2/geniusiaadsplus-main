"use client";
import { useState } from "react";

export default function RegisterPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setSucesso(false);
    if (senha !== confirmar) {
      setErro("As senhas não coincidem.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSucesso(true);
      setTimeout(() => {
        window.location.href = "/login";
      }, 1200);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
      <form
        onSubmit={handleRegister}
        className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 w-full max-w-md space-y-6"
      >
        <h1 className="text-2xl font-bold text-center text-blue-700 dark:text-blue-300 mb-4">Criar Conta</h1>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">Nome</label>
          <input
            type="text"
            required
            value={nome}
            onChange={e => setNome(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Seu nome completo"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="seu@email.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">Senha</label>
          <input
            type="password"
            required
            value={senha}
            onChange={e => setSenha(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Crie uma senha"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">Confirmar Senha</label>
          <input
            type="password"
            required
            value={confirmar}
            onChange={e => setConfirmar(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Repita a senha"
          />
        </div>
        {erro && <div className="text-red-500 text-sm text-center">{erro}</div>}
        {sucesso && <div className="text-green-600 text-sm text-center">Cadastro realizado! Redirecionando...</div>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg shadow transition disabled:opacity-60"
        >
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
          <a href="/login" className="hover:underline">Já tenho conta</a>
        </div>
      </form>
    </div>
  );
} 