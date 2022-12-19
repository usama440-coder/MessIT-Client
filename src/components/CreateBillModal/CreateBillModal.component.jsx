import { FaTimes } from "react-icons/fa";
import "./CreateBillModal.component.css";

const CreateBillModal = ({ setModal }) => {
  return (
    <div className="modal">
      <div className="modalContainer">
        <h2 className="modalHeading">Generate a new bill</h2>
        <FaTimes className="modalCross" onClick={() => setModal(false)} />
        <form>
          <div className="splitInputs">
            <div className="inputContainer">
              <label>From</label>
              <input type="date" />
            </div>
            <div className="inputContainer">
              <label>To</label>
              <input type="date" />
            </div>
          </div>
          <div className="inputContainer">
            <label>Additional Amount</label>
            <input type="number" />
          </div>
          <div className="splitInputs">
            <div className="inputContainer">
              <label>Select one</label>
              <div className="billRadio">
                <div>
                  <p>All Users</p>
                  <input type="radio" name="allspec" />
                </div>
                <div>
                  <p>Specific User</p>
                  <input type="radio" name="allspec" />
                </div>
              </div>
            </div>
            <div className="inputContainer">
              <label>User ID</label>
              <input type="text" />
            </div>
          </div>
          <button className="modalBtn">Save</button>
        </form>
      </div>
    </div>
  );
};

export default CreateBillModal;
