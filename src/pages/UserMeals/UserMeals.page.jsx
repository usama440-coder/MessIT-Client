import React from "react";
import { useLocation } from "react-router-dom";
import userMealService from "../../services/userMealService";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const UserMeals = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const token = useSelector((state) => state.auth.user.token);

  useEffect(() => {
    const fetchUserMealData = async () => {
      try {
        const res = await userMealService.getUserMeal(id, token);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserMealData();
  }, [id, token]);

  return (
    <div>
      <h2>sss</h2>
      {/* <p>{location}</p> */}
    </div>
  );
};

export default UserMeals;
