import AddButton from "../../components/AddButton/AddButton.component";
import CurrentMeal from "../../components/CurrentMeal/CurrentMeal.component";
import Greeting from "../../components/Greeting/Greeting.component";
import Navbar from "../../components/Navbar/Navbar.component";
import SectionBreak from "../../components/SectionBreak/SectionBreak.component";
import CreateMealModal from "../../components/CreateMealModal/CreateMealModal.component";
import CreateMealTypeModal from "../../components/CreateMealType/CreateMealTypeModal.component";
import { Scrollbars } from "react-custom-scrollbars-2";
import { FaRegEye, FaPencilAlt } from "react-icons/fa";
import "./Meal.page.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import mealService from "../../services/mealService";
import Loader from "../../components/Loders";
import userMealService from "../../services/userMealService";
import { Link } from "react-router-dom";
import ViewUserMealModal from "../../components/ViewModal/ViewUserMealModal.component";
import AddReviewModal from "../../components/AddReviewModal/AddReviewModal.component";

const Meal = () => {
  const token = useSelector((state) => state.auth.user.token);
  const role = useSelector((state) => state.auth.role);
  const [loading, setLoading] = useState(false);
  const [currentMealsData, setCurrentMealsData] = useState([]);
  const [prevMealsData, setPrevMealsData] = useState([]);
  const [userMeals, setUserMeals] = useState([]);
  const [currUserMeal, setCurrUserMeal] = useState("");

  // modals
  const [createMealTypeModal, setCreateMealTypeModal] = useState(false);
  const [createMealModal, setCreateMealModal] = useState(false);
  const [viewUserMealModal, setViewUserMealModal] = useState(false);
  const [addReviewModal, setAddReviewModal] = useState(false);

  // states for filteration
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(50);

  // pagination
  const pages = new Array(totalPages).fill(null).map((v, i) => i);

  const format = {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  const handleCreateMealType = () => {
    setCreateMealTypeModal(true);
  };
  const handleCreateMeal = () => {
    setCreateMealModal(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(() => true);
      try {
        const currMeals = await mealService.getCurrentMeals(token);

        if (role === "secretary" || role === "staff") {
          const prevMeals = await mealService.getPreviousMeals(
            token,
            pageNumber,
            pageSize
          );
          setPrevMealsData(prevMeals?.data?.previousMeals);
          setTotalPages(prevMeals?.data?.totalPages);
        }

        if (role === "user") {
          const userMeals = await userMealService.getAllUserMeals(
            token,
            pageNumber,
            pageSize
          );
          setUserMeals(userMeals?.data?.userMeals);
          setTotalPages(userMeals?.data?.totalPages);
        }
        setCurrentMealsData(currMeals?.data?.currentMeals);
        setLoading(() => false);
      } catch (error) {
        setLoading(() => false);
      }
    };

    fetchData();
  }, [token, role, pageNumber, pageSize]);

  const handleClick = (id) => {
    setCurrUserMeal(id);
    setViewUserMealModal(true);
  };

  const handleReviewModal = (id) => {
    setCurrUserMeal(id);
    setAddReviewModal(true);
  };

  return (
    <div className="meal">
      <Navbar />
      <div className="mealContainer">
        <div className="mealWrapper">
          <Greeting />
          <SectionBreak title="current meals" />
          {role === "staff" ? (
            <AddButton title="Add Meal" handleClick={handleCreateMeal} />
          ) : (
            ""
          )}

          {role === "secretary" ? (
            <AddButton
              title="Add Meal Type"
              handleClick={handleCreateMealType}
            />
          ) : (
            ""
          )}
          {createMealModal ? (
            <CreateMealModal setCreateMealModal={setCreateMealModal} />
          ) : (
            ""
          )}
          {createMealTypeModal ? (
            <CreateMealTypeModal
              setCreateMealTypeModal={setCreateMealTypeModal}
            />
          ) : (
            ""
          )}

          {addReviewModal ? (
            <AddReviewModal
              userMealId={currUserMeal}
              setAddReviewModal={setAddReviewModal}
            />
          ) : (
            ""
          )}

          {viewUserMealModal ? (
            <ViewUserMealModal
              userMealId={currUserMeal}
              setViewUserMealModal={setViewUserMealModal}
            />
          ) : (
            ""
          )}

          {loading ? (
            <Loader />
          ) : (
            <>
              <div className="currentMealContainer">
                {currentMealsData?.map((meal) => {
                  return <CurrentMeal key={meal._id} meal={meal} />;
                })}
              </div>
              <SectionBreak title="Previous meals" />
              <div className="tableFilters">
                <div className="showEntries">
                  Show Entries
                  <select
                    className="filtersSelect"
                    name="mess"
                    defaultValue={pageSize}
                    onChange={(e) => setPageSize(e.target.value)}
                  >
                    <option id="select" value={50}>
                      50
                    </option>
                    <option id="ABE" value={100}>
                      100
                    </option>
                    <option id="CD" value={200}>
                      200
                    </option>
                  </select>
                </div>
                <div className="filters"></div>
              </div>
              {role === "user" ? (
                <>
                  <Scrollbars
                    autoHeight
                    autoHeightMin={100}
                    autoHeightMax={1000}
                    autoHide
                  >
                    <table className="table" cellSpacing={0}>
                      <thead>
                        <tr>
                          <th>Type</th>
                          <th>Items</th>
                          <th>Serving Time</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {userMeals?.map((meal) => {
                          return (
                            <tr key={meal?._id}>
                              <td>{meal?.mealData?.type}</td>
                              <td>{meal?.mealData?.items?.length}</td>
                              <td>
                                {new Date(
                                  meal?.mealData?.updatedAt
                                ).toLocaleString("en-US", format)}
                              </td>
                              <td>
                                <FaRegEye
                                  className="tableIcon orangeIcon"
                                  onClick={() =>
                                    handleClick(meal?.mealData?._id)
                                  }
                                />
                                <FaPencilAlt
                                  className="tableIcon greenIcon"
                                  onClick={() =>
                                    handleReviewModal(meal?.mealData?._id)
                                  }
                                />
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </Scrollbars>
                </>
              ) : (
                ""
              )}

              {role === "secretary" || role === "staff" ? (
                <>
                  <Scrollbars
                    autoHeight
                    autoHeightMin={100}
                    autoHeightMax={1000}
                    autoHide
                  >
                    <table className="table" cellSpacing={0}>
                      <thead>
                        <tr>
                          <th>Type</th>
                          <th>Items</th>
                          <th>Users</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {prevMealsData?.map((meal) => {
                          return (
                            <tr key={meal?._id}>
                              <td>{meal?.type}</td>
                              <td>{meal?.items?.length}</td>
                              <td>{meal?.totalUsers}</td>
                              <td>
                                <Link
                                  to={`/userMeals/${meal?._id}`}
                                  target="_blank"
                                >
                                  <FaRegEye className="tableIcon orangeIcon" />
                                </Link>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </Scrollbars>
                </>
              ) : (
                " "
              )}
              <div className="pagination">
                {pages.map((i) => {
                  return (
                    <button
                      key={i}
                      className={
                        i === pageNumber
                          ? "activePagination paginationBtn"
                          : "paginationBtn"
                      }
                      onClick={() => setPageNumber(i)}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Meal;
