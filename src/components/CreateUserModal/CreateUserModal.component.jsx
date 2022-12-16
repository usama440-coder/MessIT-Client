import "./CreateUserModal.component.css";
import { FaTimes } from "react-icons/fa";

const CreateUserModal = ({ setModal }) => {
  return (
    <div className="modal">
      <div className="modalContainer">
        <h2 className="modalHeading">Create a new user</h2>
        <FaTimes className="modalCross" onClick={() => setModal(false)} />
        <form>
          <div className="inputContainer">
            <label>Name</label>
            <input type="text" />
          </div>
          <div className="inputContainer">
            <label>Email</label>
            <input type="text" />
          </div>
          <div className="inputContainer">
            <label>Contact</label>
            <input type="text" />
          </div>
          <div className="splitInputs">
            <div className="inputContainer">
              <label>Role</label>
              <select>
                <option value="user">User</option>
                <option value="secratory">Secretory</option>
                <option value="staff">Staff</option>
                <option value="cashier">Cashier</option>
                <option value="admin" disabled>
                  Admin
                </option>
              </select>
            </div>
            <div className="inputContainer">
              <label>Mess</label>
              <select>
                <option value="ABE">ABE</option>
                <option value="CD">CD</option>
                <option value="JH">JH</option>
              </select>
            </div>
          </div>
          <button className="modalBtn">Save</button>
        </form>
      </div>
    </div>
  );
};

export default CreateUserModal;
