import { Item } from '../models/item';
import { fetchCatImage } from '../services/itemService';
import { ItemAction } from '../reducers/itemReducer';

export class ItemController {
  private dispatch: React.Dispatch<ItemAction>;

  constructor(dispatch: React.Dispatch<ItemAction>) {
    this.dispatch = dispatch;
  }

  async addItem(inputText: string): Promise<void> {
    if (!inputText.trim()) {
      return;
    }

    const imageUrl = await fetchCatImage();
    const newItem: Item = {
      id: Date.now().toString(),
      title: inputText.trim(),
      imageUrl: imageUrl || undefined,
    };

    this.dispatch({ type: 'ADD_ITEM', payload: newItem });
    this.dispatch({ type: 'CLEAR_FORM' });
  }

  updateItem(inputText: string, editingItem: Item | null): void {
    if (!inputText.trim() || !editingItem) {
      return;
    }

    const updatedItem = {
      ...editingItem,
      title: inputText.trim(),
    };

    this.dispatch({ type: 'UPDATE_ITEM', payload: updatedItem });
    this.dispatch({ type: 'CLEAR_FORM' });
  }

  deleteItem(editingItem: Item | null): void {
    if (!editingItem) {
      return;
    }

    this.dispatch({ type: 'DELETE_ITEM', payload: editingItem.id });
    this.dispatch({ type: 'CLEAR_FORM' });
  }

  openAddModal(): void {
    this.dispatch({ type: 'SET_INPUT_TEXT', payload: '' });
    this.dispatch({ type: 'SET_EDITING_ITEM', payload: null });
    this.dispatch({ type: 'SET_MODAL_VISIBLE', payload: true });
  }

  openEditModal(item: Item): void {
    this.dispatch({ type: 'SET_INPUT_TEXT', payload: item.title });
    this.dispatch({ type: 'SET_EDITING_ITEM', payload: item });
    this.dispatch({ type: 'SET_MODAL_VISIBLE', payload: true });
  }

  closeModal(): void {
    this.dispatch({ type: 'CLEAR_FORM' });
  }

  setInputText(text: string): void {
    this.dispatch({ type: 'SET_INPUT_TEXT', payload: text });
  }
}
