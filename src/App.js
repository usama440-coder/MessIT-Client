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
import UserMeals from "./pages/UserMeals/UserMeals.page";
import Receipt from "./pages/Receipt/Receipt";
import Reset from "./pages/Reset/Reset.page";
import Review from "./pages/Review/Review.page";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route
            index
            element={
              <Protected
                redirectedPath={"/login"}
                allowedRole={["user", "admin", "cashier", "secretary", "staff"]}
              >
                <Dashboard />
              </Protected>
            }
          ></Route>
          <Route
            path="/review"
            element={
              <Protected
                redirectedPath={"/login"}
                allowedRole={["user", "secretary", "staff"]}
              >
                <Review />
              </Protected>
            }
          ></Route>
          <Route
            path="/meal"
            element={
              <Protected
                redirectedPath={"/login"}
                allowedRole={["user", "secretary", "staff"]}
              >
                <Meal />
              </Protected>
            }
          ></Route>
          <Route
            path="/users"
            element={
              <Protected redirectedPath={"/login"} allowedRole={["admin"]}>
                <Users />
              </Protected>
            }
          ></Route>
          <Route
            path="/menu"
            element={
              <Protected
                redirectedPath={"/login"}
                allowedRole={["user", "secretary", "staff"]}
              >
                <Menu />
              </Protected>
            }
          ></Route>
          <Route
            path="/items"
            element={
              <Protected
                redirectedPath={"/login"}
                allowedRole={["user", "secretary", "staff"]}
              >
                <Items />
              </Protected>
            }
          ></Route>
          <Route
            path="/profile"
            element={
              <Protected
                redirectedPath={"/login"}
                allowedRole={["user", "admin", "cashier", "secretary", "staff"]}
              >
                <Profile />
              </Protected>
            }
          ></Route>
          <Route
            path="/billing"
            element={
              <Protected
                redirectedPath={"/login"}
                allowedRole={["user", "cashier", "secretary", "staff"]}
              >
                <Billing />
              </Protected>
            }
          ></Route>
          <Route
            path="/about"
            element={
              <Protected
                redirectedPath={"/login"}
                allowedRole={["user", "admin", "cashier", "secretary", "staff"]}
              >
                <About />
              </Protected>
            }
          ></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="/mess"
            element={
              <Protected redirectedPath={"/login"} allowedRole={["admin"]}>
                <Mess />
              </Protected>
            }
          ></Route>
          <Route
            path="/userMeals/:id"
            element={
              <Protected
                redirectedPath={"/login"}
                allowedRole={["user", "cashier", "secretary", "staff"]}
              >
                <UserMeals />
              </Protected>
            }
          ></Route>
          <Route
            path="/receipt/:id"
            element={
              <Protected
                redirectedPath={"/login"}
                allowedRole={["user", "cashier", "secretary", "staff"]}
              >
                <Receipt />
              </Protected>
            }
          ></Route>
          <Route path="/reset-password" element={<Reset />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
