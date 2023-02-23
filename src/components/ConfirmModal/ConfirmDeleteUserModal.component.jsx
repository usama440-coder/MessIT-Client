import { FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import userService from "../../services/userService";
import { toast } from "react-hot-toast";

const ConfirmDeleteUserModal = ({
  userData,
  setConfirmModal,
  setUsersData,
  usersData,
}) => {
  const token = useSelector((state) => state.auth.user.token);

  const handleDeleteUser = async () => {
    try {
      await userService.deleteUser(userData._id, token);
      toast.success("User deleted successfully");
      setUsersData(usersData?.filter((user) => user._id !== userData._id));
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="modal">
      <div className="modalContainer">
        <h2 className="modalHeading">Confirm an action!</h2>
        <p className="modalStatement">
          Are you sure you want to delete this user?
        </p>
        <FaTimes
          className="modalCross"
          onClick={() => setConfirmModal(false)}
        />
        <div className="confirmButton">
          <button className="modalBtn" onClick={handleDeleteUser}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteUserModal;
