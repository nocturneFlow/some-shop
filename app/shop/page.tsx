"use client";

import { useEffect, useRef, useState } from "react";
import { getItems } from "@/app/lib/data";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Product {
  id: string;
  title: string;
  price: string;
  category: string;
  image_url: string;
}

export default function ShopPage() {
  const headerRef = useRef(null);
  const productsRef = useRef(null);
  const productRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const items = await getItems();
        const products = items.map((item) => ({
          id: item.id.toString(),
          title: item.title,
          price: item.price,
          category: item.category,
          image_url: item.image_url,
        }));
        setProducts(products);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Failed to load products"
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    // Header animation
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    // Products grid animation
    productRefs.current.forEach((product, index) => {
      gsap.fromTo(
        product,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: product,
            start: "top bottom-=100",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, [products]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-background">
      <header
        ref={headerRef}
        className="text-center py-16 bg-gradient-to-r from-primary/10 to-secondary/10"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
          Our Collection
        </h1>
        <p className="text-muted-foreground text-lg">
          Discover our curated selection
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div
          ref={productsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12"
        >
          {products.map((product, index) => (
            <Link
              href={`/shop/${product.category}/${product.id}`}
              key={product.id}
            >
              <div
                ref={(el) => (productRefs.current[index] = el)}
                className="group bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
              >
                <div className="aspect-square relative bg-white">
                  <Image
                    src={
                      product.image_url.startsWith("http")
                        ? product.image_url
                        : `http://90.156.251.249:8080/images/${product.image_url}`
                    }
                    alt={product.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                    className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                    priority={index < 4}
                  />
                </div>
                <div className="p-4">
                  <h2 className="font-medium text-lg line-clamp-1">
                    {product.title}
                  </h2>
                  <p className="text-primary font-bold mt-2">
                    ${(parseInt(product.price) / 100).toFixed(2)}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
