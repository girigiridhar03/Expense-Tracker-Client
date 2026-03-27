import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  IndianRupee,
  PlusCircle,
  Wallet,
  Tag,
} from "lucide-react";
import { useSelector } from "react-redux";

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
      url: "/expenses",
      icon: <IndianRupee />,
    },
    {
      title: "Add Expense",
      url: "/add-expense",
      icon: <PlusCircle />,
    },
    {
      title: "Budgets",
      url: "/budgets",
      icon: <Wallet />,
    },
    {
      title: "Categories",
      url: "/categories",
      icon: <Tag />,
    },
  ],
};

export function AppSidebar({ ...props }) {
  const { state, isMobile, openMobile } = useSidebar();
  const isExpanded = isMobile ? openMobile : state === "expanded";
  const { user, authLoading } = useSelector((state) => state.authReducer);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded
            ? "max-h-40 translate-y-0 opacity-100"
            : "pointer-events-none max-h-0 -translate-y-2 opacity-0 p-0"
        }`}
      >
        <div
          className={`rounded-2xl border border-white/10 bg-linear-to-b from-white/5 to-white/2 shadow-[0_0_30px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-all duration-300 ease-in-out ${
            isExpanded ? "scale-100 p-6" : "scale-95 p-0"
          }`}
        >
          <p className="text-muted-foreground text-sm tracking-wide">
            WELCOME BACK
          </p>

          <h2 className="mt-2 text-2xl font-semibold text-white">Giridhar</h2>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
