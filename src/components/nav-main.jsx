import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";

export function NavMain({ items }) {
  const { pathname } = useLocation();
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuButton
            key={item.url}
            tooltip={item.title}
            className={cn(
              "group/item h-12 mb-2 px-4 text-lg rounded-xl transition-all duration-300",
              item.url === pathname
                ? "bg-linear-to-b from-white/10 to-transparent ring-1 ring-white/10 bg-sidebar-accent"
                : "hover:bg-linear-to-b hover:from-white/10 hover:to-transparent hover:ring-1 hover:ring-white/10",
            )}
          >
            <span
              className={cn(
                item.url === pathname && "text-accent-foreground",
                "group-hover/item:text-accent-foreground",
              )}
            >
              {item.icon}
            </span>

            <span>{item.title}</span>
          </SidebarMenuButton>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
