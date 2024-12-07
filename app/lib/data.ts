interface Item {
  id: number;
  title: string;
  description: string;
  price: string;
  category: string;
  image_url: string;
}

interface ApiResponse {
  items: Item[];
}

async function fetchWithRetry(url: string, retries = 3): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) return res;
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
  throw new Error(`Failed to fetch after ${retries} retries`);
}

export async function getItems(): Promise<Item[]> {
  try {
    const res = await fetchWithRetry(`http://90.156.251.249:8080/getitems`);
    const data: ApiResponse = await res.json();
    return data.items;
  } catch (error) {
    console.error("Failed to fetch items:", error);
    throw new Error("Failed to load products. Please try again later.");
  }
}

export async function getItemsByCategory(category: string): Promise<Item[]> {
  const items = await getItems();
  return items.filter((item) => item.category === category);
}

export async function getItem(
  category: string,
  itemId: string
): Promise<Item | null> {
  const items = await getItems();
  return (
    items.find(
      (item) => item.category === category && item.id === parseInt(itemId)
    ) || null
  );
}

export function getAllCategories(items: Item[]): string[] {
  return Array.from(new Set(items.map((item) => item.category)));
}
