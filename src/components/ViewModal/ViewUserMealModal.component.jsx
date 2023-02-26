import { FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import userMealService from "../../services/userMealService";

const ViewUserMealModal = ({ userMealId, setViewUserMealModal }) => {
  const { token, user } = useSelector((state) => state.auth.user);
  const [userMeal, setUserMeal] = useState({});
  let units = 0;

  useEffect(() => {
    const fetchUserMeal = async () => {
      try {
        const res = await userMealService.getSingleUserMeal(
          userMealId,
          { user: user?._id },
          token
        );
        setUserMeal(res?.data?.singleUserMeal[0] || {});
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserMeal();
  }, [token, user?._id, userMealId]);

  return (
    <div className="modal">
      <div className="modalContainer">
        <p>Name: Talha Amjad</p>

        {userMeal?.items?.map((item) => {
          units += item?.itemQuantity * item?.units;
          return (
            <p>
              {item?.name} ({item?.units}) - {item?.itemQuantity}
            </p>
          );
        })}
        <p>
          Total: <b>{units}</b>
        </p>
        <FaTimes
          className="modalCross"
          onClick={() => setViewUserMealModal(false)}
        />
      </div>
    </div>
  );
};

export default ViewUserMealModal;
