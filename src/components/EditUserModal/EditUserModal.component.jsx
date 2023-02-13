import "./EditUserModal.component.css";
import { FaTimes } from "react-icons/fa";
import { useState } from "react";
import userService from "../../services/userService";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

const EditUserModal = ({ setEditUserModal, messData, userData }) => {
  const token = useSelector((state) => state.auth.user.token);
  const [formData, setFormData] = useState({
    name: userData?.name || "",
    email: userData?.email || "",
    contact: userData?.contact || "",
    role: userData?.role || "",
    isActive: userData?.isActive,
    mess: userData?.messData?._id || "",
  });

  const handleChange = (e) => {
    let name;
    let value;
    value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    name = e.target.name;
    setFormData((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await userService.updateUser(userData._id, formData, token);
      console.log(res);
      toast.success("User updated successfully");
      setEditUserModal(false);
      //   window.location.reload();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="modal">
      <div className="modalContainer">
        <h2 className="modalHeading">Edit a user</h2>
        <FaTimes
          className="modalCross"
          onClick={() => setEditUserModal(false)}
        />
        <form>
          <div className="inputContainer">
            <label>Name</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleChange}
              value={formData?.name || ""}
            />
          </div>
          <div className="splitInputs">
            <div className="inputContainer">
              <label>Email</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleChange}
                value={formData?.email || ""}
              />
            </div>
            <div className="inputContainer">
              <label>Contact</label>
              <input
                type="text"
                name="contact"
                id="contact"
                onChange={handleChange}
                value={formData?.contact || ""}
              />
            </div>
          </div>

          <div className="splitInputs">
            <div className="inputContainer">
              <label>Role</label>
              <select
                name="role"
                onChange={handleChange}
                defaultValue={formData?.role}
              >
                <option value="user">User</option>
                <option value="secretary">Secretary</option>
                <option value="staff">Staff</option>
                <option value="cashier">Cashier</option>
              </select>
            </div>
            <div className="inputContainer">
              <label>Mess</label>
              <select name="mess" onChange={handleChange} defaultValue="none">
                <option value="none" disabled>
                  None
                </option>
                {messData?.map((mess) => {
                  return (
                    <option key={mess?._id} value={mess?._id}>
                      {mess?.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              flexDirection: "row",
              gap: "10px",
            }}
          >
            <span>Active</span>

            <label className="switch">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                id="isActive"
                onChange={handleChange}
              />
              <span className="slider round"></span>
            </label>
          </div>
          <button className="modalBtn" onClick={handleSubmit}>
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
