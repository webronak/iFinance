import type { ChartData, ChartOptions } from "chart.js";

export interface ChartProps {
  data: ChartData<"bar">;
  title: string;
}
