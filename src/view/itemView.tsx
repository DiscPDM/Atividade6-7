import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button, IconButton } from 'react-native-paper';
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

  const { width, height } = Dimensions.get('window');
  const isTablet = width >= 768;
  const isLandscape = width > height;

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
      style={[
        styles.item,
        isTablet && styles.itemTablet,
        isLandscape && styles.itemLandscape
      ]} 
      onPress={() => openEditModal(item)}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Icon 
        name="assignment" 
        size={isTablet ? 24 : 20} 
        color="#333" 
        style={{ marginRight: isTablet ? 12 : 8 }} 
      />
      <Text style={[
        styles.itemText,
        isTablet && styles.itemTextTablet
      ]}>
        {item.title}
      </Text>
      </View>
    </TouchableOpacity>
  );

  return (
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
          numColumns={isTablet ? 2 : 1}
          contentContainerStyle={[
            styles.listContainer,
            isLandscape && styles.listContainerLandscape
          ]}
        />

        <Modal 
          visible={modalVisible} 
          transparent={true} 
          animationType="fade"
        >
          <View style={styles.modalOverlay}>
            <View style={[
              styles.dialog,
              isTablet && styles.dialogTablet,
              isLandscape && styles.dialogLandscape
            ]}>
              <Text style={[
                styles.modalTitle,
                isTablet && styles.modalTitleTablet
              ]}>
                {editingItem ? 'Editar Item' : 'Novo Item'}
              </Text>

              <TextInput
                style={[
                  styles.input,
                  isTablet && styles.inputTablet
                ]}
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
        <Toast />
      </View>
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
  listContainer: {
    paddingBottom: 20,
  },
  listContainerLandscape: {
    paddingHorizontal: 10,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemTablet: {
    padding: 20,
    margin: 5,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 0,
  },
  itemLandscape: {
    padding: 12,
  },
  itemText: {
    fontSize: 16,
  },
  itemTextTablet: {
    fontSize: 18,
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
    maxWidth: 400,
  },
  dialogTablet: {
    width: '60%',
    maxWidth: 600,
    padding: 30,
  },
  dialogLandscape: {
    width: '70%',
    maxWidth: 500,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalTitleTablet: {
    fontSize: 22,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 4,
  },
  inputTablet: {
    padding: 15,
    fontSize: 16,
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