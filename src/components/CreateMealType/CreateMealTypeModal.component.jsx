import { FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useState } from "react";
import "./CreateMealTypeModal.component.css";

const CreateMealTypeModal = ({ messData, setModal2 }) => {
  console.log(messData);
  const token = useSelector((state) => state.auth.user.token);
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((values) => ({ ...values, [name]: value }));
  };

  return (
    <div className="modal">
      <div className="modalContainer">
        <h2 className="modalHeading">Create a new meal type</h2>
        <FaTimes className="modalCross" onClick={() => setModal2(false)} />
        <form>
          <div className="inputContainer">
            <label>Type</label>
            <input
              type="text"
              name="type"
              id="type"
              onChange={handleChange}
              value={FormData?.type || ""}
            />
          </div>
          <div className="inputContainer">
            <label>Mess</label>
            <select name="mess" onChange={handleChange} defaultValue="none">
              <option value="none" disabled>
                None
              </option>
              {messData?.map((mess) => {
                return (
                  <option key={mess?._id} value={mess?._id}>
                    {mess?.name}
                  </option>
                );
              })}
            </select>
          </div>

          <button className="modalBtn">Save</button>
        </form>
      </div>
    </div>
  );
};

export default CreateMealTypeModal;
