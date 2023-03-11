import { FaTimes } from "react-icons/fa";
import { useState } from "react";
import { useSelector } from "react-redux";
import messService from "../../services/messService";
import toast from "react-hot-toast";

const EditMessModal = ({ setEditMessModal, messData }) => {
  const token = useSelector((state) => state.auth.user.token);
  const [mess, setMess] = useState(messData.name || "");

  const handleChange = (e) => {
    setMess(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await messService.updateMess(messData._id, { name: mess }, token);
      toast.success("Mess updated successfully");
      setEditMessModal(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="modal">
      <div className="modalContainer">
        <h2 className="modalHeading">Edit a mess</h2>
        <FaTimes
          className="modalCross"
          onClick={() => setEditMessModal(false)}
        />
        <form>
          <div className="inputContainer">
            <label>Name</label>
            <input
              type="text"
              name="mess"
              id="mess"
              value={mess || ""}
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

export default EditMessModal;
