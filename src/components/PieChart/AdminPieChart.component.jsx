import ReactApexChart from "react-apexcharts";
import React from "react";

class AdminPieChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: props?.chartData?.totalUsers || [],
      chartOptions: {
        labels: props?.chartData?.mess || [],
      },
      options: {
        chart: {
          type: "donut",
        },
        legend: {
          position: "bottom",
        },
        labels: props?.chartData?.mess || [],
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

export default AdminPieChart;
