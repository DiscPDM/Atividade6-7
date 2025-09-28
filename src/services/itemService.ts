import { Item } from '../models/item';

export function addItem(items: Item[], title: string, imageUrl?: string): Item[] {
  const newItem: Item = { id: Date.now().toString(), title, imageUrl };
  return [...items, newItem];
}

export function updateItem(items: Item[], id: string, title: string, imageUrl?: string): Item[] {
  return items.map(item =>
    item.id === id ? { ...item, title, imageUrl } : item
  );
}

export function deleteItem(items: Item[], id: string): Item[] {
  return items.filter(item => item.id !== id);
}

export async function fetchCatImage(): Promise<string | null> {
  try {
    const response = await fetch('https://api.thecatapi.com/v1/images/search');
    const data = await response.json();
    return data[0]?.url || null;
  } catch (error) {
    console.error('Erro ao buscar imagem:', error);
    return null;
  }
}