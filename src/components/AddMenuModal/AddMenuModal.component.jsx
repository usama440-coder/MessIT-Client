import "./AddMenuModal.component.css";
import { FaTimes } from "react-icons/fa";
import Select from "react-select";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import mealTypeService from "../../services/mealTypeService";
import itemService from "../../services/itemService";
import menuService from "../../services/menuService";
import { toast } from "react-hot-toast";

const AddMenuModal = ({ setAddMenuModal }) => {
  const token = useSelector((state) => state.auth.user.token);
  const [selectOptions, setSelectOptions] = useState([]);
  const [mealTypesData, setMealTypesData] = useState([]);
  const [itemsData, setItemsData] = useState([]);
  const [formData, setFormData] = useState({
    type: "",
    day: "monday",
  });

  useEffect(() => {
    const fetchMealTypes = async () => {
      try {
        const mealTypes = await mealTypeService.getMealType(token);
        const items = await itemService.getItems(token);
        setMealTypesData(mealTypes?.data?.mealTypes || []);
        setItemsData(items?.data?.items || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMealTypes();
  }, [token]);

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
      await menuService.createMenu({ ...formData, items }, token);
      toast.success("Menu added successfully");
      setAddMenuModal(false);
    } catch (error) {
      setAddMenuModal(false);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="modal">
      <div className="modalContainer">
        <h2 className="modalHeading">Add a menu</h2>
        <FaTimes
          className="modalCross"
          onClick={() => setAddMenuModal(false)}
        />
        <form>
          <div className="splitInputs">
            <div className="inputContainer">
              <label>Day</label>
              <select name="day" defaultValue="monday" onChange={handleChange}>
                <option value="monday">Monday</option>
                <option value="tuesday">Tuesday</option>
                <option value="wednesday">Wednesday</option>
                <option value="thursday">Thursday</option>
                <option value="friday">Friday</option>
                <option value="saturday">Saturday</option>
                <option value="sunday">Sunday</option>
              </select>
            </div>
            <div className="inputContainer">
              <label>Type</label>
              <select name="type" defaultValue="none" onChange={handleChange}>
                <option value="none" disabled>
                  None
                </option>
                {mealTypesData?.map((type) => {
                  return (
                    <option key={type?._id} value={type?._id}>
                      {type?.type}
                    </option>
                  );
                })}
              </select>
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
          <button className="modalBtn" onClick={handleSubmit}>
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMenuModal;
