import { Item } from '../models/item';

export interface ItemState {
  items: Item[];
  modalVisible: boolean;
  editingItem: Item | null;
  inputText: string;
}

export const initialItemState: ItemState = {
  items: [],
  modalVisible: false,
  editingItem: null,
  inputText: '',
};

export type ItemAction =
  | { type: 'ADD_ITEM'; payload: Item }
  | { type: 'UPDATE_ITEM'; payload: Item }
  | { type: 'DELETE_ITEM'; payload: string }
  | { type: 'SET_MODAL_VISIBLE'; payload: boolean }
  | { type: 'SET_EDITING_ITEM'; payload: Item | null }
  | { type: 'SET_INPUT_TEXT'; payload: string }
  | { type: 'CLEAR_FORM' };

export function itemReducer(state: ItemState, action: ItemAction): ItemState {
  switch (action.type) {
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.payload] };
    case 'UPDATE_ITEM':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case 'DELETE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
    case 'SET_MODAL_VISIBLE':
      return { ...state, modalVisible: action.payload };
    case 'SET_EDITING_ITEM':
      return { ...state, editingItem: action.payload };
    case 'SET_INPUT_TEXT':
      return { ...state, inputText: action.payload };
    case 'CLEAR_FORM':
      return { ...state, inputText: '', editingItem: null, modalVisible: false };
    default:
      return state;
  }
}
