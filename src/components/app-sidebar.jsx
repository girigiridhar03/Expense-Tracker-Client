"use client";

import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  IndianRupee,
  PlusCircle,
  Wallet,
} from "lucide-react";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: <LayoutDashboard />,
      isActive: true,
    },
    {
      title: "Transactions",
      url: "#",
      icon: <IndianRupee />,
    },
    {
      title: "Add Expense",
      url: "#",
      icon: <PlusCircle />,
    },
    {
      title: "Budgets",
      url: "#",
      icon: <Wallet />,
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      {props.open && (
        <SidebarHeader>
          <div
            className="rounded-2xl p-6 
             bg-linear-to-b from-white/5 to-white/2
             ring-1 ring-white/10
             border border-white/10
             shadow-[0_0_30px_rgba(0,0,0,0.3)]
             backdrop-blur-xl
             transition-all duration-300 ease-in-out"
          >
            <p className="text-muted-foreground text-sm tracking-wide">
              WELCOME BACK
            </p>

            <h2 className="text-2xl font-semibold text-white mt-2">Giridhar</h2>
          </div>
        </SidebarHeader>
      )}

      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
