"use client";

import { useState } from "react";
import { getCategories, categories } from "@/app/lib/mockData";
import { Plus } from "lucide-react";

export default function AdminPage() {
  const [newCategory, setNewCategory] = useState({ id: "", title: "" });

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    // Add category logic here
    console.log("Adding category:", newCategory);
  };

  return (
    <div className="space-y-8">
      {/* Categories Section */}
      <div className="bg-card rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Categories</h2>
          <button
            onClick={() =>
              document
                .getElementById("addCategoryForm")
                ?.classList.remove("hidden")
            }
            className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:opacity-90"
          >
            <Plus className="w-4 h-4" />
            Add Category
          </button>
        </div>

        {/* Add Category Form */}
        <form
          id="addCategoryForm"
          onSubmit={handleAddCategory}
          className="hidden mb-6 space-y-4 border-b pb-6"
        >
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Category ID"
              className="border rounded-md p-2"
              value={newCategory.id}
              onChange={(e) =>
                setNewCategory({ ...newCategory, id: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Category Title"
              className="border rounded-md p-2"
              value={newCategory.title}
              onChange={(e) =>
                setNewCategory({ ...newCategory, title: e.target.value })
              }
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:opacity-90"
          >
            Save Category
          </button>
        </form>

        {/* Categories List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold">{category.title}</h3>
              <p className="text-sm text-muted-foreground">ID: {category.id}</p>
              <div className="mt-4 flex gap-2">
                <button className="text-sm text-blue-500 hover:underline">
                  Edit
                </button>
                <button className="text-sm text-red-500 hover:underline">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
