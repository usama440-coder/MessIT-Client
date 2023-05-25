import "./Review.page.css";
import Greeting from "../../components/Greeting/Greeting.component";
import Navbar from "../../components/Navbar/Navbar.component";
import SectionBreak from "../../components/SectionBreak/SectionBreak.component";
import reviewService from "../../services/reviewService";
import Loader from "../../components/Loders";
import { FaStar } from "react-icons/fa";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Review = () => {
  const token = useSelector((state) => state.auth.user.token);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const format = {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  useEffect(() => {
    const fetcReviews = async () => {
      try {
        setLoading(true);
        const res = await reviewService.getReviews(token);
        setReviews(res?.data?.reviews || []);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetcReviews();
  }, [token]);

  return (
    <div className="menu">
      <Navbar />
      <div className="reviewContainer">
        <div className="reviewWrapper">
          <Greeting />
          <SectionBreak title="Reviews" />
          {loading ? (
            <Loader />
          ) : (
            <div className="reviewsList">
              {reviews?.map((review) => {
                return (
                  <div className="reviewBox">
                    <div className="reviewBoxHeader">
                      <p>{review?.userData.name}</p>
                      <p>
                        {new Date(review?.createdAt).toLocaleString(
                          "en-US",
                          format
                        )}
                      </p>
                      <p className="reviewBoxStar">
                        <FaStar style={{ color: "orange" }} />
                        <span>{review?.rating}</span>
                      </p>
                    </div>
                    <div className="reviewBoxItems">
                      {review?.mealData?.items?.map((item) => {
                        return (
                          <p key={item?.itemId}>
                            {item?.name}({item?.units})
                          </p>
                        );
                      })}
                    </div>
                    <div className="reviewBoxContent">
                      <p>"{review?.review}"</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Review;
