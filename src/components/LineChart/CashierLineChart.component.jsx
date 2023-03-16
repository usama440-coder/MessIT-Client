import ReactApexChart from "react-apexcharts";
import React from "react";

class CashierLineChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [
        {
          name: "Bills",
          data: props?.chartData?.totalBill || [],
        },
      ],
      options: {
        chart: {
          type: "bar",
          height: 350,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            endingShape: "rounded",
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {
          categories: props?.chartData?.months || [],
        },
        fill: {
          opacity: 1,
        },
      },
    };
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="bar"
          height={350}
        />
      </div>
    );
  }
}

export default CashierLineChart;
