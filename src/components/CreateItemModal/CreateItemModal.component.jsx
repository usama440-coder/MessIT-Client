import { FaTimes } from "react-icons/fa";
import "./CreateItemModal.component.css";
import itemService from "../../services/itemService";
import { useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const CreateItemModal = ({ setModal }) => {
  const token = useSelector((state) => state.auth.user.token);
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await itemService.addItem(formData, token);
      setFormData({});
      toast.success("Item added successfully");
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="modal">
      <div className="modalContainer">
        <h2 className="modalHeading">Create a new item</h2>
        <FaTimes className="modalCross" onClick={() => setModal(false)} />
        <form>
          <div className="inputContainer">
            <label>Item Name</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleChange}
              value={formData?.name || ""}
            />
          </div>
          <div className="inputContainer">
            <label>Item Units</label>
            <input
              type="number"
              name="units"
              id="units"
              value={formData?.units}
              onChange={handleChange}
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

export default CreateItemModal;
