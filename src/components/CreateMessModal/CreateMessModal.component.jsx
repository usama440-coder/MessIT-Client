import "./CreateMessModal.component.css";
import { FaTimes } from "react-icons/fa";
import { useState } from "react";
import { useSelector } from "react-redux";
import messService from "../../services/messService";
import toast from "react-hot-toast";

const CreateMessModal = ({ setModal, updateTable }) => {
  const token = useSelector((state) => state.auth.user.token);
  const [mess, setMess] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  const handleChange = (e) => {
    setMess(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    try {
      const res = await messService.addMess({ name: mess }, token);
      toast.success("Mess addedd successfully");
      updateTable(res?.data?.mess || {});
      setModal(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
    setBtnLoading(false);
  };

  return (
    <div className="modal">
      <div className="modalContainer">
        <h2 className="modalHeading">Create a new mess</h2>
        <FaTimes className="modalCross" onClick={() => setModal(false)} />
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
          <button
            disabled={btnLoading}
            className="modalBtn"
            onClick={handleSubmit}
          >
            {btnLoading ? <span>Loading...</span> : <span>Save</span>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateMessModal;
