"use client";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErro("");
    setTimeout(() => {
      // Aceita qualquer email/senha
      window.location.href = "/dashboard";
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
      <form
        onSubmit={handleLogin}
        className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 w-full max-w-md space-y-6"
      >
        <h1 className="text-2xl font-bold text-center text-blue-700 dark:text-blue-300 mb-4">Entrar no Genius Social IA</h1>
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
            placeholder="Digite sua senha"
          />
        </div>
        {erro && <div className="text-red-500 text-sm text-center">{erro}</div>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow transition disabled:opacity-60"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
          <a href="#" className="hover:underline">Esqueci minha senha</a>
          <a href="/register" className="hover:underline">Criar conta</a>
        </div>
      </form>
    </div>
  );
} 