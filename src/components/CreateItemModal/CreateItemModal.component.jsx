import { FaTimes } from "react-icons/fa";
import "./CreateItemModal.component.css";
import itemService from "../../services/itemService";
import { useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const CreateItemModal = ({ setCreateItemModal, updateTable }) => {
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
      const res = await itemService.addItem(formData, token);
      setFormData({});
      toast.success("Item added successfully");
      updateTable(res?.data?.item || {});
      setCreateItemModal(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="modal">
      <div className="modalContainer">
        <h2 className="modalHeading">Create a new item</h2>
        <FaTimes
          className="modalCross"
          onClick={() => setCreateItemModal(false)}
        />
        <form>
          <div className="inputContainer">
            <label>Item Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData?.name || ""}
              onChange={handleChange}
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
