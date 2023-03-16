import { FaTimes } from "react-icons/fa";
import "./CreateBillModal.component.css";
import billingService from "../../services/billingService";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

const CreateBillModal = ({ setCreateBillModal }) => {
  const [formData, setFormData] = useState({});
  const token = useSelector((state) => state.auth.user.token);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await billingService.createBill(formData, token);
      toast.success("Bill created successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="modal">
      <div className="modalContainer">
        <h2 className="modalHeading">Generate a new bill</h2>
        <FaTimes
          className="modalCross"
          onClick={() => setCreateBillModal(false)}
        />
        <form>
          <div className="splitInputs">
            <div className="inputContainer">
              <label>From</label>
              <input
                type="date"
                name="from"
                id="from"
                onChange={handleChange}
                value={formData?.from || ""}
              />
            </div>
            <div className="inputContainer">
              <label>To</label>
              <input
                type="date"
                name="to"
                id="from"
                onChange={handleChange}
                value={formData?.to || ""}
              />
            </div>
          </div>
          <div className="splitInputs">
            <div className="inputContainer">
              <label>Additional Amount</label>
              <input
                type="number"
                name="additionalCharges"
                id="additionalCharges"
                onChange={handleChange}
                value={formData?.additionalCharges}
              />
            </div>
            <div className="inputContainer">
              <label>Unit Cost</label>
              <input
                type="text"
                name="unitCost"
                id="unitCost"
                onChange={handleChange}
                value={formData?.unitCost}
              />
            </div>
          </div>
          {/* <div className="splitInputs">
            <div className="inputContainer">
              <label>Select one</label>
              <div className="billRadio">
                <div>
                  <p>All Users</p>
                  <input type="radio" name="allspec" />
                </div>
                <div>
                  <p>Specific User</p>
                  <input type="radio" name="allspec" />
                </div>
              </div>
            </div>
            <div className="inputContainer">
              <label>User ID</label>
              <input type="text" />
            </div>
          </div> */}
          <button className="modalBtn" onClick={handleSubmit}>
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBillModal;
