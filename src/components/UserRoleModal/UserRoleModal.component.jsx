import { FaTimes } from "react-icons/fa";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { setRole } from "../../slices/auth.slice";
import { useNavigate } from "react-router-dom";

const UserRoleModal = ({ setUserRoleModal }) => {
  const { user } = useSelector((state) => state.auth.user);
  const [userRole, setUserRole] = useState("user");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(setRole(userRole));
      toast.success("User logged in successfully");
      setUserRoleModal(false);
      navigate("/");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="modal">
      <div className="modalContainer">
        <h2 className="modalHeading">Select User Role</h2>
        <FaTimes
          className="modalCross"
          onClick={() => setUserRoleModal(false)}
        />
        <form>
          <div className="inputContainer">
            <label>Role</label>
            <select
              name="type"
              defaultValue="none"
              onChange={(e) => setUserRole(e.target.value)}
            >
              {user?.role?.map((role) => {
                return (
                  <option key={role} value={role}>
                    {role}
                  </option>
                );
              })}
            </select>
          </div>

          <button className="modalBtn" onClick={handleSubmit}>
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserRoleModal;
