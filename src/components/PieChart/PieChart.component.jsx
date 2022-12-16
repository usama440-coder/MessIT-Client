import "./PieChart.component.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  animation: {
    duration: 1000,
    easing: "linear",
  },
  layout: {
    padding: 10,
  },
  plugins: {
    title: {
      display: true,
      text: "Meal categorization this month",
      //   padding: 10,
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
        font: {
          size: 12,
          family: "'Roboto', sans-serif",
        },
      },
    },
  },
};

export const data = {
  labels: ["Breakfast", "Lunch", "Dinner", "Others"],
  datasets: [
    {
      label: "Meal type this month",
      data: [12, 19, 3, 5],
      backgroundColor: ["#1D4977", "#5490CF", "#8CB5DD", "#C6D9EE"],
      borderColor: ["#ffffff"],
      borderWidth: 1,
    },
  ],
};
const PieChart = () => {
  return <Doughnut className="pie" data={data} options={options} />;
};

export default PieChart;
