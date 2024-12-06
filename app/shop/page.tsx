"use client";

import { motion } from "framer-motion";
import { getAllItems } from "@/app/lib/mockData";
import Image from "next/image";
import Link from "next/link";

export default function ShopPage() {
  const products = getAllItems()
    .sort(() => Math.random() - 0.5)
    .slice(0, 16);

  return (
    <div className="min-h-screen bg-background m-6">
      <main className="px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link
              href={`/shop/${product.category}/${product.id}`}
              key={product.id}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group cursor-pointer"
              >
                <div className="aspect-square bg-muted mb-4 relative rounded-lg overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.title}
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
                <h2 className="font-helvetica text-lg text-foreground">
                  {product.title}
                </h2>
                <p className="text-primary">${product.price.toFixed(2)}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
