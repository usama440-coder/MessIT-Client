import { FaTimes } from "react-icons/fa";
import billingService from "../../services/billingService";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

const EditBillModal = ({ billData, setEditBillModal }) => {
  const [formData, setFormData] = useState({
    isPaid: billData?.isPaid,
    payment: billData?.payment || "",
  });
  const token = useSelector((state) => state.auth.user.token);
  const [balance, setBalance] = useState(0);

  const handleChange = (e) => {
    let name;
    let value;
    value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    name = e.target.name;
    setFormData((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await billingService.updateBill(
        billData?._id,
        formData,
        token
      );
      console.log(res);
      toast.success("Bill updated successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await billingService.getBalance(billData?.user?.id, token);
        setBalance(res?.data?.balance?.balance || 0);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [billData?.user?.id, token]);

  return (
    <div className="modal">
      <div className="modalContainer">
        <h2 className="modalHeading">Bill Payment</h2>
        <FaTimes
          className="modalCross"
          onClick={() => setEditBillModal(false)}
        />
        <form>
          <div className="splitInputs">
            <div className="inputContainer">
              <label>User Name</label>
              <input
                disabled
                type="text"
                name="username"
                id="username"
                onChange={handleChange}
                value={billData?.user?.name}
              />
            </div>
            <div className="inputContainer">
              <label>Current Balance</label>
              <input
                disabled
                type="number"
                name="prevBalance"
                id="prevBalance"
                onChange={handleChange}
                value={balance}
              />
            </div>
          </div>
          <div className="splitInputs">
            <div className="inputContainer">
              <label>Units Consumed</label>
              <input
                disabled
                type="number"
                name="unitsConsumed"
                id="unitsConsumed"
                onChange={handleChange}
                value={billData?.totalUnits}
              />
            </div>
            <div className="inputContainer">
              <label>Additional Charges</label>
              <input
                disabled
                type="text"
                name="additionalCharges"
                id="additionalCharges"
                onChange={handleChange}
                value={billData?.additionalCharges}
              />
            </div>
          </div>
          <div className="splitInputs">
            <div className="inputContainer">
              <label>Net Amount</label>
              <input
                disabled
                type="text"
                name="netAmount"
                id="netAmount"
                onChange={handleChange}
                value={billData?.netAmount}
              />
            </div>
            <div className="inputContainer">
              <label>Payment</label>
              <input
                disabled={formData?.isPaid ? true : false}
                type="text"
                name="payment"
                id="payment"
                onChange={handleChange}
                value={formData?.payment}
              />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              flexDirection: "row",
              gap: "10px",
            }}
          >
            <span>Paid</span>

            <label className="switch">
              <input
                type="checkbox"
                name="isPaid"
                checked={formData.isPaid}
                id="isPaid"
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

export default EditBillModal;
