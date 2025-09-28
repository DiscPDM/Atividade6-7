import React, { useReducer } from 'react';
import {
  Alert,
  FlatList,
  Image,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Item, NavigationProps } from '../models/item';
import { useResponsive } from './useResponsive';
import { commonStyles } from '../styles/commonStyles';
import { ItemController } from '../controllers/itemController';
import { itemReducer, initialItemState } from '../reducers/itemReducer';

const ItemView: React.FC<NavigationProps> = ({ navigation }) => {
  const [state, dispatch] = useReducer(itemReducer, initialItemState);
  const [controller] = React.useState(() => new ItemController(dispatch));

  const { items, modalVisible, editingItem, inputText } = state;
  const { isTablet, isLandscape, isWeb } = useResponsive();

  const handleAddItem = async () => {
    if (!inputText.trim()) {
      Alert.alert('Erro', 'Digite o nome do gato');
      return;
    }
    
    await controller.addItem(inputText);
    Toast.show({
      type: 'success',
      text1: 'Item adicionado!',
      text2: 'O item foi adicionado com sucesso.',
    });
  };

  const handleUpdateItem = () => {
    if (!inputText.trim() || !editingItem) {
      Alert.alert('Erro', 'Digite o nome do gato');
      return;
    }
    controller.updateItem(inputText, editingItem);
  };

  const handleDeleteItem = () => {
    if (!editingItem) {
      return;
    }
    controller.deleteItem(editingItem);
  };

  const renderItem = ({ item }: { item: Item }) => (
    <TouchableOpacity 
      style={[
        commonStyles.item,
        isTablet && commonStyles.itemTablet,
        isLandscape && commonStyles.itemLandscape
      ]} 
      onPress={() => controller.openEditModal(item)}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {item.imageUrl ? (
          <Image 
            source={{ uri: item.imageUrl }} 
            style={[
              commonStyles.itemImage,
              isTablet && commonStyles.itemImageTablet
            ]}
          />
        ) : (
          <Icon 
            name="assignment" 
            size={isTablet ? 24 : 20} 
            color="#333" 
            style={{ marginRight: isTablet ? 12 : 8 }} 
          />
        )}
        <Text style={[
          commonStyles.itemText,
          isTablet && commonStyles.itemTextTablet
        ]}>
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[
      commonStyles.container,
      isTablet && commonStyles.containerTablet
    ]}>
        <Text style={[
          commonStyles.title,
          isTablet && commonStyles.titleTablet
        ]}>Lista de Gatos</Text>
        
        <IconButton
          icon="information"
          size={30}
          onPress={() => Alert.alert('Sobre', 'lista de gatos')}
          style={{ alignSelf: 'center', marginBottom: 10 }}
        />
        <Button mode="contained" onPress={() => controller.openAddModal()} style={{ marginBottom: 20 }}>
          Adicionar Gato
        </Button>

        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={isTablet ? 2 : 1}
          contentContainerStyle={[
            commonStyles.listContainer,
            isLandscape && commonStyles.listContainerLandscape,
            isWeb && commonStyles.listContainerWeb
          ]}
          showsVerticalScrollIndicator={false}
        />

        <Modal 
          visible={modalVisible} 
          transparent={true} 
          animationType="fade"
        >
          <View style={commonStyles.modalOverlay}>
            <View style={[
              commonStyles.dialog,
              isTablet && commonStyles.dialogTablet,
              isLandscape && commonStyles.dialogLandscape,
              isWeb && commonStyles.dialogWeb
            ]}>
              <Text style={[
                commonStyles.modalTitle,
                isTablet && commonStyles.modalTitleTablet
              ]}>
                {editingItem ? 'Editar Gato' : 'Novo Gato'}
              </Text>

              <TextInput
                style={[
                  commonStyles.input,
                  isTablet && commonStyles.inputTablet
                ]}
                placeholder="Digite o nome do gato" 
                value={inputText}
                onChangeText={(text) => controller.setInputText(text)}
              />

              <View style={commonStyles.buttons}>
                <Button mode="outlined" onPress={() => controller.closeModal()} style={commonStyles.buttonRow}>
                  Cancelar
                </Button>

                {editingItem && (
                  <Button
                    mode="outlined"
                    onPress={handleDeleteItem}
                    style={[commonStyles.buttonRow, commonStyles.deleteButton]}
                    labelStyle={commonStyles.deleteButtonText}
                  >
                    Excluir
                  </Button>
                )}

                {editingItem && (
                  <Button
                    mode="outlined"
                    onPress={() => {
                      controller.closeModal();
                      navigation.navigate('ItemDetail', { item: editingItem });
                    }}
                    style={commonStyles.buttonRow}
                  >
                    Ver Detalhes
                  </Button>
                )}

                <Button
                  mode="contained"
                  onPress={editingItem ? handleUpdateItem : handleAddItem}
                  style={commonStyles.buttonRow}
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


export default ItemView;