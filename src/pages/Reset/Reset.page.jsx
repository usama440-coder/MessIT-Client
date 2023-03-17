import "./Reset.page.css";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import userService from "../../services/userService";

const Reset = () => {
  const [formData, setFormData] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const user = searchParams.get("user");
  const token = searchParams.get("token");

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let loadingToast;

    if (formData.password !== formData.confirmPassword) {
      toast.error("Password not matched");
      return;
    }

    try {
      loadingToast = toast.loading("Reseting");
      const res = await userService.resetPassword(
        user,
        token,
        formData.password
      );
      toast.success(res?.data?.message);
      toast.dismiss(loadingToast);
      navigate("/login");
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(error?.response?.data?.message || "Something went wrong");
      navigate("/login");
    }
  };

  return (
    <div className="resetContainer">
      <div className="resetWrapper">
        <h2 className="modalHeading ">Reset Password</h2>
        <form>
          <div className="inputContainer">
            <label>Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData?.password || ""}
              onChange={handleChange}
            />
          </div>
          <div className="inputContainer">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={formData?.confirmPassword || ""}
              onChange={handleChange}
            />
          </div>
          <button className="modalBtn" onClick={handleSubmit}>
            Reset
          </button>
        </form>
      </div>
    </div>
  );
};

export default Reset;
