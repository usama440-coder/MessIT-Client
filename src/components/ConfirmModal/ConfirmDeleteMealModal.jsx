import { FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import mealService from "../../services/mealService";

const ConfirmDeleteMealModal = ({ meal, setConfirmDeleteMealModal }) => {
  const token = useSelector((state) => state.auth.user.token);

  const handleDeleteItem = async () => {
    try {
      await mealService.deleteMeal(meal._id, token);
      toast.success("Meal deleted successfully");
      setConfirmDeleteMealModal(() => false);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="modal">
      <div className="modalContainer">
        <h2 className="modalHeading">Confirm an action!</h2>
        <p className="modalStatement">
          Are you sure you want to delete this meal?
        </p>
        <FaTimes
          className="modalCross"
          onClick={() => setConfirmDeleteMealModal(false)}
        />
        <div className="confirmButton">
          <button className="modalBtn" onClick={handleDeleteItem}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteMealModal;
