
import { createClient } from '@supabase/supabase-js';

export interface Database {
  public: {
    Tables: {
      agendamentos: {
        Row: {
          criado_em: string
          email: string | null
          id: number
          nome: string
          vaga: string
          whatsapp: string
          favorito: boolean
        }
        Insert: {
          criado_em?: string
          email?: string | null
          id?: number
          nome: string
          vaga: string
          whatsapp: string
          favorito?: boolean
        }
        Update: {
          criado_em?: string
          email?: string | null
          id?: number
          nome?: string
          vaga?: string
          whatsapp?: string
          favorito?: boolean
        }
        Relationships: []
      }
      hoteis_interesse: {
        Row: {
          cidade: string
          criado_em: string
          data_entrada: string
          data_saida: string
          id: number
          preco: number
          favorito: boolean
        }
        Insert: {
          cidade: string
          criado_em?: string
          data_entrada: string
          data_saida: string
          id?: number
          preco: number
          favorito?: boolean
        }
        Update: {
          cidade?: string
          criado_em?: string
          data_entrada?: string
          data_saida?: string
          id?: number
          preco?: number
          favorito?: boolean
        }
        Relationships: []
      }
      restaurantes_interesse: {
        Row: {
          criado_em: string
          id: number
          latitude: number
          longitude: number
          nome_restaurante: string
          favorito: boolean
        }
        Insert: {
          criado_em?: string
          id?: number
          latitude: number
          longitude: number
          nome_restaurante: string
          favorito?: boolean
        }
        Update: {
          criado_em?: string
          id?: number
          latitude?: number
          longitude?: number
          nome_restaurante?: string
          favorito?: boolean
        }
        Relationships: []
      }
      voos_interesse: {
        Row: {
          criado_em: string
          data_voo: string
          destino: string
          id: number
          origem: string
          preco: number
          favorito: boolean
        }
        Insert: {
          criado_em?: string
          data_voo: string
          destino: string
          id?: number
          origem: string
          preco: number
          favorito?: boolean
        }
        Update: {
          criado_em?: string
          data_voo?: string
          destino?: string
          id?: number
          origem?: string
          preco?: number
          favorito?: boolean
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}


const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase URL or Anon Key is not set. Database functionality will be disabled.');
}

export const supabase = createClient<Database>(supabaseUrl!, supabaseAnonKey!);