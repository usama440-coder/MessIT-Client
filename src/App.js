import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Meal from "./pages/Meal/Meal.page";
import Dashboard from "./pages/Dashboard/Dashboard.page";
import Users from "./pages/Users/Users.page";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Dashboard />}></Route>
          <Route path="/meal" element={<Meal />}></Route>
          <Route path="/users" element={<Users />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
