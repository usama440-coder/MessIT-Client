import { FaTimes } from "react-icons/fa";
import "./CreateItemModal.component.css";

const CreateItemModal = ({ setModal }) => {
  return (
    <div className="modal">
      <div className="modalContainer">
        <h2 className="modalHeading">Create a new item</h2>
        <FaTimes className="modalCross" onClick={() => setModal(false)} />
        <form>
          <div className="inputContainer">
            <label>Item Name</label>
            <input type="text" />
          </div>
          <div className="inputContainer">
            <label>Item Units</label>
            <input type="number" />
          </div>

          <button className="modalBtn">Save</button>
        </form>
      </div>
    </div>
  );
};

export default CreateItemModal;
