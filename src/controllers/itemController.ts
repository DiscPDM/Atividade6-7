import { Item } from '../models/item';
import { fetchCatImage } from '../services/itemService';
import { saveItems } from '../services/storageService';
import { ItemAction } from '../reducers/itemReducer';

export class ItemController {
  private updateState: React.Dispatch<ItemAction>;

  constructor(updateState: React.Dispatch<ItemAction>) {
    this.updateState = updateState;
  }

  async addItem(inputText: string, currentItems: Item[]): Promise<void> {
    if (!inputText.trim()) {
      return;
    }

    const imageUrl = await fetchCatImage();
    const newItem: Item = {
      id: Date.now().toString(),
      title: inputText.trim(),
      imageUrl: imageUrl || undefined,
    };

    this.updateState({ type: 'ADD_ITEM', payload: newItem });
    this.updateState({ type: 'CLEAR_FORM' });
    
    const updatedItems = [...currentItems, newItem];
    await saveItems(updatedItems);
  }

  async updateItem(inputText: string, editingItem: Item | null, currentItems: Item[]): Promise<void> {
    if (!inputText.trim() || !editingItem) {
      return;
    }

    const updatedItem = {
      ...editingItem,
      title: inputText.trim(),
    };

    this.updateState({ type: 'UPDATE_ITEM', payload: updatedItem });
    this.updateState({ type: 'CLEAR_FORM' });
    
    const updatedItems = currentItems.map(item =>
      item.id === editingItem.id ? updatedItem : item
    );
    await saveItems(updatedItems);
  }

  async deleteItem(editingItem: Item | null, currentItems: Item[]): Promise<void> {
    if (!editingItem) {
      return;
    }

    this.updateState({ type: 'DELETE_ITEM', payload: editingItem.id });
    this.updateState({ type: 'CLEAR_FORM' });
    
    const updatedItems = currentItems.filter(item => item.id !== editingItem.id);
    await saveItems(updatedItems);
  }

  openAddModal(): void {
    this.updateState({ type: 'SET_INPUT_TEXT', payload: '' });
    this.updateState({ type: 'SET_EDITING_ITEM', payload: null });
    this.updateState({ type: 'SET_MODAL_VISIBLE', payload: true });
  }

  openEditModal(item: Item): void {
    this.updateState({ type: 'SET_INPUT_TEXT', payload: item.title });
    this.updateState({ type: 'SET_EDITING_ITEM', payload: item });
    this.updateState({ type: 'SET_MODAL_VISIBLE', payload: true });
  }

  closeModal(): void {
    this.updateState({ type: 'CLEAR_FORM' });
  }

  setInputText(text: string): void {
    this.updateState({ type: 'SET_INPUT_TEXT', payload: text });
  }
}
