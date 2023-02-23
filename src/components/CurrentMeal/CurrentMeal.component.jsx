import "./CurrentMeal.component.css";
import StartMealModal from "../../components/StartMealModal/StartMealModal.component";
import { useEffect, useState } from "react";
import Timer from "../Timer";
import userMealService from "../../services/userMealService";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import EditMealModal from "../EditMealModal/EditMealModal.component";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const CurrentMeal = ({ meal, mealTypesData, itemsData }) => {
  const { token, user } = useSelector((state) => state.auth.user);
  const [startMealModal, setStartMealModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [editMealModal, setEditMealModal] = useState(false);
  const format = {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  const handleChange = (e) => {
    setIsOpen(!isOpen);
  };

  // if usermeal exists, check switch to true
  useEffect(() => {
    const fetchUserMealData = async () => {
      try {
        const res = await userMealService.getSingleUserMeal(
          meal?._id,
          { user: user?._id },
          token
        );
        if (res?.data?.singleUserMeal?.length !== 0) {
          setIsOpen(true);
        }
      } catch (error) {
        setIsOpen(false);
      }
    };

    fetchUserMealData();
  }, [meal?._id, user?._id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let items = [];
    meal?.items.map((item) => {
      return items.push({ itemId: item._id, itemQuantity: 1 });
    });

    try {
      const res = await userMealService.openUserMeal(
        meal?._id,
        { isOpen, items },
        token
      );
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="currentMealItem">
      <button
        className="badge currentMealStartBtn"
        onClick={() => setStartMealModal(true)}
      >
        Start
      </button>
      <Link to={`/userMeals/${meal?._id}`} target="_blank">
        <button className="badge currentMealTotalUsers">
          {meal?.totalUsers}
        </button>
      </Link>
      <FaEdit
        className="editBadge greenIcon"
        onClick={() => setEditMealModal(true)}
      />
      {startMealModal ? (
        <StartMealModal meal={meal} setStartMealModal={setStartMealModal} />
      ) : (
        ""
      )}
      {editMealModal ? (
        <EditMealModal
          setEditMealModal={setEditMealModal}
          mealTypesData={mealTypesData}
          itemsData={itemsData}
          mealData={meal}
        />
      ) : (
        ""
      )}
      <table>
        <tbody>
          <tr>
            <td>Type</td>
            <td>{meal?.type}</td>
          </tr>
          <tr>
            <td>Start Time</td>
            <td>{new Date(meal?.validFrom).toLocaleString("en-US", format)}</td>
          </tr>
          <tr>
            <td>End Time</td>
            <td>
              {new Date(meal?.validUntil).toLocaleString("en-US", format)}
            </td>
          </tr>
          <tr>
            <td>Items</td>
            <td>
              <table>
                <tbody>
                  {meal?.items.map((item) => (
                    <tr key={item._id}>
                      <td>{item.name}</td>
                      <td>{item.units}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td>On/Off</td>
            <td>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={isOpen}
                  name="isOpen"
                  id="isOpen"
                  onChange={handleChange}
                />
                <span className="slider round"></span>
              </label>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="tableFooter">
        {Date.parse(meal?.closingTime) >= Date.now() ? (
          <Timer deadline={meal?.closingTime} />
        ) : (
          ""
        )}

        <button onClick={handleSubmit}>Save</button>
      </div>
    </div>
  );
};

export default CurrentMeal;
