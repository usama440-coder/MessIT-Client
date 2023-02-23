import { FaTimes } from "react-icons/fa";
import { useState } from "react";
import itemService from "../../services/itemService";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

const EditItemModal = ({ setEditItemModal, itemData }) => {
  const token = useSelector((state) => state.auth.user.token);
  const [formData, setFormData] = useState({
    name: itemData?.name || "",
    units: itemData?.units || 0,
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await itemService.updateItem(itemData._id, formData, token);
      console.log(res);
      toast.success("Item updated successfully");
      setEditItemModal(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="modal">
      <div className="modalContainer">
        <h2 className="modalHeading">Edit a user</h2>
        <FaTimes
          className="modalCross"
          onClick={() => setEditItemModal(false)}
        />
        <form>
          <div className="inputContainer">
            <label>Name</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleChange}
              value={formData?.name || ""}
            />
          </div>
          <div className="inputContainer">
            <label>Units</label>
            <input
              type="number"
              name="units"
              id="units"
              onChange={handleChange}
              value={formData?.units || ""}
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

export default EditItemModal;
