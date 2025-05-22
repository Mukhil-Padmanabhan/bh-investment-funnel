"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  CartesianGrid
} from "recharts";
import { PortfolioItem } from "@/types/portfolio";

const COLORS = [
  "#0088FE", "#00C49F", "#FFBB28", "#FF8042",
  "#A28BE7", "#E85D75", "#8884d8", "#FF6361",
];

export function PortfolioChart({ data }: { data: PortfolioItem[] }) {
  if (!data || data.length === 0) {
    return <p className="text-sm text-muted-foreground">No data available.</p>;
  }

  const chartData = data.map((item) => ({
    name: item.name.length > 12 ? item.name.slice(0, 12) + "…" : item.name,
    value: item.value,
    percentage: item.percentage,
  }));

  return (
    <ResponsiveContainer width="100%" height={380}>
      <BarChart
        data={chartData}
        margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          angle={-30}
          textAnchor="end"
          interval={0}
          height={70}
          tick={{ fontSize: 11 }}
        />
        <YAxis
          tickFormatter={(value) =>
            value >= 1_000_000
              ? `$${(value / 1_000_000).toFixed(1)}M`
              : `$${(value / 1_000).toFixed(0)}K`
          }
        />
        <Tooltip
          formatter={(value: number) =>
            `$${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
          }
        />
        <Legend verticalAlign="top" height={20} />
        <Bar dataKey="value" name="Value (USD)" radius={[4, 4, 0, 0]}>
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
