// app/shop/[category]/[item]/page.tsx

import { notFound } from "next/navigation";
import { getMockItem } from "@/app/lib/mockData";
import Image from "next/image";

interface Item {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
}

async function getItem(category: string, item: string): Promise<Item> {
  if (!process.env.BACKEND_URL) {
    const mockItem = getMockItem(category, item);
    if (!mockItem) {
      throw new Error("Item not found");
    }
    return mockItem;
  }

  const res = await fetch(
    `${process.env.BACKEND_URL}/api/${category}/${item}`,
    {
      cache: "no-store", // Disable cache for real-time data
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch item");
  }

  return res.json();
}

export default async function ItemPage({
  params,
}: {
  params: { category: string; item: string };
}) {
  try {
    const item = await getItem(params.category, params.item);

    return (
      <div className="container mx-auto p-8 h-screen shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-card rounded-lg p-6">
          {/* Image Section */}
          <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
              className="object-contain p-2 hover:scale-105 transition-transform duration-300"
              priority={false}
              loading="lazy"
              quality={100}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkAAIAAAoAAv/lxKUAAAAASUVORK5CYII="
            />
          </div>

          {/* Content Section */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold text-primary mb-4">
                {item.title}
              </h1>
              <p className="text-muted-foreground mb-6">{item.description}</p>
            </div>

            <div className="space-y-4">
              <p className="text-2xl font-semibold text-primary">
                ${item.price.toFixed(2)}
              </p>
              <button
                className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-lg 
                               hover:opacity-90 transition-opacity duration-200 
                               font-semibold"
              >
                Add to Cart
              </button>

              {/* Additional Details */}
              <div className="mt-6 pt-6 border-t border-border">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  Product Details
                </h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>Category: {params.category}</li>
                  <li>Item ID: {item.id}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch {
    notFound();
  }
}

//metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: { category: string; item: string };
}) {
  const item = await getItem(params.category, params.item);

  return {
    title: item.title,
    description: item.description,
  };
}
