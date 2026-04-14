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
  IndianRupee,
  LayoutDashboard,
  PlusCircle,
} from "lucide-react";
import { useSelector } from "react-redux";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: <LayoutDashboard />,
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
  ],
};

export function AppSidebar({ ...props }) {
  const { state, isMobile, openMobile } = useSidebar();
  const isExpanded = isMobile ? openMobile : state === "expanded";
  const { user } = useSelector((state) => state.authReducer);

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-slate-200/70 bg-[linear-gradient(180deg,#06131f_0%,#0f172a_58%,#111827_100%)] text-slate-100"
      {...props}
    >
      <SidebarHeader
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded
            ? "max-h-48 translate-y-0 opacity-100"
            : "pointer-events-none max-h-0 -translate-y-2 opacity-0 p-0"
        }`}
      >
        <div
          className={`rounded-[26px] border border-white/10 bg-linear-to-br from-sky-400/15 via-white/5 to-emerald-300/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-all duration-300 ease-in-out ${
            isExpanded ? "scale-100 p-6" : "scale-95 p-0"
          }`}
        >
          <p className="text-sm tracking-[0.28em] text-slate-300/70">
            WELCOME BACK
          </p>

          <h2 className="mt-3 text-2xl font-semibold text-white">
            {user?.username || "Expense Pilot"}
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-300/75">
            Keep your money decisions clear, current, and measurable.
          </p>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user || {}} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
