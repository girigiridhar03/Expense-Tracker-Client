import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

export function NavMain({ items }) {
  const { pathname } = useLocation();
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <Link key={`${item.title}-${item.url}`} to={item.url}>
            <SidebarMenuButton
              tooltip={item.title}
              className={cn(
                "group/item mb-2 h-12 rounded-2xl px-4 text-lg text-slate-200 transition-all duration-300",
                item.url === pathname
                  ? "bg-linear-to-r from-sky-400/18 to-emerald-300/10 ring-1 ring-sky-300/20 shadow-[0_10px_30px_rgba(14,165,233,0.14)]"
                  : "hover:bg-linear-to-r hover:from-white/10 hover:to-transparent hover:ring-1 hover:ring-white/10",
              )}
            >
              <span
                className={cn(
                  item.url === pathname && "text-sky-300",
                  "group-hover/item:text-sky-200",
                )}
              >
                {item.icon}
              </span>

              <span>{item.title}</span>
            </SidebarMenuButton>
          </Link>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
