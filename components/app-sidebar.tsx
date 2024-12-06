"use client";

import { getCategories } from "@/app/lib/mockData";
import * as React from "react";
import {
  BookOpen,
  Bot,
  ChartBarStacked,
  Home,
  Lock,
  Settings2,
  ShoppingBag,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavCategories } from "@/components/nav-categories";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "Godfellas",
    email: "godfellas@vk.com",
    avatar: "/avatars/shadcn.jpg",
  },
  items: [
    {
      name: "Home",
      url: "/shop",
      icon: Home,
    },
    {
      name: "Admin",
      url: "/shop/admin",
      icon: Lock,
    },
  ],
  navCat: [
    {
      title: "Categories",
      url: "#",
      icon: ChartBarStacked,
      isActive: true,
      categorys: getCategories().map((category) => ({
        title: category.title,
        url: category.url,
      })),
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <ShoppingBag className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Limiko | VK Cloud</span>
                  <span className="">v1.0.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.items} />
        <NavCategories categories={data.navCat} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
