/**
 * ARQUIVO DA TELA DE CADASTRO
 * ---------------------------
 * Feito por: Arthur Morgado Teixeira
 * E-mail: arthurmorgado7751@gmail.com
 * Telefone: 27 99653-0202
 */

/**
 * IMPORTAÇÃO DOS MÓDULOS
 */
import { useState } from 'react'; // Função para armazenar variáveis e alterar em tempo real
import { Text, StyleSheet, View, TextInput, TouchableOpacity, Alert, Image } from 'react-native'; // Importa os componentes do React
import { signUp } from '../Supabase/autenticacao';  // Importa a função de cadastro

/**
 * FUNÇÃO signUpScreen({ navigation })
 * -----------------------------------
 * Função para criar a tela de cadastro e retorna a tela ao final.
 */
export default function SignUpScreen({ navigation }) {
  /**
   * VARIÁVEIS
   */
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  /**
   * FUNÇÃO para lidar com o cadastro e criar a tela de cadastro.
   * ------------------------------------------------------------
   * Cria a lógica de cadastro e armazena em uma varíavel constante.
   *  1- Verifica se a senha e a confirmação de senha coincidem.
   *  2- Chama a função de cadastro do Supabase.
   *  3- Verifica se ocorreu algum erro com o cadastro.
   *  4- Caso tenha, emite um popUp com a mensagem de erro.
   *  5- Caso não tenha algum erro, emite um alerta de sucesso e passa para a tela de login.
   * 
   * - não sei direito a necessidade de criar arrows function e armazenar em varia´veis... -
   */
  const handleSignUp = async () => {
    // 1- Verifica se a senha e a confirmação de senha coincidem.
    if (senha !== confirmSenha) {
      alert("Erro -> As senhas não coincidem.");
      return;
    }

    // 2- Chama a função de cadastro do Supabase.
    const { error } = await signUp(nomeCompleto, email, senha);

    // 3- Verifica se ocorreu algum erro com o cadastro.
    if (error) { // 4- Caso tenha, emite um popUp com a mensagem de erro.
      alert(error.message);
    }
    // 5- Caso não tenha algum erro, emite um alerta de sucesso e passa para a tela de login.
    else {
      alert("Sucesso -> Cadastro realizado com sucesso!");
      navigation.navigate("Login");
    }
    };

    /**
     * TELA DE CADASTRO
     * ----------------
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
          placeholder="Nome Completo"
          onChangeText={setNomeCompleto}
        />

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          keyboardType="email-address"
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry={true}
          onChangeText={setSenha}
        />

        <TextInput
          style={styles.input}
          placeholder="Confirme a senha"
          secureTextEntry={true}
          onChangeText={setConfirmSenha}
        />

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.linkText}>Já possui uma conta?</Text>
        </TouchableOpacity>
      </View>
    );
  }

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
    backgroundColor: '#4CAF50',
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
