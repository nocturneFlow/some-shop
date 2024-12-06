"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getCategories,
  getAllItems,
  addCategory,
  addItem,
  deleteCategory,
  deleteItem,
} from "@/app/lib/mockData";
import { Plus, Trash } from "lucide-react";

export default function AdminPage() {
  const [categories, setCategories] = useState(getCategories());
  const [items, setItems] = useState(getAllItems());
  const [newCategory, setNewCategory] = useState({ id: "", title: "" });
  const [newItem, setNewItem] = useState({
    id: "",
    title: "",
    description: "",
    price: 0,
    category: "",
  });

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedCategories = addCategory(newCategory);
    setCategories(updatedCategories);
    setNewCategory({ id: "", title: "" });
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedItems = addItem(newItem);
    setItems(updatedItems);
    setNewItem({ id: "", title: "", description: "", price: 0, category: "" });
  };

  return (
    <div className="container mx-auto p-8 space-y-8">
      {/* Categories Section */}
      <div className="bg-card rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Categories</h2>
          <button
            onClick={() =>
              document
                .getElementById("addCategoryForm")
                ?.classList.toggle("hidden")
            }
            className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md"
          >
            <Plus className="w-4 h-4" /> Add Category
          </button>
        </div>

        <form
          id="addCategoryForm"
          onSubmit={handleAddCategory}
          className="hidden mb-6 space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Category ID"
              value={newCategory.id}
              onChange={(e) =>
                setNewCategory({ ...newCategory, id: e.target.value })
              }
              className="border rounded-md p-2"
              required
            />
            <input
              type="text"
              placeholder="Category Title"
              value={newCategory.title}
              onChange={(e) =>
                setNewCategory({ ...newCategory, title: e.target.value })
              }
              className="border rounded-md p-2"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md"
          >
            Save Category
          </button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {categories.map((category) => (
            <div key={category.id} className="border rounded-lg p-4">
              <h3 className="font-semibold">{category.title}</h3>
              <p className="text-sm text-muted-foreground">ID: {category.id}</p>
              <button
                onClick={() => {
                  const updated = deleteCategory(category.id);
                  setCategories(updated);
                }}
                className="mt-2 text-red-500 hover:text-red-700"
              >
                <Trash className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Items Section */}
      <div className="bg-card rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Items</h2>
          <button
            onClick={() =>
              document.getElementById("addItemForm")?.classList.toggle("hidden")
            }
            className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md"
          >
            <Plus className="w-4 h-4" /> Add Item
          </button>
        </div>

        <form
          id="addItemForm"
          onSubmit={handleAddItem}
          className="hidden mb-6 space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Item ID"
              value={newItem.id}
              onChange={(e) => setNewItem({ ...newItem, id: e.target.value })}
              className="border rounded-md p-2"
              required
            />
            <Select
              value={newItem.category}
              onValueChange={(value) =>
                setNewItem({ ...newItem, category: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <input
              type="text"
              placeholder="Title"
              value={newItem.title}
              onChange={(e) =>
                setNewItem({ ...newItem, title: e.target.value })
              }
              className="border rounded-md p-2"
              required
            />
            <input
              type="number"
              placeholder="Price"
              value={newItem.price}
              onChange={(e) =>
                setNewItem({ ...newItem, price: Number(e.target.value) })
              }
              className="border rounded-md p-2"
              required
            />
            <textarea
              placeholder="Description"
              value={newItem.description}
              onChange={(e) =>
                setNewItem({ ...newItem, description: e.target.value })
              }
              className="border rounded-md p-2 col-span-2"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md"
          >
            Save Item
          </button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div key={item.id} className="border rounded-lg p-4">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
              <p className="text-primary mt-2">${item.price}</p>
              <button
                onClick={() => {
                  const updated = deleteItem(item.id);
                  setItems(updated);
                }}
                className="mt-2 text-red-500 hover:text-red-700"
              >
                <Trash className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
