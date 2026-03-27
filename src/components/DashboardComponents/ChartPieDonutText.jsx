import * as React from "react";
import { ChartPie } from "lucide-react";
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
      browser: item.name,
      visitors: item.totalAmount,
      fill: item.color,
    }));
  }, [data]);


  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, [chartData]);


  const chartConfig = React.useMemo(() => {
    const config = {
      visitors: { label: "Amount" },
    };

    chartData.forEach((item) => {
      config[item.browser] = {
        label: item.browser,
        color: item.fill,
      };
    });

    return config;
  }, [chartData]);


  if (!chartData.length) {
    return (
      <Card className="flex items-center justify-center h-[250px]">
        <p className="text-muted-foreground">No data available</p>
      </Card>
    );
  }

  return (
    <Card
      className="flex flex-col group bg-linear-to-b from-white/5 to-white/2
      ring-1 ring-white/10 border border-white/10
      shadow-[0_0_30px_rgba(0,0,0,0.3)]
      backdrop-blur-xl transition-all duration-300 ease-in
      relative hover:border hover:border-ring"
    >
      <CardHeader className="items-center pb-0">
        <CardTitle className="flex items-center gap-3">
          <span className="text-ring">
            <ChartPie />
          </span>
          <span className="font-semibold text-lg">Spending by Category</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
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
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
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
                        {/* Total */}
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>

                        {/* Label */}
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
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
