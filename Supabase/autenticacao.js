/**
 * ARQUIVO DA FUNÇÃO PARA REALIZAR O CADASTRO DO AVALIADOR
 * -------------------------------------------------------
 * Feito por: Arthur Morgado Teixeira
 * E-mail: arthurmorgado7751@gmail.com
 * Telefone: 27 99653-0202
 */

/**
 * IMPORTAÇÃO DOS MÓDULOS
 */
import { supabase } from '../Supabase/supabase';

/**
 * FUNÇÃO signUp(nomeCompleto, email, senha)
 * ------------------------------------------
 * Esta função realiza o cadastro de avaliadores e armazena na tabela de "avaliadores" no Supbase, atribuindo um ID a cada um. O 
 * cadastro é realizado utilizando a função signUp fornecida pelo Supabase.
 *  1- Verifica se todas as informações foram preenchidas.
 *  2- Realiza o cadastro no serviço de autenticação do Supabase.
 *  3- Verifica se algum erro ocorreu e caso ocorra, retorna a mensagem de erro.
 *  4- Armazena os dados na tabela de avaliadores.
 *  5- Verifica se houve um erro na hora de adicionar o registro na tabela, caso tenha, retorna a mensagem de erro.
 *  6- Caso nenhum erro tenha ocorrida na autenticação e no registro, retorna os dados.
 *  */
export async function signUp(nomeCompleto, email, senha) {
  // 1- Verifica se todas as informações foram preenchidas.
  if (!nomeCompleto || !email || !senha) {
    return { error: 'Por favor, preencha todos os campos.' };
  }

  // 2- Realiza o cadastro no serviço de autenticação do Supabase
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: email,
    password: senha,
  });

  // 3- Verifica se algum erro ocorreu e caso ocorra, retorna a mensagem de erro.
  if (authError) {
    return { error: authError.message };
  }

  // 4- Armazena os dados na tabela de avaliadores.
  const { data, error } = await supabase
    .from('avaliadores')
    .insert([{nomeCompleto, email, senha}]);

  // 5- Verifica se houve um erro na hora de adicionar o registro na tabela, caso tenha, retorna a mensagem de erro.
  if (error) {
    return { error: error.message };
  }

  //6- Caso nenhum erro tenha ocorrida na autenticação e no registro, retorna os dados.
  return { data };
}