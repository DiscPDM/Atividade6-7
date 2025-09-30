import React, { useReducer, useEffect } from 'react';
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
import { useTheme } from '../contexts/ThemeContext';
import { useSettings } from '../contexts/SettingsContext';
import { loadItems } from '../services/storageService';

const ItemView: React.FC<NavigationProps> = ({ navigation }) => {
  const [state, dispatch] = useReducer(itemReducer, initialItemState);
  const [controller] = React.useState(() => new ItemController(dispatch));
  const { colors } = useTheme();
  const { layout } = useSettings();

  const { items, modalVisible, editingItem, inputText } = state;
  const { isTablet, isLandscape, isWeb } = useResponsive();

  useEffect(() => {
    loadSavedItems();
  }, []);

  const loadSavedItems = async () => {
    const savedItems = await loadItems();
    savedItems.forEach(item => {
      dispatch({ type: 'ADD_ITEM', payload: item });
    });
  };

  const handleAddItem = async () => {
    if (!inputText.trim()) {
      Alert.alert('Erro', 'Digite o nome do gato');
      return;
    }
    
    await controller.addItem(inputText, items);
    Toast.show({
      type: 'success',
      text1: 'Item adicionado!',
      text2: 'O item foi adicionado com sucesso.',
    });
  };

  const handleUpdateItem = async () => {
    if (!inputText.trim() || !editingItem) {
      Alert.alert('Erro', 'Digite o nome do gato');
      return;
    }
    await controller.updateItem(inputText, editingItem, items);
  };

  const handleDeleteItem = async () => {
    if (!editingItem) {
      return;
    }
    await controller.deleteItem(editingItem, items);
  };

  const renderItem = ({ item }: { item: Item }) => (
    <TouchableOpacity 
      style={[
        commonStyles.item,
        isTablet && commonStyles.itemTablet,
        isLandscape && commonStyles.itemLandscape,
        { backgroundColor: colors.surface, borderBottomColor: colors.border }
      ]} 
      onPress={() => controller.openEditModal(item)}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
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
            color={colors.text} 
            style={{ marginRight: isTablet ? 12 : 8 }} 
          />
        )}
        <Text style={[
          commonStyles.itemText,
          isTablet && commonStyles.itemTextTablet,
          { flex: 1, flexWrap: 'wrap', color: colors.text }
        ]}>
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[
      commonStyles.container,
      isTablet && commonStyles.containerTablet,
      { backgroundColor: colors.background }
    ]}>
        <Text style={[
          commonStyles.title,
          isTablet && commonStyles.titleTablet,
          { color: colors.text }
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
              numColumns={layout === 'grid' && isTablet ? 2 : 1}
              contentContainerStyle={[
                commonStyles.listContainer,
                isLandscape && commonStyles.listContainerLandscape,
                isWeb && commonStyles.listContainerWeb
              ]}
              columnWrapperStyle={layout === 'grid' && isTablet ? { justifyContent: 'space-between' } : undefined}
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
              isWeb && commonStyles.dialogWeb,
              { backgroundColor: colors.surface }
            ]}>
              <Text style={[
                commonStyles.modalTitle,
                isTablet && commonStyles.modalTitleTablet,
                { color: colors.text }
              ]}>
                {editingItem ? 'Editar Gato' : 'Novo Gato'}
              </Text>

              <TextInput
                style={[
                  commonStyles.input,
                  isTablet && commonStyles.inputTablet,
                  { 
                    backgroundColor: colors.background,
                    borderColor: colors.border,
                    color: colors.text
                  }
                ]}
                placeholder="Digite o nome do gato" 
                placeholderTextColor={colors.secondary}
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