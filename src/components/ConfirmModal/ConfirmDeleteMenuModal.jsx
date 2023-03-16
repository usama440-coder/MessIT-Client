import { FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import menuService from "../../services/menuService";

const ConfirmDeleteMenuModal = ({ menu, setConfirmDeleteMenuModal }) => {
  const token = useSelector((state) => state.auth.user.token);

  const handleDeleteItem = async () => {
    try {
      await menuService.deleteMenu(menu._id, token);
      toast.success("Menu deleted successfully");
      setConfirmDeleteMenuModal(() => false);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="modal">
      <div className="modalContainer">
        <h2 className="modalHeading">Confirm an action!</h2>
        <p className="modalStatement">
          Are you sure you want to delete this menu?
        </p>
        <FaTimes
          className="modalCross"
          onClick={() => setConfirmDeleteMenuModal(false)}
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

export default ConfirmDeleteMenuModal;
