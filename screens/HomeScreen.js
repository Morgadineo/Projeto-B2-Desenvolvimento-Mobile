/**
 * ARQUIVO DA TELA DE HOME (PRINCIPAL)
 * ---------------------------
 * Feito por: Arthur Morgado Teixeira
 * E-mail: arthurmorgado7751@gmail.com
 * Telefone: 27 99653-0202
 */

/**
 * IMPORTAÇÃO DOS MÓDULO
 * */
import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity, Alert } from 'react-native'; // Importação dos módulos
import { supabase } from '../Supabase/supabase'; // Ajuste o caminho conforme necessário


/**
 * FUNÇÃO PARA CRIAR A TELA DE HOME
 * --------------------------------
 */
export default function HomeScreen({ navigation }) {
  /**
   * VARIÁVEIS
   */
  const [grupos, setGrupos] = useState([]);

  /**
   * FUNÇÃO fetchGrupos
   * ------------------
   * Função anônima para pegar os grupos na tabela "grupos" no Supabase.
   *  1- Realiza um "comando SQL" para pegar todos os grupos da tabela.
   *  2- Verifica se houve algum erro no comando.
   *  3- Caso não haja, seta a a lista de grupos com o retorno. 
   */
  const fetchGrupos = async () => {
    // 1- Realiza um "comando SQL" para pegar todos os grupos da tabela.
    const { data, error } = await supabase.from('grupos').select('*');
    // 2- Verifica se houve algum erro no comando.
    if (error) {
      alert('Erro -> Não foi possível carregar os grupos.');
      console.error(error);
    } 
    // 3- Caso não haja, atribui para a variável com a lista de grupos com o retorno. 
    else {
      setGrupos(data);
    }
  };

  useEffect(() => {
    fetchGrupos();
  }, []);


  /**
   * TELA DE HOME
   * ------------
   *  1- Botão "Listar Grupos": leva para a tela de grupos cadastrados.
   *  2- Botão "Dar nota": Abre a tela para dar nota a algum grupo.
   */
  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <Image 
          style={styles.image}
          source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKIcFzg_2_RH767PjwmficlQj9v-qTTTsQOg&s' }}
        />
      </View>

      <View style={styles.options}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Groups', { grupos })}>
          <Text style={styles.text}>Listar Grupos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/**
 * "CSS" DA TELA DE HOME
 */
const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgb(44, 44, 104)',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 160,
    alignItems: 'center',
    backgroundColor: 'gray',
  },

  image: {
    width: "100%",
    height: "100%",
  },

  options: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },

  button: {
    width: '85%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gray',
    marginVertical: 10,
  },

  text: {
    fontSize: 20,
    color: 'black',
  },
});