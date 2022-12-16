import "./LineChart.component.css";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  animation: {
    duration: 1000,
    easing: "linear",
  },
  plugins: {
    title: {
      display: true,
      text: "Weekly units consumed",
      font: {
        family: "'Exo 2', sans-serif",
        size: 16,
        weight: 500,
      },
    },
    legend: {
      position: "bottom",
      labels: {
        boxWidth: 20,
        boxHeight: 5,
        border: 0,
        font: {
          size: 12,
          family: "'Roboto', sans-serif",
        },
      },
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Last 10 Weeks",
      data: [100, 200, 120, 300, 190, 450, 300],
      borderColor: "#877eaa",
      backgroundColor: "#5A45AA",
    },
  ],
};

const LineChart = () => {
  return <Line className="line" data={data} options={options} />;
};

export default LineChart;
