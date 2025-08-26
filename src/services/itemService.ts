import { Item } from '../models/item';

export function addItem(items: Item[], title: string): Item[] {
  const newItem: Item = { id: Date.now().toString(), title };
  return [...items, newItem];
}

export function updateItem(items: Item[], id: string, title: string): Item[] {
  return items.map(item =>
    item.id === id ? { ...item, title } : item
  );
}

export function deleteItem(items: Item[], id: string): Item[] {
  return items.filter(item => item.id !== id);
}