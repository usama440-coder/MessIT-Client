import { useState } from "react";
import { FaTimes, FaCaretLeft, FaCaretRight } from "react-icons/fa";
import "./StartMealModal.component.css";
import userMealService from "../../services/userMealService";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const StartMealModal = ({ meal, setStartMealModal }) => {
  const token = useSelector((state) => state.auth.user.token);
  const [currUserId, setCurrUserId] = useState("");
  const [currUserMealData, setCurrUserMealData] = useState({});
  const [userMealItems, setUserMealItems] = useState([]);
  const [disbaleBtn, setDisableBtn] = useState(true);

  // fetch user meal data on change handler
  const fetchSingleUserMealData = async (val) => {
    try {
      const res = await userMealService.getSingleUserMeal(
        meal?._id,
        { user: val },
        token
      );
      setCurrUserMealData(res?.data?.singleUserMeal[0] || {});

      /*Prev Code ------------------*/

      // map item ids to to meal to get name of items
      // let temp = res?.data?.singleUserMeal[0]?.items?.map((item) => {
      //   let temp2 = meal?.items?.find((i) => i._id === item.itemId);
      //   if (temp2?.name) {
      //     item.name = temp2.name;
      //   }
      //   return item;
      // });

      // setUserMealItems(temp || []);

      /*Prev Code ------------------ end*/

      /*New Code ------------------*/
      setUserMealItems(res?.data?.singleUserMeal[0]?.items || []);
    } catch (error) {
      setCurrUserMealData({});
      setUserMealItems([]);
    }
  };

  // handle increment item's quantity
  const handleIncrement = (item) => {
    const temp = userMealItems.map((i) => {
      if (i?.itemId === item?.itemId) {
        return { ...i, itemQuantity: i.itemQuantity + 1 };
      } else {
        return i;
      }
    });

    setUserMealItems(temp);
  };

  // handle decrement item's quantity
  const handleDecrement = (item) => {
    const temp = userMealItems.map((i) => {
      if (i?.itemId === item?.itemId) {
        return {
          ...i,
          itemQuantity: i.itemQuantity - 1 < 0 ? 0 : i.itemQuantity - 1,
        };
      } else {
        return i;
      }
    });

    setUserMealItems(temp);
  };

  // handle typed user id
  // for 24 char, fetch data
  const handleUserIdChange = (e) => {
    setCurrUserId(() => {
      return e.target.value;
    });

    if (e.target.value.length === 24) {
      fetchSingleUserMealData(e.target.value);
      setDisableBtn(() => false);
    } else {
      setDisableBtn(() => true);
      setCurrUserMealData({});
      setUserMealItems([]);
    }
  };

  // submit update usermeal
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await userMealService.updateUserMeal(
        currUserMealData?._id,
        { items: userMealItems },
        token
      );
      toast.success("User meal updated");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="modal">
      <div className="modalContainer">
        <h2 className="modalHeading">{`Start Meal ${meal.type}`}</h2>
        <FaTimes
          className="modalCross"
          onClick={() => setStartMealModal(false)}
        />
        <form>
          <div className="inputContainer">
            <label>User ID</label>
            <input
              type="text"
              name="userId"
              value={currUserId || ""}
              maxLength={24}
              autoFocus
              onChange={handleUserIdChange}
            />
          </div>
          {Object.keys(currUserMealData).length !== 0 ? (
            <div className="inputContainer">
              <label>Name</label>
              <div className="textChecked">
                <input
                  type="text"
                  value={currUserMealData?.user?.name}
                  disabled
                />
                <input type="checkbox" />
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="startMealItemsContainer">
            {userMealItems?.map((item) => {
              return (
                <div className="startMealItem" key={item?.itemId}>
                  <FaCaretLeft
                    className="startMealItemIcon"
                    onClick={() => handleDecrement(item)}
                  />
                  <p
                    style={{ userSelect: "none" }}
                    className="startMealItemText"
                  >
                    {item?.name}
                  </p>
                  <FaCaretRight
                    className="startMealItemIcon"
                    onClick={() => handleIncrement(item)}
                  />
                  <span
                    style={{ userSelect: "none" }}
                    className="startMealItemQuantity"
                  >
                    {item?.itemQuantity}
                  </span>
                </div>
              );
            })}
          </div>
          <button
            disabled={disbaleBtn}
            className="modalBtn"
            onClick={handleSubmit}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default StartMealModal;
