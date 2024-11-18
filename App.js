/**
 * ARQUIVO PARA GERENCIAR AS NAVEGAÇÕES ENTRE AS TELAS
 *---------------------------------------------------------* 
 * Feito por: Arthur Morgado Teixeira
 * E-mail: arthurmorgado7751@gmail.com
 * Telefone: 27 99653-0202
 *---------------------------------------------------------*/

/**
 * IMPORTAÇÃO DOS MODULOS NECESSÁRIOS
 * ---------------------------------------------------------------------------------*
 * "NavigationContainer" e "createNativeStackNavigator" necessitam de dependências:
 *    npm install @react-navigation/native @react-navigation/native-stack
 *    npx expo install react-native-screens react-native-safe-area-context
 * 
 * Confira: https://reactnative.dev/docs/navigation
 */
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

/**
 * IMPORTAÇÃO DAS TELAS DO APLICATIVO
 **/
import LoginScreen from './screens/LoginScreen';            // Tela de Login
import SignUpScreen from './screens/SignUpScreen';          // Tela de registro.
import ForgotPassScreen from './screens/ForgotPassScreen';  // Tela de "esqueci a senha".
import HomeScreen from './screens/HomeScreen';              // Tela principal.
import GroupsScreen from './screens/GroupsScreen';          // Janela de listagem de grupos.
import GroupScreen from './screens/GroupScreen';            // Janela de grupo individual.

/**
 * Essa "Stack" serve para armazenar um "StackNavigator", que é um objeto responsável por gerenciar a 
 * navegação entre as telas.
 */
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    /**
     * 1. As telas devem ficar dentro de um "NavigationContainer".
     * 2. Stack.Navigator initialRouteName irá armazenar a tela inicial do seu aplicativo.
     * 3. Cada "Stack.Screen" serve para armazenar, respectivamente, o nome e o objeto da tela. O nome
     *    funciona como uma abreviação do nome real da tela, enquanto o objeto (dentro de component) é o nome 
     *    do objeto realmente.
     */
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignUp">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ForgotPass" component={ForgotPassScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Groups" component={GroupsScreen} />
        <Stack.Screen name="Group" component={GroupScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
