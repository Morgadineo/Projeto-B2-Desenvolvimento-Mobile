/**
 * ARQUIVO PARA REALIZAR A CONEXÃO COM O SUPABASE
 * -----------------------------------------------
 * Feito por: Arthur Morgado Teixeira
 * E-mail: arthurmorgado7751@gmail.com
 * Telefone: 27 99653-0202
 *------------------------------------------------ */

/**
 * IMPORTAÇÃO DOS MÓDULOS
 * -----------------------------------------------
 */
import { createClient } from '@supabase/supabase-js';

// ATENÇÃO -> MANTENHA ESSAS INFORMAÇÕES PRIVADAS
const SUPABASE_URL = ''; // URL da sua aplicação do Supabase
const SUPABASE_KEY = ''; // Chave Anon da sua aplicação do Supabase


// Exporta o componente para realizar as chamadas de API.
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
