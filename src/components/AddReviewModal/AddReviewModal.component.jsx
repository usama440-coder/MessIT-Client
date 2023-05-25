import "./AddReviewModal.component.css";

import { FaTimes } from "react-icons/fa";
import reviewService from "../../services/reviewService";
import { useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const AddReviewModal = ({ userMealId, setAddReviewModal }) => {
  const token = useSelector((state) => state.auth.user.token);
  const [formData, setFormData] = useState({});
  const [btnLoading, setBtnLoading] = useState(false);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    try {
      await reviewService.addReview(userMealId, formData, token);
      setFormData({});
      toast.success("Review added successfully");
      setAddReviewModal(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
    setBtnLoading(false);
  };

  return (
    <div className="modal">
      <div className="modalContainer">
        <h2 className="modalHeading">Add a Review</h2>
        <FaTimes
          className="modalCross"
          onClick={() => setAddReviewModal(false)}
        />
        <form>
          <div className="inputContainer">
            <label>Review</label>
            <input
              type="text"
              name="review"
              id="review"
              value={formData?.review || ""}
              onChange={handleChange}
            />
          </div>
          <div className="inputContainer">
            <label>Rating (1-5)</label>
            <input
              type="number"
              name="rating"
              id="rating"
              value={formData?.rating || ""}
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

export default AddReviewModal;
