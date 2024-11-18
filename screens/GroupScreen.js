/**
 * ARQUIVO DA TELA DE GRUPO
 * ---------------------------
 * Feito por: Arthur Morgado Teixeira
 * E-mail: arthurmorgado7751@gmail.com
 * Telefone: 27 99653-0202
 * 
 * "parte mais difícil...".
 */

/**
 * IMPORTAÇÃO DOS MÓDULO
 * */
import { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { supabase } from '../Supabase/supabase';

/**
 * FUNÇÃO DA TELA DE GRUPO INDIVIDUAL
 */
export default function GroupScreen({ route }) { // Não tenho certeza de como o "route" funciona...
  /**
   * VARIÁVEIS
   */
  const { grupoId } = route.params; // Serve para receber o ID do grupo da tela anterior
  const [alunos, setAlunos] = useState([]);
  const [notas, setNotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * FUNÇÃO fetchGroupData
   * ---------------------
   * Função para buscar os registros do grupo selecionado na tabela no Supabase.
   */
  const fetchGroupData = async () => {
    // TRY para verificar se buscou corretamente.
    try {
      console.log("Iniciando busca de dados para o grupo ID:", grupoId);
      setLoading(true);
      setError(null);

      // Busca de alunos
      const alunosResponse = await supabase
        .from('alunos')
        .select('*')
        .eq('grupo', grupoId);

      // DEBUG: LOG PARA VERIFICAR SE OS ALUNOS FORAM BUSCADOS CORRETAMENTE
      console.log("Resposta de alunos:", alunosResponse);

      if (alunosResponse.error) {
        // DEBUG: LOG PARA VERIFICAR SE HOUVE ALGUM ERRO NA BUSCA E QUAL ERRO
        console.error("Erro na busca de alunos: ", alunosResponse.error);
        throw alunosResponse.error;
      }

      // Busca de notas
      const notasResponse = await supabase
        .from('avaliacao')
        .select('nota1, nota2, nota3, nota4, nota5')
        .eq('idGrupo', grupoId);

      console.log("Resposta de notas:", notasResponse);

      if (notasResponse.error) {
        console.error("Erro na busca de notas:", notasResponse.error);
        throw notasResponse.error;
      }

      // Atualiza os estados
      setAlunos(alunosResponse.data || []);
      setNotas(notasResponse.data || []);
      
      console.log("Dados carregados com sucesso:");
      console.log("Alunos:", alunosResponse.data);
      console.log("Notas:", notasResponse.data);
    } catch (err) {
      console.error("Erro fatal na busca de dados:", err);
      setError(err.message || 'Erro desconhecido ao carregar dados');
      
      // Mostra um alerta para o usuário
      Alert.alert(
        "Erro",
        "Não foi possível carregar os dados do grupo. Tente novamente.",
        [{ text: "OK" }]
      );
    } finally {
      setLoading(false);
    }
  };

  // UseEffect para buscar dados quando o componente monta ou grupoId muda
  useEffect(() => {
    console.log("UseEffect chamado com grupoId:", grupoId);
    fetchGroupData();
  }, [grupoId]);

  // Renderização de estado de carregamento
  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Carregando...</Text>
        </View>
        <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
      </View>
    );
  }

  // Renderização de erro
  if (error) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Erro</Text>
        </View>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  // Renderização quando não há alunos
  if (alunos.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Membros do Grupo</Text>
        </View>
        <Text style={styles.errorText}>Nenhum aluno encontrado neste grupo.</Text>
      </View>
    );
  }

  /**
   * TELA DE GRUPO
   */
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Membros do Grupo</Text>
      </View>
      
      <FlatList
        data={alunos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => {
          const backgroundColor = index % 2 === 0 ? '#f9f9f9' : '#e0e0e0';
          return (
            <View style={[styles.item, { backgroundColor }]}>
              <Text style={styles.itemText}>{index + 1} - {item.nomeCompleto}</Text>
            </View>
          );
        }}
        style={styles.alunosList}
      />
      
      <View style={styles.notesContainer}>
        <Text style={styles.notesTitle}>Notas do Grupo</Text>
        
        <View style={styles.notesTable}>
          <View style={styles.notesHeaderRow}>
            <Text style={styles.notesHeaderCell}>Nota 1</Text>
            <Text style={styles.notesHeaderCell}>Nota 2</Text>
            <Text style={styles.notesHeaderCell}>Nota 3</Text>
            <Text style={styles.notesHeaderCell}>Nota 4</Text>
            <Text style={styles.notesHeaderCell}>Nota 5</Text>
          </View>
          {notas.map((notaData, index) => (
            <View key={index} style={[styles.notesRow, { backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#e0e0e0' }]}>
              <Text style={styles.noteCell}>{notaData.nota1}</Text>
              <Text style={styles.noteCell}>{notaData.nota2}</Text>
              <Text style={styles.noteCell}>{notaData.nota3}</Text>
              <Text style={styles.noteCell}>{notaData.nota4}</Text>
              <Text style={styles.noteCell}>{notaData.nota5}</Text>
            </View>
          ))}
        </View>

        {notas.length === 0 && (
          <Text style={styles.noteText}>Nenhuma nota disponível.</Text>
        )}
      </View>
    </View>
  );
}

/**
 * "CSS" DA TELA DE GRUPO.
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(44, 44, 104)',
  },
  header: {
    width: '100%',
    height: 80,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alunosList: {
    flexGrow: 0,
    maxHeight: '50%', // Ajuste este valor conforme necessário
  },
  item: {
    paddingVertical: 10,
    marginVertical: 2,
    marginHorizontal: 10,
    borderRadius: 10,
    elevation: 3,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'left',
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  notesContainer: {
    marginTop: 10,
    marginHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    elevation: 3,
  },
  notesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  notesTable: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
  },
  notesHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#4a69bd',
    borderBottomWidth: 2,
    borderBottomColor: '#ddd',
  },
  notesHeaderCell: {
    flex: 1,
    textAlign: 'center',
    padding: 8,
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  notesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  noteCell: {
    flex: 1,
    textAlign: 'center',
    padding: 8,
    fontSize: 14,
    color: '#333',
  },
  noteText: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
});