import React, { FC } from "react";
import { Bar } from "react-chartjs-2";
import { ChartProps } from "./types";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const innitailData = {
  labels: [],
  datasets: [
    {
      id: 1,
      label: "Amount",
      data: [],
      backgroundColor: ["rgba(255, 99, 132, 0.5)"],
    },
  ],
};

const BarGraph: FC<ChartProps> = ({ data = innitailData, title }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarGraph;
