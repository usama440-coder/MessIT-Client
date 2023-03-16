import ReactApexChart from "react-apexcharts";
import React from "react";

class UserPieChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: props?.chartData?.total || [],
      chartOptions: {
        labels: props?.chartData?.type || [],
      },
      options: {
        chart: {
          type: "donut",
        },
        legend: {
          position: "bottom",
        },
        labels: props?.chartData?.type || [],
      },
    };
  }

  render() {
    return (
      <div id="chart" className="pieChart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="donut"
        />
      </div>
    );
  }
}

export default UserPieChart;
