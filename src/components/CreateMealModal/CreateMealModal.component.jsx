import { FaTimes } from "react-icons/fa";
import Select from "react-select";
import "./CreateMealModal.component.css";

const mealOptions = [
  { value: "roti", label: "Roti" },
  { value: "chicken qorma", label: "Chicken Qorma" },
  { value: "boneless chicken", label: "Boneless Chicken" },
  { value: "mix sabzi", label: "Mix Sabzi" },
  { value: "daal chana", label: "Daal Chana" },
  { value: "daleem", label: "Daleem" },
  { value: "omellette", label: "Omellette" },
  { value: "fried egg", label: "Fired Egg" },
  { value: "paratha", label: "Paratha" },
  { value: "channy", label: "Channy" },
  { value: "chicken pulao", label: "Chicken Pulao" },
];

const CreateMealModal = ({ setModal }) => {
  return (
    <div className="modal">
      <div className="modalContainer">
        <h2 className="modalHeading">Create a new meal</h2>
        <FaTimes className="modalCross" onClick={() => setModal(false)} />
        <form>
          <div className="splitInputs">
            <div className="inputContainer">
              <label>Mess</label>
              <select>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
              </select>
            </div>
            <div className="inputContainer">
              <label>On/Off Time</label>
              <input type="datetime-local" />
            </div>
          </div>
          <div className="inputContainer">
            <label>Select Items</label>
            <Select
              options={mealOptions}
              isMulti
              name="meal"
              className="basic-multi-select"
              classNamePrefix="select"
              placeholder=""
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  fontSize: "16px",
                  border: "none",
                  placeholder: "Select",
                  boxShadow: state.isFocused ? null : null,
                }),
              }}
            />
          </div>
          <div className="splitInputs">
            <div className="inputContainer">
              <label>Valid From</label>
              <input type="datetime-local" />
            </div>
            <div className="inputContainer">
              <label>Valid Until</label>
              <input type="datetime-local" />
            </div>
          </div>
          <button className="modalBtn">Save</button>
        </form>
      </div>
    </div>
  );
};

export default CreateMealModal;
