import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button, IconButton, Provider as PaperProvider } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Item {
  id: string;
  title: string;
}

const ItemView: React.FC = () => {
  const [items, setItems] = useState<Item[]>([
    { id: '1', title: 'Item Exemplo 1' },
    { id: '2', title: 'Item Exemplo 2' },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [inputText, setInputText] = useState('');

  const generateId = () => Date.now().toString();

  const addItem = () => {
    if (!inputText.trim()) {
      Alert.alert('Erro', 'Digite um título');
      return;
    }
    const newItem: Item = {
      id: generateId(),
      title: inputText.trim(),
    };
    setItems([...items, newItem]);
    Toast.show({
      type: 'success',
      text1: 'Item adicionado!',
      text2: 'O item foi adicionado com sucesso.',
    });
    closeModal();
  };

  const updateItem = () => {
    if (!inputText.trim() || !editingItem) {
      Alert.alert('Erro', 'Digite um título');
      return;
    }
    setItems(items.map(item =>
      item.id === editingItem.id
        ? { ...item, title: inputText.trim() }
        : item
    ));
    closeModal();
  };

  const deleteItem = () => {
    if (!editingItem) {
      return;
    }
    setItems(items.filter(item => item.id !== editingItem.id));
    closeModal();
  };

  const closeModal = () => {
    setInputText('');
    setEditingItem(null);
    setModalVisible(false);
  };

  const openAddModal = () => {
    setInputText('');
    setEditingItem(null);
    setModalVisible(true);
  };

  const openEditModal = (item: Item) => {
    setInputText(item.title);
    setEditingItem(item);
    setModalVisible(true);
  };

  const renderItem = ({ item }: { item: Item }) => (
    <TouchableOpacity 
      style={styles.item} 
      onPress={() => openEditModal(item)}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Icon name="assignment" size={20} color="#333" style={{ marginRight: 8 }} />
      <Text>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text style={styles.title}>Lista de Itens</Text>
        
        <IconButton
          icon="information"
          size={30}
          onPress={() => Alert.alert('Sobre', 'este app é de lista de item.')}
          style={{ alignSelf: 'center', marginBottom: 10 }}
        />
        <Button mode="contained" onPress={openAddModal} style={{ marginBottom: 20 }}>
          Adicionar Item
        </Button>

        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />

        <Modal 
          visible={modalVisible} 
          transparent={true} 
          animationType="fade"
        >
          <View style={styles.modalOverlay}>
            <View style={styles.dialog}>
              <Text style={styles.modalTitle}>
                {editingItem ? 'Editar Item' : 'Novo Item'}
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Digite o título"
                value={inputText}
                onChangeText={setInputText}
              />

              <View style={styles.buttons}>
                <Button mode="outlined" onPress={closeModal} style={styles.button}>
                  Cancelar
                </Button>

                {editingItem && (
                  <Button
                    mode="outlined"
                    onPress={deleteItem}
                    style={[styles.button, styles.deleteButton]}
                    labelStyle={styles.deleteButtonText}
                  >
                    Excluir
                  </Button>
                )}

                <Button
                  mode="contained"
                  onPress={editingItem ? updateItem : addItem}
                  style={styles.button}
                >
                  {editingItem ? 'Salvar' : 'Adicionar'}
                </Button>
              </View>
            </View>
          </View>
        </Modal>
      </View>
      <Toast /> {}
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dialog: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
  },
  deleteButton: {
    backgroundColor: '#ffebee',
  },
  deleteButtonText: {
    color: '#d32f2f',
  },
});

export default ItemView;