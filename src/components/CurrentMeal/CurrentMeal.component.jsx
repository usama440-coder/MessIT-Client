import "./CurrentMeal.component.css";
import StartMealModal from "../../components/StartMealModal/StartMealModal.component";
import { useEffect, useState } from "react";
import Timer from "../Timer";
import userMealService from "../../services/userMealService";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import EditMealModal from "../EditMealModal/EditMealModal.component";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import ConfirmDeleteMealModal from "../ConfirmModal/ConfirmDeleteMealModal";

const CurrentMeal = ({ meal, mealTypesData, itemsData }) => {
  const { token, user } = useSelector((state) => state.auth.user);
  const role = useSelector((state) => state.auth.role);
  const [startMealModal, setStartMealModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [editMealModal, setEditMealModal] = useState(false);
  const [confirmDeleteMealModal, setConfirmDeleteMealModal] = useState(false);
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
      {role === "staff" ? (
        <div className="currentMealActions">
          <FaEdit
            className="editBadge greenIcon"
            onClick={() => setEditMealModal(true)}
          />
          <FaTrash
            className="deleteBadge redIcon"
            onClick={() => setConfirmDeleteMealModal(true)}
          />
          <Link to={`/userMeals/${meal?._id}`} target="_blank">
            <button className="badge currentMealTotalUsers">
              {meal?.totalUsers}
            </button>
          </Link>
          <button
            className="badge currentMealStartBtn"
            onClick={() => setStartMealModal(true)}
          >
            Start
          </button>
        </div>
      ) : (
        ""
      )}

      {startMealModal ? (
        <StartMealModal meal={meal} setStartMealModal={setStartMealModal} />
      ) : (
        ""
      )}
      {confirmDeleteMealModal ? (
        <ConfirmDeleteMealModal
          meal={meal}
          setConfirmDeleteMealModal={setConfirmDeleteMealModal}
        />
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

      <div className="currentMealDetails">
        <div className="tableHeader">
          <div className="currentMealDetailsItem">
            <p>Type</p>
            <p>{meal?.type}</p>
          </div>
          <div className="currentMealDetailsItem">
            <p>Start Time</p>
            <p>{new Date(meal?.validFrom).toLocaleString("en-US", format)}</p>
          </div>
          <div className="currentMealDetailsItem">
            <p>End Time</p>
            <p>{new Date(meal?.validUntil).toLocaleString("en-US", format)}</p>
          </div>
          <div className="currentMealDetailsItem">
            <p className="currentMealItemsContainer">
              {meal?.items.map((item) => (
                <span className="currentMealItems" key={item._id}>
                  {item.name}
                  {"("}
                  {item.units}
                  {")"}{" "}
                </span>
              ))}
            </p>
          </div>
          {role === "user" ? (
            <div className="closingSwitch">
              <label className="switch">
                <input
                  disabled={!(Date.parse(meal?.closingTime) >= Date.now())}
                  type="checkbox"
                  checked={isOpen}
                  name="isOpen"
                  id="isOpen"
                  onChange={handleChange}
                />
                <span className="slider round"></span>
              </label>
            </div>
          ) : (
            ""
          )}
        </div>
        <div>
          <div className=" tableFooter">
            {Date.parse(meal?.closingTime) >= Date.now() ? (
              <>
                <Timer deadline={meal?.closingTime} />
                {role === "user" ? (
                  <button className="currentMealSaveBtn" onClick={handleSubmit}>
                    Save
                  </button>
                ) : (
                  ""
                )}
              </>
            ) : (
              <p>Meal Closed</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentMeal;
