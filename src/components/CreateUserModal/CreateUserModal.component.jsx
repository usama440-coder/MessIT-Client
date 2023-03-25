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
  const [inputData, setInputData] = useState({ role: "user" });
  const [btnLoading, setBtnLoading] = useState(false);

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
    setInputData((values) => ({ ...values, [name]: value }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setInputData((values) => ({ ...values, profile: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    // convert roles from key-value
    // back to an array of elements
    let role;
    if (selectOptions.length !== 0) {
      role = selectOptions.map((role) => {
        return role.value;
      });
    }

    const formData = new FormData();
    formData.append("name", inputData.name);
    formData.append("email", inputData.email);
    formData.append("contact", inputData.contact);
    formData.append("mess", inputData.mess);
    formData.append("profile", inputData.profile);
    role?.forEach((item, index) => {
      formData.append(`role[${index}]`, item);
    });

    try {
      const res = await userService.addUser(formData, token);
      toast.success("User addedd successfully");
      const tempData = {
        ...res.data.user,
        messData: {
          _id: inputData.mess,
        },
      };
      updateTable(tempData);
      setCreateUserModal(false);
    } catch (error) {
      toast.error(error?.response?.data?.message || "User cannot be added");
    }
    setBtnLoading(false);
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
          <div className="splitInputs">
            <div className="inputContainer">
              <label>Name</label>
              <input
                type="text"
                name="name"
                id="name"
                onChange={handleChange}
                value={inputData?.name || ""}
              />
            </div>
            <div className="inputContainer">
              <label>Email</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleChange}
                value={inputData?.email || ""}
              />
            </div>
          </div>

          <div className="splitInputs">
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
            <div className="inputContainer">
              <label>Contact</label>
              <input
                type="text"
                name="contact"
                id="contact"
                onChange={handleChange}
                value={inputData?.contact || ""}
              />
            </div>
          </div>
          <div className="splitInputs">
            <div className="inputContainer">
              <label>Profile</label>
              <input
                type="file"
                name="profile"
                accept=".png, .jpg, .jpeg"
                onChange={handleImage}
              />
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

export default CreateUserModal;
