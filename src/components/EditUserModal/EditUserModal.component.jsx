import "./EditUserModal.component.css";
import { FaTimes } from "react-icons/fa";
import { useState } from "react";
import Select from "react-select";
import userService from "../../services/userService";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

const EditUserModal = ({ setEditUserModal, messData, userData }) => {
  const token = useSelector((state) => state.auth.user.token);

  // map current user role to key-value pair
  const userRoles = userData?.role.map((role) => {
    return { label: role, value: role };
  });

  const [selectOptions, setSelectOptions] = useState(userRoles || []);
  const [formData, setFormData] = useState({
    name: userData?.name || "",
    email: userData?.email || "",
    contact: userData?.contact || "",
    isActive: userData?.isActive,
    mess: userData?.messData?._id || "",
  });

  const roles = [
    {
      value: "user",
      label: "user",
    },
    {
      value: "secretary",
      label: "secretary",
    },
    {
      value: "cashier",
      label: "cashier",
    },
    {
      value: "staff",
      label: "staff",
    },
  ];

  const handleChange = (e) => {
    let name;
    let value;
    value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    name = e.target.name;
    setFormData((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    // change key-value pair back to an array
    let role;
    if (selectOptions.length !== 0) {
      role = selectOptions.map((role) => {
        return role.value;
      });
    }

    e.preventDefault();
    try {
      const res = await userService.updateUser(
        userData._id,
        { ...formData, role },
        token
      );
      console.log(res);
      toast.success("User updated successfully");
      setEditUserModal(false);
      //   window.location.reload();
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
          onClick={() => setEditUserModal(false)}
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
              defaultValue={selectOptions}
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
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              flexDirection: "row",
              gap: "10px",
            }}
          >
            <span>Active</span>

            <label className="switch">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                id="isActive"
                onChange={handleChange}
              />
              <span className="slider round"></span>
            </label>
          </div>
          <button className="modalBtn" onClick={handleSubmit}>
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
