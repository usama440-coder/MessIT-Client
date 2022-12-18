import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Meal from "./pages/Meal/Meal.page";
import Dashboard from "./pages/Dashboard/Dashboard.page";
import Users from "./pages/Users/Users.page";
import Menu from "./pages/Menu/Menu.page";
import Items from "./pages/Items/Items.page";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Dashboard />}></Route>
          <Route path="/meal" element={<Meal />}></Route>
          <Route path="/users" element={<Users />}></Route>
          <Route path="/menu" element={<Menu />}></Route>
          <Route path="/items" element={<Items />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
