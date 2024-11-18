/**
 * ARQUIVO DA FUNÇÃO PARA REALIZAR O LOGIN
 * ----------------------------------------
 * Feito por: Arthur Morgado Teixeira
 * E-mail: arthurmorgado7751@gmail.com
 * Telefone: 27 99653-0202
 */

/**
 * IMPORTAÇÃO DOS MÓDULOS
 */
import { supabase } from '../Supabase/supabase';

/**
 * FUNÇÃO "signIn"
 * --------------------------
 * Tem como argumento o email e a senha.
 *  1- Verifica se o email e a senha foram preenchidas.
 *  2- Utiliza o método de autenticação padrão do supabase
 *  3- Verifica se teve algum erro e retorna a mensagem de erro.
 *  4- Se não teve erro, retorna os dados utilizados.
 */
export async function signIn(email, password) {
  // 1- Verifica se o email e a senha foram preenchidas.
  if (!email || !password) {
    return { error: 'Por favor, preencha todos os campos.' };
  }
  // 2- Utiliza o método de autenticação padrão do supabase
  let { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password
  })
  // 3- Verifica se teve algum erro e retorna a mensagem de erro
  if (error) {
    return { error: error.message };
  }
  // 4- Se não teve erro, retorna os dados utilizados.
  else
  {
    return {data};
  }
}