import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Meal from "./pages/Meal/Meal.page";
import Dashboard from "./pages/Dashboard/Dashboard.page";
import Users from "./pages/Users/Users.page";
import Menu from "./pages/Menu/Menu.page";
import Items from "./pages/Items/Items.page";
import Profile from "./pages/Profile/Profile.page";
import Billing from "./pages/Billing/Billing.page";
import About from "./pages/About/About.page";
import Login from "./pages/Login/Login.page";
import Mess from "./pages/Mess/Mess.page";
import Protected from "./components/Protected";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route
            index
            element={
              <Protected redirectedPath={"/login"}>
                <Dashboard />
              </Protected>
            }
          ></Route>
          <Route path="/meal" element={<Meal />}></Route>
          <Route path="/users" element={<Users />}></Route>
          <Route path="/menu" element={<Menu />}></Route>
          <Route path="/items" element={<Items />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/billing" element={<Billing />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/mess" element={<Mess />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
