import { getMockItemsByCategory } from "@/app/lib/mockData";
import Link from "next/link";

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const items = getMockItemsByCategory(params.category);

  return (
    <div className="container mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/shop/${params.category}/${item.id}`}
            className="group"
          >
            <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
              <div className="aspect-square relative mb-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="object-cover w-full h-full rounded"
                />
              </div>
              <h2 className="font-semibold">{item.title}</h2>
              <p className="text-primary mt-2">${item.price.toFixed(2)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
