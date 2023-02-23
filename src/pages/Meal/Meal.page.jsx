import AddButton from "../../components/AddButton/AddButton.component";
import CurrentMeal from "../../components/CurrentMeal/CurrentMeal.component";
import Greeting from "../../components/Greeting/Greeting.component";
import Navbar from "../../components/Navbar/Navbar.component";
import SectionBreak from "../../components/SectionBreak/SectionBreak.component";
import CreateMealModal from "../../components/CreateMealModal/CreateMealModal.component";
import CreateMealTypeModal from "../../components/CreateMealType/CreateMealTypeModal.component";
import { Scrollbars } from "react-custom-scrollbars-2";
import { FaRegEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import "./Meal.page.css";
import { useState, useEffect } from "react";
import mealTypeService from "../../services/mealTypeService";
import { useSelector } from "react-redux";
import itemService from "../../services/itemService";
import mealService from "../../services/mealService";
import Loader from "../../components/Loders";
import userMealService from "../../services/userMealService";

const Meal = () => {
  const token = useSelector((state) => state.auth.user.token);
  const [loading, setLoading] = useState(false);
  const [currentMealsData, setCurrentMealsData] = useState([]);
  const [prevMealsData, setPrevMealsData] = useState([]);
  const [mealTypesData, setMealTypesData] = useState([]);
  const [itemsData, setItemsData] = useState([]);
  const [createMealTypeModal, setCreateMealTypeModal] = useState(false);
  const [createMealModal, setCreateMealModal] = useState(false);
  const [userMeals, setUserMeals] = useState([]);

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
        const mealType = await mealTypeService.getMealType(token);
        const items = await itemService.getItems(token);
        const meals = await mealService.getMeals(token);
        const userMeals = await userMealService.getAllUserMeals(token);
        setMealTypesData(mealType?.data?.mealTypes);
        setItemsData(items?.data?.items);
        setCurrentMealsData(meals?.data?.currentMeals);
        setPrevMealsData(meals?.data?.prevMeals);
        setUserMeals(userMeals?.data?.userMeals);
        setLoading(() => false);
      } catch (error) {
        setLoading(() => false);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div className="meal">
      <Navbar />
      <div className="mealContainer">
        <div className="mealWrapper">
          <Greeting />
          <SectionBreak title="current meals" />
          <AddButton title="Add Meal" handleClick={handleCreateMeal} />
          <AddButton title="Add Meal Type" handleClick={handleCreateMealType} />
          {createMealModal ? (
            <CreateMealModal
              mealTypesData={mealTypesData}
              itemsData={itemsData}
              setCreateMealModal={setCreateMealModal}
            />
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

          {loading ? (
            <Loader />
          ) : (
            <>
              <div className="currentMealContainer">
                {currentMealsData?.map((meal) => {
                  return (
                    <CurrentMeal
                      key={meal._id}
                      meal={meal}
                      mealTypesData={mealTypesData}
                      itemsData={itemsData}
                    />
                  );
                })}
              </div>
              <SectionBreak title="Meal types" />
              <Scrollbars
                autoHeight
                autoHeightMin={50}
                autoHeightMax={1000}
                autoHide
              >
                <table className="table" cellSpacing={0}>
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {mealTypesData?.map((mealType) => (
                      <tr key={mealType._id}>
                        <td>{mealType?.type}</td>
                        <td>
                          <FaEdit className="tableIcon greenIcon" />
                          <FaTrashAlt className="tableIcon redIcon" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Scrollbars>
              <SectionBreak title="Previous meals" />
              <div className="tableFilters">
                <div className="showEntries">
                  <p className="showEntries">Show Entries</p>
                  <input className="showEntriesInput" type="text" />
                </div>
                <div className="filters">
                  <select
                    className="filtersSelect"
                    name="type"
                    defaultValue={"Type"}
                  >
                    <option name="select" id="select" disabled>
                      Type
                    </option>
                    <option name="breakfast" id="breakfast">
                      Breakfast
                    </option>
                    <option name="lunch" id="lunch">
                      Lunch
                    </option>
                    <option name="dinner" id="dinner">
                      Dinner
                    </option>
                  </select>
                </div>
              </div>
              <Scrollbars
                autoHeight
                autoHeightMin={300}
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
                        <tr>
                          <td>{meal?.mealData?.type}</td>
                          <td>{meal?.mealData?.items?.length}</td>
                          <td>
                            {new Date(meal?.mealData?.updatedAt).toLocaleString(
                              "en-US",
                              format
                            )}
                          </td>
                          <td>
                            <FaRegEye className="tableIcon orangeIcon" />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </Scrollbars>
              <Scrollbars
                autoHeight
                autoHeightMin={300}
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
                            <FaRegEye className="tableIcon orangeIcon" />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </Scrollbars>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Meal;
