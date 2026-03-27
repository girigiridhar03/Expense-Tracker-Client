import { ChartPieDonutText } from "@/components/DashboardComponents/ChartPieDonutText";
import MetricCard from "@/components/DashboardComponents/MetricCard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Activity, MoveDownRight } from "lucide-react";

const Dashboard = () => {
  return (
    <section>
      <div className="grid grid-cols-4 gap-8">
        <MetricCard name={"Total Spent"} icon={MoveDownRight} amount={30000} />
        <MetricCard name={"Total Spent"} icon={MoveDownRight} amount={30000} />
        <MetricCard name={"Total Spent"} icon={MoveDownRight} amount={30000} />
        <MetricCard name={"Total Spent"} icon={MoveDownRight} amount={30000} />
      </div>

      <div className="grid grid-cols-[2fr_1fr] gap-10 mt-10">
        <Card
          className="p-5 group bg-linear-to-b from-white/5 to-white/2
             ring-1 ring-white/10
             border border-white/10
             shadow-[0_0_30px_rgba(0,0,0,0.3)]
             backdrop-blur-xl
             transition-all duration-300 ease-in relative hover:border hover:border-ring"
        >
          <CardHeader className="flex items-center gap-3">
            <span className="text-ring">
              <Activity />
            </span>
            <span className="font-semibold text-lg">Budget Overview</span>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <p className="text-3xl">₹30,000</p>
                <p className="opacity-50">of ₹40,000 limit</p>
              </div>
              <div className="flex flex-col gap-1 items-end">
                <p className="text-ring text-3xl font-semibold">76%</p>
                <p className="opacity-50">spent </p>
              </div>
            </div>
            <div className="w-full my-7">
              <Progress
                value={50}
                className="bg-linear-b bg-accentbg-linear-to-b from-white/10 to-transparent ring-1 ring-white/10 bg-sidebar-accent"
              />
            </div>
            <Separator />
            <div className="my-3 flex flex-col gap-1">
              <p className="opacity-50 text-[1rem]">Allocated to Categories</p>
              <p className="font-semibold text-[0.95rem]">₹19,000</p>
            </div>
          </CardContent>
        </Card>
        <ChartPieDonutText />
      </div>
    </section>
  );
};

export default Dashboard;
