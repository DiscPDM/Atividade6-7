import AsyncStorage from '@react-native-async-storage/async-storage';
import { Item } from '../models/item';

const ITEMS_KEY = 'saved_items';

export const saveItems = async (items: Item[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(ITEMS_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('Erro ao salvar itens:', error);
  }
};

export const loadItems = async (): Promise<Item[]> => {
  try {
    const savedItems = await AsyncStorage.getItem(ITEMS_KEY);
    if (savedItems !== null) {
      return JSON.parse(savedItems);
    }
    return [];
  } catch (error) {
    console.error('Erro ao carregar itens:', error);
    return [];
  }
};

export const clearItems = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(ITEMS_KEY);
  } catch (error) {
    console.error('Erro ao limpar itens:', error);
  }
};
