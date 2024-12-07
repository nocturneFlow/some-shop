// app/shop/[category]/[item]/page.tsx

import { notFound } from "next/navigation";
import { getItem } from "@/app/lib/data";
import Image from "next/image";

export default async function ItemPage({
  params,
}: {
  params: { category: string; item: string };
}) {
  try {
    const item = await getItem(params.category, params.item);
    if (!item) return notFound();

    return (
      <div className="container mx-auto p-8 h-screen shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-card rounded-lg p-6">
          <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
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
                ${parseFloat(item.price).toFixed(2)}
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
  if (!item) return {};

  return {
    title: item.title,
    description: item.description,
  };
}
