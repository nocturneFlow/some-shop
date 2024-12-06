interface Item {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

const mockItems: Item[] = [
  {
    id: "laptop-1",
    title: "MacBook Pro M2",
    description:
      "Experience groundbreaking performance with the all-new MacBook Pro featuring the M2 chip. With up to 20 hours of battery life, stunning Retina XDR display, and pro-level performance, it's designed for those who demand excellence.",
    price: 1299.99,
    category: "electronics",
    image: "/images/macbook.webp",
  },
  {
    id: "phone-1",
    title: "iPhone 14",
    description: "Latest iPhone with amazing camera",
    price: 999.99,
    category: "electronics",
    image: "/images/macbook.webp",
  },
  {
    id: "book-1",
    title: "The Great Gatsby",
    description: "Classic novel by F. Scott Fitzgerald",
    price: 9.99,
    category: "books",
    image: "/images/macbook.webp",
  },
  {
    id: "clothing-1",
    title: "Cotton T-Shirt",
    description: "Comfortable casual wear",
    price: 19.99,
    category: "clothing",
    image: "/images/macbook.webp",
  },
];

export const categories = [
  {
    id: "electronics",
    title: "Electronics",
    url: "/shop/electronics",
  },
  {
    id: "clothing",
    title: "Clothing",
    url: "/shop/clothing",
  },
  {
    id: "books",
    title: "Books",
    url: "/shop/books",
  },
];

let mockItemsData = mockItems;
let categoriesData = categories;

export function getAllItems(): Item[] {
  return mockItemsData;
}

export function addCategory(category: { id: string; title: string }) {
  const newCategory = {
    ...category,
    url: `/shop/${category.id}`,
  };
  categoriesData = [...categoriesData, newCategory];
  return categoriesData;
}

export function deleteCategory(categoryId: string) {
  categoriesData = categoriesData.filter((cat) => cat.id !== categoryId);
  mockItemsData = mockItemsData.filter((item) => item.category !== categoryId);
  return categoriesData;
}

export function addItem(item: Omit<Item, "image">) {
  const newItem = {
    ...item,
    image: "/images/placeholder.webp", // Default image
  };
  mockItemsData = [...mockItemsData, newItem];
  return mockItemsData;
}

export function deleteItem(itemId: string) {
  mockItemsData = mockItemsData.filter((item) => item.id !== itemId);
  return mockItemsData;
}

export function getCategories() {
  return categories;
}

export function getMockItem(category: string, itemId: string): Item | null {
  return (
    mockItems.find(
      (item) => item.category === category && item.id === itemId
    ) || null
  );
}

export function getMockItemsByCategory(category: string): Item[] {
  return mockItems.filter((item) => item.category === category);
}

export function getAllCategories(): string[] {
  return Array.from(new Set(mockItems.map((item) => item.category)));
}
