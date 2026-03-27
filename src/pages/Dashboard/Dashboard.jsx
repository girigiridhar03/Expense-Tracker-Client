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
import { Activity, MoveDownRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
  const dispatch = useDispatch();
  const {
    cardsLoading,
    budgetOverviewLoading,
    categoriesStatLoading,
    categoriesStatArr,
    budgetOverview,
    metricCardsObj,
  } = useSelector((state) => state.dashboardReducer);
  const [metricCardArr, setMetricCardArr] = useState([]);

  useEffect(() => {
    dispatch(getDashboardMetricCards());
    dispatch(getBudgetOverview());
    dispatch(getDashboardCategories());
  }, [dispatch]);

  useEffect(() => {
    if (!metricCardsObj) return;

    const arr = Object.keys(metricCardsObj)
      .filter((item) => item !== "percentage")
      .map((item) => ({ name: item, value: metricCardsObj[item] }));

    setMetricCardArr(arr);
  }, [metricCardsObj]);

  return (
    <section>
      <div className="grid grid-cols-4 gap-8">
        {metricCardArr?.map((item) => (
          <MetricCard
            key={item.name}
            name={item.name}
            amount={item.value}
            obj={metricCardsObj}
          />
        ))}
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
                <p className="text-3xl">
                  ₹{budgetOverview?.totalSpent?.toLocaleString("en-IN")}
                </p>
                <p className="opacity-50">
                  of ₹{budgetOverview?.amount?.toLocaleString("en-IN")} limit
                </p>
              </div>
              <div className="flex flex-col gap-1 items-end">
                <p className="text-ring text-3xl font-semibold">
                  {budgetOverview?.percentage}%
                </p>
                <p className="opacity-50">spent </p>
              </div>
            </div>
            <div className="w-full my-7">
              <Progress
                value={budgetOverview?.percentage}
                className="bg-linear-b bg-accentbg-linear-to-b from-white/10 to-transparent ring-1 ring-white/10 bg-sidebar-accent"
              />
            </div>
            <Separator />
            <div className="my-3 flex flex-col gap-1">
              <p className="opacity-50 text-[1rem]">Allocated to Categories</p>
              <p className="font-semibold text-[0.95rem]">
                ₹{budgetOverview?.allocatedAmount?.toLocaleString("en-IN")}
              </p>
            </div>
          </CardContent>
        </Card>
        <ChartPieDonutText data={categoriesStatArr} />
      </div>
    </section>
  );
};

export default Dashboard;
