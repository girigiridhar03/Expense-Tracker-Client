import { Activity, ChartPie, MoveDownRight, Wallet } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";


const METRIC_NAME = {
  totalSpent: {
    name: "Total Spent",
    icon: MoveDownRight,
  },
  monthlyBudget: {
    name: "Monthly Budget",
    icon: Wallet,
  },
  remaining: {
    name: "Remaining",
    icon: Activity,
  },
  categoriesUsed: {
    name: "Categories Used",
    icon: ChartPie,
  },
};

const MetricCard = ({ name, icon: Icon, amount }) => {
  return (
    <Card
      className="group bg-linear-to-b from-white/5 to-white/2
             ring-1 ring-white/10
             border border-white/10
             shadow-[0_0_30px_rgba(0,0,0,0.3)]
             backdrop-blur-xl
             transition-all duration-300 ease-in relative hover:border hover:border-ring"
    >
      <Icon
        className="h-20 w-20 opacity-20 absolute top-3 right-4 
             transition-all duration-300 ease-out
             group-hover:translate-x-1 group-hover:translate-y-1 
             group-hover:rotate-6"
      />
      <CardHeader className="flex items-center gap-2.5">
        <span className="text-primary bg-[#242428] h-8 w-8 rounded flex items-center justify-center">
          <Icon className="h-6 w-6" />
        </span>
        <span className="text-secondary">{name}</span>
      </CardHeader>
      <CardContent className="flex flex-col gap-1.5">
        <p className="text-3xl">₹{amount}</p>
        <p className="text-[0.8rem]">5 transactions this month</p>
      </CardContent>
    </Card>
  );
};

export default MetricCard;
