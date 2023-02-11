import "./CreateUserModal.component.css";
import { FaTimes } from "react-icons/fa";
import { useState } from "react";
import userService from "../../services/userService";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

const CreateUserModal = ({ setModal, usersData, messData }) => {
  const token = useSelector((state) => state.auth.user.token);
  const [formData, setFormData] = useState({ role: "user" });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await userService.addUser(formData, token);
      toast.success("User addedd successfully");
      setFormData({ role: "user" });
      window.location.reload();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="modal">
      <div className="modalContainer">
        <h2 className="modalHeading">Create a new user</h2>
        <FaTimes className="modalCross" onClick={() => setModal(false)} />
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
              <label>Password</label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={handleChange}
                value={formData?.password || ""}
              />
            </div>
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
          <div className="splitInputs">
            <div className="inputContainer">
              <label>Role</label>
              <select name="role" onChange={handleChange}>
                <option value="user">User</option>
                <option value="secretary">Secretary</option>
                <option value="staff">Staff</option>
                <option value="cashier">Cashier</option>
              </select>
            </div>
            <div className="inputContainer">
              <label>Mess</label>
              <select name="mess" onChange={handleChange}>
                <option value="none" disabled selected>
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
          <button className="modalBtn" onClick={handleSubmit}>
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUserModal;
