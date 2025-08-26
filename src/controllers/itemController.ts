import { useState } from 'react';
import { Item } from '../models/item';
import { addItem, deleteItem, updateItem } from '../services/itemService';

export function useItemController() {
  const [items, setItems] = useState<Item[]>([]);
  const [dialogVisible, setDialogVisible] = useState(false);

  function handleAddItem(title: string) {
    setItems(prev => addItem(prev, title));
  }

  function handleUpdateItem(id: string, title: string) {
    setItems(prev => updateItem(prev, id, title));
  }

  function handleDeleteItem(id: string) {
    setItems(prev => deleteItem(prev, id));
  }

  function openDialog() {
    setDialogVisible(true);
  }

  function closeDialog() {
    setDialogVisible(false);
  }

  return {
    items,
    dialogVisible,
    addItem: handleAddItem,
    updateItem: handleUpdateItem,
    deleteItem: handleDeleteItem,
    openDialog,
    closeDialog,
  };
}