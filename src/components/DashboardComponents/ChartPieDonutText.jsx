import * as React from "react";
import { ChartPie, Dot } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export function ChartPieDonutText({ data = [] }) {
  const chartData = React.useMemo(() => {
    if (!data?.length) return [];

    return data.map((item) => ({
      label: item.name,
      value: item.totalAmount,
      fill: item.color,
    }));
  }, [data]);

  const totalVisitors = React.useMemo(
    () => chartData.reduce((acc, curr) => acc + curr.value, 0),
    [chartData],
  );

  const chartConfig = React.useMemo(() => {
    const config = {
      value: { label: "Amount" },
    };

    chartData.forEach((item) => {
      config[item.label] = {
        label: item.label,
        color: item.fill,
      };
    });

    return config;
  }, [chartData]);

  if (!chartData.length) {
    return (
      <Card className="glass-panel flex h-62.5 items-center justify-center rounded-[30px] border">
        <p className="text-muted-foreground">No data available</p>
      </Card>
    );
  }

  return (
    <Card className="glass-panel relative flex flex-col rounded-[30px] border p-1 transition-all duration-300 ease-in hover:-translate-y-1">
      <CardHeader className="items-center pb-0">
        <CardTitle className="flex items-center gap-3 text-white">
          <span className="rounded-2xl bg-sky-400/10 p-3 text-sky-300">
            <ChartPie />
          </span>
          <span className="text-lg font-semibold">Spending by Category</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-5 pb-6">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-62"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />

            <Pie
              data={chartData}
              dataKey="value"
              nameKey="label"
              innerRadius={70}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          ₹{totalVisitors.toLocaleString("en-IN")}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy + 24}
                          className="fill-muted-foreground"
                        >
                          Total
                        </tspan>
                      </text>
                    );
                  }

                  return null;
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>

        <div className="grid gap-3">
          {chartData.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between rounded-2xl border border-white/6 bg-white/[0.03] px-4 py-3"
            >
              <div className="flex items-center gap-2 text-sm font-medium text-slate-300">
                <Dot className="h-5 w-5" style={{ color: item.fill }} />
                <span>{item.label}</span>
              </div>
              <span className="text-sm font-semibold text-white">
                ₹{item.value.toLocaleString("en-IN")}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
