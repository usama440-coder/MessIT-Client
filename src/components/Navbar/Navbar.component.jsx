import "./Navbar.component.css";
import { Link } from "react-router-dom";
import { AiFillDashboard } from "react-icons/ai";
import {
  FaUtensils,
  FaBars,
  FaInfoCircle,
  FaUser,
  FaUsers,
  FaMoneyCheckAlt,
  FaBox,
} from "react-icons/fa";
import { BiDish } from "react-icons/bi";
import { IoLogOut } from "react-icons/io5";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Scrollbars } from "react-custom-scrollbars-2";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const role = useSelector((state) => state.auth.role);

  return (
    <>
      <button className="toggleBtn" onClick={() => setShowMenu(!showMenu)}>
        Open
      </button>
      <div className={showMenu ? "navbar navbarMobile" : "navbar"}>
        <Scrollbars style={{ height: "100%" }} autoHide>
          <div className="navbarContainer">
            <div className="logo">
              <h2>MessIT</h2>
            </div>
            <div className="menuItemsContainer">
              <div className="menuItem active">
                <Link to="/" className="link">
                  <AiFillDashboard className="navIcon" />
                  <p className="navName">Dashboard</p>
                </Link>
              </div>
              {role === "admin" ? (
                <>
                  <div className="menuItem">
                    <Link to="/users" className="link">
                      <FaUsers className="navIcon" />
                      <p className="navName">Users</p>
                    </Link>
                  </div>
                  <div className="menuItem">
                    <Link to="/mess" className="link">
                      <BiDish className="navIcon" />
                      <p className="navName">Mess</p>
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  {role !== "cashier" ? (
                    <>
                      <div className="menuItem">
                        <Link to="/meal" className="link">
                          <FaUtensils className="navIcon" />
                          <p className="navName">Meal</p>
                        </Link>
                      </div>
                      <div className="menuItem ">
                        <Link to="/menu" className="link">
                          <FaBars className="navIcon" />
                          <p className="navName">Menu</p>
                        </Link>
                      </div>
                    </>
                  ) : (
                    ""
                  )}

                  <div className="menuItem">
                    <Link to="/items" className="link">
                      <FaBox className="navIcon" />
                      <p className="navName">Items</p>
                    </Link>
                  </div>
                  <div className="menuItem">
                    <Link to="/billing" className="link">
                      <FaMoneyCheckAlt className="navIcon" />
                      <p className="navName">Billing</p>
                    </Link>
                  </div>
                </>
              )}

              <div className="menuItem">
                <Link to="/profile/:id" className="link">
                  <FaUser className="navIcon" />
                  <p className="navName">Profile</p>
                </Link>
              </div>

              <div className="menuItem">
                <Link to="/about" className="link">
                  <FaInfoCircle className="navIcon" />
                  <p className="navName">About</p>
                </Link>
              </div>
            </div>

            <div className="logout">
              <button className="logoutBtn">
                <IoLogOut className="navIcon" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </Scrollbars>
      </div>
    </>
  );
};

export default Navbar;
