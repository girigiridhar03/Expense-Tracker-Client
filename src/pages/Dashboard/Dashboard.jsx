import { ChartPieDonutText } from "@/components/DashboardComponents/ChartPieDonutText";
import MetricCard from "@/components/DashboardComponents/MetricCard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  getBudgetOverview,
  getDashboardCategories,
  getDashboardMetricCards,
} from "@/store/Dashboard/dashboard.service";
import { Activity, ArrowUpRight, TrendingUp } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { categoriesStatArr, budgetOverview, metricCardsObj } = useSelector(
    (state) => state.dashboardReducer,
  );

  useEffect(() => {
    dispatch(getDashboardMetricCards());
    dispatch(getBudgetOverview());
    dispatch(getDashboardCategories());
  }, [dispatch]);

  const metricCardArr = useMemo(() => {
    if (!metricCardsObj) return [];
    const excludedKeys = ["percentage", "totalTransactions"];

    return Object.keys(metricCardsObj)
      .filter((item) => !excludedKeys.includes(item))
      .map((item) => ({ name: item, value: metricCardsObj[item] }));
  }, [metricCardsObj]);

  const hasCategoryData = categoriesStatArr?.length > 0;

  return (
    <section className="space-y-8">
      <div className="relative overflow-hidden rounded-[34px] border border-white/8 bg-[linear-gradient(135deg,rgba(8,47,73,0.9),rgba(15,23,42,0.96)_42%,rgba(17,24,39,0.98))] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.35)] md:p-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(45,212,191,0.12),transparent_22%)]" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-300/15 bg-sky-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-sky-200">
              <TrendingUp className="h-3.5 w-3.5" />
              Executive summary
            </div>
            <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-white md:text-5xl">
              Strong financial control starts with a dashboard that is easy to read.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300/80">
              Review monthly movement, budget pressure, and category concentration
              from one dark workspace designed to feel clean and operational.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[26px] border border-white/8 bg-white/[0.05] px-5 py-4 text-white backdrop-blur-xl">
              <p className="text-sm text-slate-400">Budget usage</p>
              <p className="mt-2 flex items-center gap-2 text-3xl font-semibold">
                {budgetOverview?.percentage || 0}%
                <ArrowUpRight className="h-5 w-5 text-emerald-300" />
              </p>
            </div>
            <div className="rounded-[26px] border border-white/8 bg-slate-950/65 px-5 py-4 text-white">
              <p className="text-sm text-slate-400">Total spent</p>
              <p className="mt-2 text-3xl font-semibold">
                ₹{(budgetOverview?.totalSpent || 0).toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {metricCardArr?.map((item) => (
          <MetricCard
            key={item.name}
            name={item.name}
            amount={item.value}
            obj={metricCardsObj}
          />
        ))}
      </div>

      <div
        className={`grid gap-6 ${
          hasCategoryData ? "dashboard-grid" : "grid-cols-1"
        }`}
      >
        <Card className="glass-panel group relative rounded-[30px] border p-5 transition-all duration-300 ease-in hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="rounded-2xl bg-sky-400/12 p-3 text-sky-300">
                <Activity />
              </span>
              <div>
                <span className="text-lg font-semibold text-white">
                  Budget Overview
                </span>
                <p className="text-sm text-slate-400">
                  Monthly limit, current spend, and remaining room.
                </p>
              </div>
            </div>
            <span className="rounded-full border border-emerald-300/12 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-200">
              Live
            </span>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-[24px] border border-white/8 bg-slate-950/70 p-6 text-slate-50">
                <p className="text-sm text-slate-400">Spent so far</p>
                <p className="mt-2 text-4xl font-semibold">
                  ₹{(budgetOverview?.totalSpent || 0).toLocaleString("en-IN")}
                </p>
                <p className="mt-2 text-sm text-slate-300/70">
                  of ₹{(budgetOverview?.amount || 0).toLocaleString("en-IN")} monthly limit
                </p>
              </div>

              <div className="grid gap-4">
                <div className="rounded-[24px] border border-sky-300/10 bg-sky-400/8 p-5">
                  <p className="text-sm font-medium text-slate-400">
                    Allocated to categories
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-white">
                    ₹
                    {(budgetOverview?.allocatedAmount || 0).toLocaleString(
                      "en-IN",
                    )}
                  </p>
                </div>
                <div className="rounded-[24px] border border-emerald-300/10 bg-emerald-400/8 p-5">
                  <p className="text-sm font-medium text-emerald-200/85">
                    Budget used
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-emerald-100">
                    {budgetOverview?.percentage || 0}%
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full">
              <div className="mb-3 flex items-center justify-between text-sm text-slate-400">
                <span>Progress</span>
                <span>{budgetOverview?.percentage || 0}% spent</span>
              </div>
              <Progress
                value={budgetOverview?.percentage || 0}
                className="h-3 bg-slate-800"
              />
            </div>

            <Separator className="bg-white/8" />

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/6 bg-white/[0.03] p-4">
                <p className="text-sm text-slate-400">Total budget</p>
                <p className="mt-2 text-xl font-semibold text-white">
                  ₹{(budgetOverview?.amount || 0).toLocaleString("en-IN")}
                </p>
              </div>
              <div className="rounded-2xl border border-white/6 bg-white/[0.03] p-4">
                <p className="text-sm text-slate-400">Current spend</p>
                <p className="mt-2 text-xl font-semibold text-white">
                  ₹{(budgetOverview?.totalSpent || 0).toLocaleString("en-IN")}
                </p>
              </div>
              <div className="rounded-2xl border border-white/6 bg-white/[0.03] p-4">
                <p className="text-sm text-slate-400">Remaining estimate</p>
                <p className="mt-2 text-xl font-semibold text-white">
                  ₹
                  {Math.max(
                    (budgetOverview?.amount || 0) -
                      (budgetOverview?.totalSpent || 0),
                    0,
                  ).toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {hasCategoryData && <ChartPieDonutText data={categoriesStatArr} />}
      </div>
    </section>
  );
};

export default Dashboard;
