import { getItems, getItemsByCategory } from "@/app/lib/data";
import Image from "next/image";
import Link from "next/link";

export async function generateStaticParams() {
  const items = await getItems();
  const categories = Array.from(new Set(items.map((item) => item.category)));

  return categories.map((category) => ({
    category: category,
  }));
}

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const items = await getItemsByCategory(params.category);

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
              <div className="relative w-full pb-[100%] bg-gray-50">
                <Image
                  src={item.image_url}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                  className="object-contain p-2 hover:scale-105 transition-transform duration-300"
                  priority={false}
                  loading="lazy"
                  quality={100}
                />
              </div>
              <h2 className="font-semibold line-clamp-2 mt-4">{item.title}</h2>
              <p className="text-primary mt-2">
                ${parseFloat(item.price).toFixed(2)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
