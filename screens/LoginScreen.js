/**
 * ARQUIVO DA TELA DE LOGIN
 * ---------------------------
 * Feito por: Arthur Morgado Teixeira
 * E-mail: arthurmorgado7751@gmail.com
 * Telefone: 27 99653-0202
 */

/**
 * IMPORTAÇÃO DOS MÓDULOS
 */
import { useState } from 'react';
import { Text, StyleSheet, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { signIn } from '../Supabase/signin';

/**
 * FUNÇÃO LoginScreen({navigation})
 * --------------------------------
 * Função para criar a tela de login e gerenciar o login dos avaliadores.
 */
export default function LoginScreen({ navigation }) {
  /**
   * VARIÁVEIS
   */
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  /**
   * FUNÇÃO PARA LIDAR COM O LOGIN
   * -----------------------------
   * Função para lidar com o login dos avaliadores
   *  1- Chama a função de login.
   *  2- Verifica se houve algum erro, caso tenha, retorna um alerta com a mensagem de erro
   *  3- Caso não haja erro, emite "login bem-sucedido! e leva para a tela principal"
   */
  const handleLogin = async () => {
    console.log("Realizando login", email);

    // 1- Chama a função de login.
    const { data, error } = await signIn(email, password);
    // 2- Verifica se houve algum erro, caso tenha, retorna um alerta com a mensagem de erro
    if (error !== undefined) {
        console.log("Erro ao fazer login:", error);
        alert('Erro -> ' + error);
    } 
    // 3- Caso não haja erro, emite "login bem-sucedido! e leva para a tela principal"
    else {
      console.log("Login bem-sucedido!");
      navigation.navigate("Home");
    }
};
  /**
   * JANELA DE LOGIN 
   * */
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
              placeholder="Email de avaliador"
              onChangeText={setEmail}
          />

          <TextInput
              style={styles.input}
              placeholder="Senha"
              secureTextEntry={true}
              onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text style={styles.linkText}>Não possuo uma conta!</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("ForgotPass")}>
              <Text style={styles.linkText}>Esqueceu a senha?</Text>
          </TouchableOpacity>
      </View>
  );
}

/**
 * "CSS" DA TELA DE LOGIN.
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
      marginBottom: 30,
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
      backgroundColor: '#2196F3',
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