import "./AddMenuModal.component.css";
import { FaTimes } from "react-icons/fa";
import Select from "react-select";

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

const AddMenuModal = ({ setModal }) => {
  return (
    <div className="modal">
      <div className="modalContainer">
        <h2 className="modalHeading">Add a menu</h2>
        <FaTimes className="modalCross" onClick={() => setModal(false)} />
        <form>
          <div className="splitInputs">
            <div className="inputContainer">
              <label>Day</label>
              <select>
                <option value="Breakfast">Monday</option>
                <option value="Lunch">Tuesday</option>
                <option value="Dinner">Wednesday</option>
                <option value="Dinner">Thursday</option>
                <option value="Dinner">Friday</option>
                <option value="Dinner">Saturday</option>
                <option value="Dinner">Sunday</option>
              </select>
            </div>
            <div className="inputContainer">
              <label>Type</label>
              <select>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
              </select>
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
          <button className="modalBtn">Save</button>
        </form>
      </div>
    </div>
  );
};

export default AddMenuModal;
