import React from "react";
import { useLocation } from "react-router-dom";
import userMealService from "../../services/userMealService";
import mealService from "../../services/mealService";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./UserMeals.page.css";

const UserMeals = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const token = useSelector((state) => state.auth.user.token);
  const [userMealData, setUserMealData] = useState([]);
  const [mealData, setMealData] = useState({});
  const format = {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  useEffect(() => {
    const fetchUserMealData = async () => {
      try {
        const res = await userMealService.getUserMeal(id, token);
        const res2 = await mealService.getMeal(id, token);
        setUserMealData(res?.data?.userMeal || []);
        setMealData(res2?.data?.meal[0] || {});
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserMealData();
  }, [id, token]);

  return (
    <div className="userMeal">
      <div className="userMealContainer">
        <div className="userMealWrapper">
          <h2>MessIT</h2>
          <div className="userMealHeader">
            <p>
              <b>Type: </b> {mealData?.type}
            </p>
            <p>
              <b>Closing: </b>{" "}
              {new Date(mealData?.closingTime).toLocaleString("en-US", format)}
            </p>
            <p>
              <b>Serving: </b>
              {new Date(mealData?.validFrom).toLocaleString(
                "en-US",
                format
              )}{" "}
              {" - "}
              {new Date(mealData?.validUntil).toLocaleString("en-US", format)}
            </p>
          </div>
          <div className="userMealItems">
            {mealData?.items?.map((item) => {
              return (
                <span key={item?._id}>
                  {item?.name} ({item?.units}){" "}
                </span>
              );
            })}
          </div>
          <table>
            <thead>
              <tr>
                <th>Users</th>
                <th>Items</th>
              </tr>
            </thead>
            <tbody>
              {userMealData?.map((userMeal) => {
                let units = 0;
                return (
                  <tr key={userMeal?._id}>
                    <td>{userMeal?.user?.name}</td>
                    {userMeal?.items?.map((item) => {
                      units += item?.itemQuantity * item?.units;
                      return (
                        <td key={item?._id}>
                          {item?.name} - {item?.itemQuantity}
                        </td>
                      );
                    })}
                    <td style={{ fontWeight: "700" }}>{units}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserMeals;
