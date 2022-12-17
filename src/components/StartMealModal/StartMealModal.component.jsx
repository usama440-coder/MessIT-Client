import { FaTimes, FaCaretLeft, FaCaretRight } from "react-icons/fa";
import "./StartMealModal.component.css";

const StartMealModal = ({ setModal }) => {
  return (
    <div className="modal">
      <div className="modalContainer">
        <h2 className="modalHeading">Start Meal(Lunch)</h2>
        <FaTimes className="modalCross" onClick={() => setModal(false)} />
        <form>
          <div className="inputContainer">
            <label>User ID</label>
            <input type="text" />
          </div>
          <div className="inputContainer">
            <label>Name</label>
            <div className="textChecked">
              <input type="text" value={"Usama"} disabled />
              <input type="checkbox" />
            </div>
          </div>
          <div className="startMealItemsContainer">
            <div className="startMealItem">
              <FaCaretLeft className="startMealItemIcon" />
              <p className="startMealItemText">Chicken Qorma</p>
              <FaCaretRight className="startMealItemIcon" />
              <span className="startMealItemQuantity">2</span>
            </div>
            <div className="startMealItem">
              <FaCaretLeft className="startMealItemIcon" />
              <p className="startMealItemText">Roti</p>
              <FaCaretRight className="startMealItemIcon" />
              <span className="startMealItemQuantity">2</span>
            </div>
          </div>
          <button className="modalBtn">Save</button>
        </form>
      </div>
    </div>
  );
};

export default StartMealModal;
