import "./CreateUserModal.component.css";
import { FaTimes } from "react-icons/fa";
import Select from "react-select";
import { useState } from "react";
import userService from "../../services/userService";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

const CreateUserModal = ({ setCreateUserModal, messData, updateTable }) => {
  const token = useSelector((state) => state.auth.user.token);
  const [selectOptions, setSelectOptions] = useState([]);
  const [formData, setFormData] = useState({ role: "user" });

  // roles in key-value pair
  const roles = [
    {
      value: "user",
      label: "User",
    },
    {
      value: "secretary",
      label: "Secretary",
    },
    {
      value: "cashier",
      label: "Cashier",
    },
    {
      value: "staff",
      label: "Staff",
    },
  ];

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // convert roles from key-value
    // back to an array of elements
    let role;
    if (selectOptions.length !== 0) {
      role = selectOptions.map((role) => {
        return role.value;
      });
    }
    try {
      const res = await userService.addUser({ ...formData, role }, token);
      toast.success("User addedd successfully");
      const tempData = {
        ...res.data.user,
        messData: {
          _id: formData.mess,
        },
      };
      updateTable(tempData);
      setCreateUserModal(false);
    } catch (error) {
      toast.error(error?.response?.data?.message || "User cannot be added");
    }
  };

  return (
    <div className="modal">
      <div className="modalContainer">
        <h2 className="modalHeading">Create a new user</h2>
        <FaTimes
          className="modalCross"
          onClick={() => setCreateUserModal(false)}
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
          <div className="splitInputs">
            <div className="inputContainer">
              <label>Email</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleChange}
                value={formData?.email || ""}
              />
            </div>
          </div>
          <div className="splitInputs">
            <div className="inputContainer">
              <label>Contact</label>
              <input
                type="text"
                name="contact"
                id="contact"
                onChange={handleChange}
                value={formData?.contact || ""}
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
          </div>

          <div className="inputContainer">
            <label>Select Role(s)</label>
            <Select
              options={roles}
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

export default CreateUserModal;
