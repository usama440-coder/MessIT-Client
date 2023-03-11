import { FaTimes } from "react-icons/fa";
import Select from "react-select";
import { useState } from "react";
import { useSelector } from "react-redux";
import "./CreateMealModal.component.css";
import mealService from "../../services/mealService";
import { toast } from "react-hot-toast";

const CreateMealModal = ({ mealTypesData, itemsData, setCreateMealModal }) => {
  const [selectOptions, setSelectOptions] = useState([]);
  const token = useSelector((state) => state.auth.user.token);
  const [formData, setFormData] = useState({
    type: "",
    validFrom: "",
    validUntil: "",
    closingTime: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const items = selectOptions.map((item) => {
      return { itemId: item?._id };
    });
    try {
      await mealService.createMeal({ ...formData, items }, token);
      toast.success("Meal added successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="modal">
      <div className="modalContainer">
        <h2 className="modalHeading">Create a new meal</h2>
        <FaTimes
          className="modalCross"
          onClick={() => setCreateMealModal(false)}
        />
        <form>
          <div className="splitInputs">
            <div className="inputContainer">
              <label>Type</label>
              <select name="type" defaultValue="none" onChange={handleChange}>
                <option value="none" disabled>
                  None
                </option>
                {mealTypesData?.map((type) => {
                  return (
                    <option key={type?._id} value={type?.type}>
                      {type?.type}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="inputContainer">
              <label>Closing Time</label>
              <input
                type="datetime-local"
                name="closingTime"
                value={formData?.closingTime || ""}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="inputContainer">
            <label>Select Items</label>
            <Select
              getOptionValue={(option) => option._id}
              getOptionLabel={(option) => option.name}
              options={itemsData}
              isMulti
              className="basic-multi-select"
              classNamePrefix="select"
              placeholder=""
              onChange={setSelectOptions}
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
              <input
                type="datetime-local"
                name="validFrom"
                value={formData?.validFrom || ""}
                onChange={handleChange}
              />
            </div>
            <div className="inputContainer">
              <label>Valid Until</label>
              <input
                type="datetime-local"
                name="validUntil"
                value={formData?.validUntil || ""}
                onChange={handleChange}
              />
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

export default CreateMealModal;
