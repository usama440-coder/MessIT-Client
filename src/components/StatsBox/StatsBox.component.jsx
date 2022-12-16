import "./StatsBox.component.css";
import { FaChartLine, FaMoneyCheckAlt, FaUtensils } from "react-icons/fa";

const StatsBox = ({ title, description, color, icon }) => {
  return (
    <div className={`statsItem ${color}Border`}>
      <div className="statsItemContent">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      {icon === "chart" ? (
        <FaChartLine className={`statsIcon ${color}`} />
      ) : icon === "bill" ? (
        <FaMoneyCheckAlt className={`statsIcon ${color}`} />
      ) : icon === "meal" ? (
        <FaUtensils className={`statsIcon ${color}`} />
      ) : (
        ""
      )}
    </div>
  );
};

export default StatsBox;
