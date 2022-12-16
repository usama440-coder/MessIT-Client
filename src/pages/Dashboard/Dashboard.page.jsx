import "./Dashboard.page.css";
import Navbar from "../../components/Navbar/Navbar.component";
import StatsBox from "../../components/StatsBox/StatsBox.component";
import SectionBreak from "../../components/SectionBreak/SectionBreak.component";
import Greeting from "../../components/Greeting/Greeting.component";
import LineChart from "../../components/LineChart/LineChart.component";
import PieChart from "../../components/PieChart/PieChart.component";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Navbar />
      <div className="dashboardContainer">
        <div className="dashboardWrapper">
          <Greeting />
          <SectionBreak title="This month" />
          <div className="statsContainer">
            <StatsBox
              title="1500"
              description="Units Consumed"
              color="red"
              icon="chart"
            />
            <StatsBox
              title="Rs. 5000"
              description="Bill so far"
              color="purple"
              icon="bill"
            />
            <StatsBox
              title="16"
              description="Total Meals"
              color="green"
              icon="meal"
            />
          </div>
          <SectionBreak title="Comparison" />
          <div className="graphContainer">
            <div className="lineChart">
              <LineChart />
            </div>
            <div className="pieChart">
              <PieChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
