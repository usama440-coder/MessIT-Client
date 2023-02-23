import { FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import itemService from "../../services/itemService";
import { toast } from "react-hot-toast";

const ConfirmDeleteItemModal = ({
  itemData,
  setConfirmModal,
  setItemsData,
  itemsData,
}) => {
  const token = useSelector((state) => state.auth.user.token);

  const handleDeleteItem = async () => {
    try {
      await itemService.deleteItem(itemData._id, token);
      toast.success("Item deleted successfully");
      setItemsData(itemsData?.filter((item) => item._id !== itemData._id));
      setConfirmModal(() => false);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="modal">
      <div className="modalContainer">
        <h2 className="modalHeading">Confirm an action!</h2>
        <p className="modalStatement">
          Are you sure you want to delete this item?
        </p>
        <FaTimes
          className="modalCross"
          onClick={() => setConfirmModal(false)}
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

export default ConfirmDeleteItemModal;
