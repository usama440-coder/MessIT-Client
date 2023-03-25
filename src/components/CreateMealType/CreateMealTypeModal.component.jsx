import { FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useState } from "react";
import "./CreateMealTypeModal.component.css";
import mealTypeService from "../../services/mealTypeService";
import { toast } from "react-hot-toast";

const CreateMealTypeModal = ({ setCreateMealTypeModal }) => {
  const token = useSelector((state) => state.auth.user.token);
  const [formData, setFormData] = useState({});
  const [btnLoading, setBtnLoading] = useState(false);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    try {
      await mealTypeService.createMealType(formData, token);
      toast.success("Meal type added successfully");
      setCreateMealTypeModal(false);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      setCreateMealTypeModal(false);
    }
    setBtnLoading(false);
  };

  return (
    <div className="modal">
      <div className="modalContainer">
        <h2 className="modalHeading">Create a new meal type</h2>
        <FaTimes
          className="modalCross"
          onClick={() => setCreateMealTypeModal(false)}
        />
        <form>
          <div className="inputContainer">
            <label>Type</label>
            <input
              type="text"
              name="type"
              id="type"
              onChange={handleChange}
              value={formData?.type || ""}
            />
          </div>
          <button
            disabled={btnLoading}
            className="modalBtn"
            onClick={handleSubmit}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateMealTypeModal;
