import "./Dashboard.page.css";
import Navbar from "../../components/Navbar/Navbar.component";
import StatsBox from "../../components/StatsBox/StatsBox.component";
import SectionBreak from "../../components/SectionBreak/SectionBreak.component";
import Greeting from "../../components/Greeting/Greeting.component";
import UserLineChart from "../../components/LineChart/UserLineChart.component";
import SecretaryLineChart from "../../components/LineChart/SecretaryLineChart.component";
import CashierLineChart from "../../components/LineChart/CashierLineChart.component";
import UserPieChart from "../../components/PieChart/UserPieChart.component";
import statsService from "../../services/statsService";
import { useState, useEffect } from "react";
import Loader from "../../components/Loders";
import { useSelector } from "react-redux";
import AdminPieChart from "../../components/PieChart/AdminPieChart.component";

const Dashboard = () => {
  const token = useSelector((state) => state.auth.user.token);
  const role = useSelector((state) => state.auth.role);
  const [loading, setLoading] = useState(false);

  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (role === "admin") {
          const res = await statsService.getAdminStats(token);
          setStats({
            totalUsers: res?.data?.totalUsers || 0,
            activeUsers: res?.data?.activeUsers || 0,
            inactiveUsers: res?.data?.inactiveUsers || 0,
            usersMessData: {
              totalUsers: res?.data?.usersMessData?.map(
                (data) => data?.totalUsers
              ),
              mess: res?.data?.usersMessData?.map((data) => data?.mess),
            },
          });
        }
        if (role === "user") {
          const res = await statsService.getUserStats(token);
          setStats({
            totalUnits: res?.data?.totalUnits[0]?.totalUnits || 0,
            totalMeals: res?.data?.totalMeals,
            balance: res?.data?.balance?.balance || 0,
            bills: {
              months: res?.data?.bills?.map((item) => {
                return new Date(item?.createdAt).toLocaleString("en-US", {
                  month: "short",
                  year: "numeric",
                });
              }),
              totalUnits: res?.data?.bills?.map((item) => {
                return item?.totalUnits;
              }),
              totalBill: res?.data?.bills?.map((item) => {
                return item?.netAmount;
              }),
            },
            mealTypes: {
              type: res?.data?.mealTypes?.map((item) => {
                return item?._id;
              }),
              total: res?.data?.mealTypes.map((item) => {
                return item?.count;
              }),
            },
          });
        }
        if (role === "secretary" || role === "staff") {
          const res = await statsService.getSecretaryStats(token);
          setStats({
            totalUnits: res?.data?.totalUnits[0]?.totalUnits || 0,
            totalMeals: res?.data?.totalMeals || 0,
            lastSixMonthsUnits: {
              months: res?.data?.lastSixMonthsUnits?.map((item) => {
                return new Date(item?.Month).toLocaleString("en-US", {
                  month: "short",
                  year: "numeric",
                });
              }),
              totalUnits: res?.data?.lastSixMonthsUnits?.map((item) => {
                return item?.totalUnits;
              }),
            },
            mealTypes: {
              type: res?.data?.mealTypes?.map((item) => {
                return item?._id;
              }),
              total: res?.data?.mealTypes.map((item) => {
                return item?.count;
              }),
            },
          });
        }

        if (role === "cashier") {
          const res = await statsService.getCashierStats(token);
          setStats({
            unpaidBills: res?.data?.unpaidBills || 0,
            paidBills: res?.data?.paidBills || 0,
            lastSixMonthsBills: {
              months: res?.data?.lastSixMonthsBills?.map((item) => {
                return new Date(item?.Month).toLocaleString("en-US", {
                  month: "short",
                  year: "numeric",
                });
              }),
              totalBill: res?.data?.lastSixMonthsBills?.map((item) => {
                return item?.totalBill;
              }),
            },
            remainingBill: res?.data?.collectedBill[0]?.total || 0,
            collectedBill: res?.data?.collectedBill[1]?.total || 0,
          });
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    fetchData();
  }, [token, role]);

  return (
    <div className="dashboard">
      <Navbar />
      <div className="dashboardContainer">
        <div className="dashboardWrapper">
          <Greeting />
          {role === "admin" ? (
            <SectionBreak title="Stats" />
          ) : (
            <SectionBreak title="This month" />
          )}
          {loading ? (
            <Loader />
          ) : (
            <>
              <div className="statsContainer">
                {role === "admin" ? (
                  <>
                    <StatsBox
                      title={stats.totalUsers}
                      description="Total Users"
                      color="purple"
                      icon="users"
                    />
                    <StatsBox
                      title={stats.activeUsers}
                      description="Active Users"
                      color="green"
                      icon="users"
                    />
                    <StatsBox
                      title={stats.inactiveUsers}
                      description="Inactive Users"
                      color="red"
                      icon="usersSlash"
                    />
                  </>
                ) : (
                  ""
                )}

                {role === "user" ? (
                  <>
                    <StatsBox
                      title={stats.totalUnits}
                      description="Units Consumed"
                      color="red"
                      icon="chart"
                    />
                    <StatsBox
                      title={`Rs. ${stats.balance}`}
                      description="Balance"
                      color="purple"
                      icon="bill"
                    />
                    <StatsBox
                      title={stats.totalMeals}
                      description="Total Meals"
                      color="green"
                      icon="meal"
                    />
                  </>
                ) : (
                  ""
                )}

                {role === "secretary" || role === "staff" ? (
                  <>
                    <StatsBox
                      title={stats.totalUnits}
                      description="Units Consumed"
                      color="red"
                      icon="chart"
                    />
                    <StatsBox
                      title={stats.totalMeals}
                      description="Total Meals"
                      color="green"
                      icon="meal"
                    />
                  </>
                ) : (
                  ""
                )}

                {role === "cashier" ? (
                  <>
                    <>
                      <StatsBox
                        title={stats.unpaidBills}
                        description="Unpaid Bills"
                        color="red"
                        icon="bill"
                      />
                      <StatsBox
                        title={stats.paidBills}
                        description="Paid Bills"
                        color="green"
                        icon="bill"
                      />
                    </>
                  </>
                ) : (
                  ""
                )}
              </div>

              <SectionBreak title="Comparison" />

              <div className="graphContainer">
                {role === "user" ? (
                  <>
                    <div className="lineChart">
                      <UserLineChart chartData={stats.bills} />
                    </div>
                    <div className="pieChart">
                      <UserPieChart chartData={stats.mealTypes} />
                    </div>
                  </>
                ) : (
                  ""
                )}

                {role === "secretary" || role === "staff" ? (
                  <>
                    <div className="lineChart">
                      <SecretaryLineChart
                        chartData={stats.lastSixMonthsUnits}
                      />
                    </div>
                    <div className="pieChart">
                      <UserPieChart chartData={stats.mealTypes} />
                    </div>
                  </>
                ) : (
                  ""
                )}
                {role === "admin" ? (
                  <div className="pieChart adminPie">
                    <AdminPieChart chartData={stats.usersMessData} />
                  </div>
                ) : (
                  ""
                )}

                {role === "cashier" ? (
                  <div className="lineChart">
                    <CashierLineChart chartData={stats.lastSixMonthsBills} />
                  </div>
                ) : (
                  ""
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
