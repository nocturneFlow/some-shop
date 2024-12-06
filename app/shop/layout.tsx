"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const category = pathname.split("/")[2]; // Will get the category from /shop/[category]
  const displayTitle = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : "Shop";

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="overflow-hidden">
        <header className="flex sticky top-0 bg-background h-16 shrink-0 items-center justify-between gap-2 px-4 border-b z-10">
          <div className="flex items-center">
            <SidebarTrigger className="-ml-2" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div>
              <h1 className="text-lg font-bold capitalize">{displayTitle}</h1>
            </div>
          </div>
          <div className="flex items-center gap-2"></div>
        </header>
        <main className="flex flex-1 flex-col gap-4 overflow-auto">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
