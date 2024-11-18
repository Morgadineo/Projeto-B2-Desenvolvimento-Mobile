/**
 * ARQUIVO DA TELA DE "ESQUECI A SENHA"
 * ------------------------------------
 * Feito por: Arthur Morgado Teixeira
 * E-mail: arthurmorgado7751@gmail.com
 * Telefone: 27 99653-0202
 */

/**
 * IMPORTAÇÃO DOS MÓDULOS
 */
import { useState } from 'react';
import { Text, StyleSheet, View, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { supabase } from '../Supabase/supabase';

/**
 * FUNÇÃO ForgotPassScreen({navigation})
 * -------------------------------------
 * Função para criar a tela de recuperação de senha e gerenciar o processo de reset.
 */
export default function ForgotPassScreen({ navigation }) {
  /**
   * VARIÁVEIS
   */
  const [email, setEmail] = useState("");

  /**
   * FUNÇÃO PARA LIDAR COM A RECUPERAÇÃO DE SENHA
   * --------------------------------------------
   * Função para lidar com o processo de recuperação de senha
   *  1- Chama a função de reset de senha do Supabase.
   *  2- Verifica se houve algum erro, caso tenha, exibe um alerta com a mensagem de erro.
   *  3- Caso não haja erro, exibe um alerta de sucesso informando que o link foi enviado.
   */
  const handleResetPassword = async () => {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) {
      Alert.alert("Erro", error.message);
    } else {
      Alert.alert("Sucesso", "Um link de recuperação foi enviado para seu e-mail.");
    }
  };

  /**
   * JANELA DE RECUPERAÇÃO DE SENHA
   */
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
          style={styles.image}
          source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKIcFzg_2_RH767PjwmficlQj9v-qTTTsQOg&s' }}
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        keyboardType="email-address"
        onChangeText={setEmail}
      />

      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Recuperar senha</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.linkText}>Lembrei a senha!</Text>
      </TouchableOpacity>
    </View>
  );
}

/**
 * "CSS" DA TELA DE RECUPERAÇÃO DE SENHA
 */
const styles = StyleSheet.create({
  container: {
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
  input: {
    width: '90%',
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
    backgroundColor: '#fff',
  },
  button: {
    width: '90%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#FF9800',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
  linkText: {
    fontSize: 16,
    color: 'rgb(231, 59, 138)',
    marginTop: 10,
  },
});