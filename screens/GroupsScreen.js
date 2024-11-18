import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default function GroupsScreen({ route, navigation }) {
  const { grupos } = route.params; // Recebe os grupos da tela anterior
  const [searchQuery, setSearchQuery] = useState(''); // Estado para armazenar a consulta de pesquisa

  // Função para filtrar grupos com base na consulta de pesquisa
  const filteredGrupos = grupos.filter(grupo =>
    grupo.nomeGrupo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Função para renderizar cada item da lista
  const renderItem = ({ item, index }) => {
    const backgroundColor = index % 2 === 0 ? '#f9f9f9' : '#e0e0e0'; // Alterna entre cores de fundo

    return (
      <TouchableOpacity 
        style={[styles.item, { backgroundColor }]} 
        onPress={() => navigation.navigate('Group', { grupoId: item.id })} // Navega para AlunosScreen passando o ID do grupo
      >
        <Text style={styles.itemText}>{item.id}</Text>
        <Text style={styles.itemText}>{item.nomeGrupo}</Text>
        <Text style={styles.itemText}>{item.dataApresentacao}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Pesquisar por Nome do Grupo"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <View style={styles.header}>
        <Text style={styles.headerText}>ID</Text>
        <Text style={styles.headerText}>Grupo</Text>
        <Text style={styles.headerText}>Data</Text>
      </View>
      <FlatList
        data={filteredGrupos} // Usa a lista filtrada
        keyExtractor={(item) => item.id.toString()} // Certifique-se de que cada grupo tenha um ID único
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: 'rgb(44, 44, 104)', // Cor de fundo igual aos outros arquivos
  },
  
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#333', // Cor de fundo do cabeçalho
  },
  
  headerText: {
    fontSize: 18,
    color: '#fff',
    flex: 1,
    textAlign: 'center', // Centraliza o texto no cabeçalho
  },

  item: {
    flexDirection: 'row', // Permite que os itens sejam exibidos lado a lado
    justifyContent: 'space-between', // Espaço entre os textos
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  
  itemText: {
    fontSize: 16,
    color: '#333',
    flex: 1, // Faz com que o texto ocupe o espaço disponível
    textAlign: 'center', // Centraliza o texto nas linhas
  },
});