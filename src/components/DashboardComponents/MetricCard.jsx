import { Activity, ChartPie, MoveDownRight, Wallet } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";

const METRIC_NAME = {
  totalSpent: {
    name: "Total Spent",
    icon: MoveDownRight,
    showRupee: true,
  },
  monthlyBudget: {
    name: "Monthly Budget",
    icon: Wallet,
    showRupee: true,
  },
  remaining: {
    name: "Remaining",
    icon: Activity,
    showRupee: true,
  },
  categoriesUsed: {
    name: "Categories Used",
    icon: ChartPie,
    showRupee: false,
  },
};

const NumVal = ({ showRupee = false, percentage = null, val }) => {
  const value = Number(val || 0).toLocaleString("en-IN");

  if (showRupee && percentage !== null) {
    return (
      <p className="flex items-center gap-2">
        <span className="text-3xl font-semibold text-white">₹{value}</span>
        <span
          className={`text-sm font-medium ${
            percentage > 0 ? "text-emerald-300" : "text-rose-300"
          }`}
        >
          {percentage > 0 ? `+${percentage}%` : `${percentage}%`}
        </span>
      </p>
    );
  }

  if (showRupee) {
    return <p className="text-3xl font-semibold text-white">₹{value}</p>;
  }

  return <p className="text-3xl font-semibold text-white">{value}</p>;
};

const MetricCard = ({ name, amount, obj }) => {
  const Icon = METRIC_NAME?.[name]?.icon || ChartPie;
  const cardName = METRIC_NAME?.[name]?.name || "Unknown";

  return (
    <Card className="glass-panel group relative overflow-hidden rounded-[28px] border p-1 transition-all duration-300 ease-in hover:-translate-y-1">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(56,189,248,0.08),transparent_35%,rgba(45,212,191,0.06))]" />

      <Icon className="absolute top-3 right-4 h-20 w-20 text-sky-100 opacity-[0.06] transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:translate-y-1 group-hover:rotate-6" />

      <CardHeader className="relative flex flex-row items-center gap-3 pb-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-sky-300/10 bg-sky-400/10 text-sky-300 shadow-lg shadow-black/10">
          <Icon className="h-5 w-5" />
        </span>
        <span className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">
          {cardName}
        </span>
      </CardHeader>

      <CardContent className="relative flex flex-col gap-2 pb-6">
        {name !== "remaining" ? (
          <NumVal showRupee={METRIC_NAME?.[name]?.showRupee} val={amount} />
        ) : (
          <NumVal
            showRupee={METRIC_NAME?.[name]?.showRupee}
            percentage={obj?.percentage || 0}
            val={amount}
          />
        )}

        {name === "totalSpent" && obj?.totalTransactions > 0 ? (
          <p className="text-[0.85rem] text-slate-400">
            {obj?.totalTransactions} transactions this month
          </p>
        ) : (
          <p className="text-[0.85rem] text-slate-400">
            Updated from your dashboard metrics endpoint.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default MetricCard;
