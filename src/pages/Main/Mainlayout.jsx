import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Bell } from "lucide-react";
import { useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";

const Mainlayout = () => {
  const { pathname } = useLocation();

  const pageMeta = useMemo(() => {
    const meta = {
      "/": {
        title: "Financial Overview",
        description:
          "Monitor budgets, trends, and category performance in one place.",
      },
      "/expenses": {
        title: "Transactions",
        description:
          "Review your expense activity and spot spending patterns quickly.",
      },
      "/add-expense": {
        title: "Add Expense",
        description:
          "Capture new spending with clean inputs and instant feedback.",
      },
    };

    return (
      meta[pathname] || {
        title: "Expense Tracker",
        description: "Stay on top of your finances with a focused workspace.",
      }
    );
  }, [pathname]);

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset className="app-shell">
        <header className="sticky top-0 z-20 flex shrink-0 items-center gap-2 border-b border-white/6 bg-slate-950/55 px-4 py-4 backdrop-blur-xl transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-6">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <SidebarTrigger className="-ml-1 text-slate-200 hover:bg-white/6" />
            <Separator
              orientation="vertical"
              className="mr-1 hidden bg-white/10 data-[orientation=vertical]:h-5 sm:block"
            />
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-300/80">
                Expense Tracker
              </p>
              <h1 className="truncate text-xl font-semibold text-white">
                {pageMeta.title}
              </h1>
            </div>
          </div>

          <button className="glass-panel flex h-11 w-11 items-center justify-center rounded-full border text-slate-300 transition hover:-translate-y-0.5 hover:text-sky-300">
            <Bell className="h-5 w-5" />
          </button>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
          <div className="glass-panel rounded-[28px] border p-5 md:p-7">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">
                  Track, plan, and move with confidence
                </p>
                <p className="mt-1 max-w-2xl text-sm text-slate-500">
                  {pageMeta.description}
                </p>
              </div>
              <div className="rounded-2xl border border-sky-400/15 bg-sky-400/10 px-4 py-3 text-sm text-sky-100 shadow-lg shadow-sky-950/10">
                Daily focus: keep entries updated and review budget drift early.
              </div>
            </div>
          </div>

          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Mainlayout;
