import "./Greeting.component.css";
import { useSelector } from "react-redux";

const Greeting = () => {
  const user = useSelector((state) => state.auth.user.user);
  let greeting;
  const hour = new Date().getHours();
  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 18) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

  return (
    <div className="header">
      <h2 className="headerGreeting">{`${greeting} ${
        user.name.split(" ")[0]
      }!`}</h2>
      <p className="headerRole">{user.role}</p>
    </div>
  );
};

export default Greeting;
