import AddButton from "../../components/AddButton/AddButton.component";
import CurrentMeal from "../../components/CurrentMeal/CurrentMeal.component";
import Greeting from "../../components/Greeting/Greeting.component";
import Navbar from "../../components/Navbar/Navbar.component";
import SectionBreak from "../../components/SectionBreak/SectionBreak.component";
import CreateMealModal from "../../components/CreateMealModal/CreateMealModal.component";
import CreateMealTypeModal from "../../components/CreateMealType/CreateMealTypeModal.component";
import { Scrollbars } from "react-custom-scrollbars-2";
import { FaRegEye } from "react-icons/fa";
import "./Meal.page.css";
import { useState, useEffect } from "react";
import messService from "../../services/messService";
import mealTypeService from "../../services/mealTypeService";
import { useSelector } from "react-redux";

const Meal = () => {
  const token = useSelector((state) => state.auth.user.token);
  const [loading, setLoading] = useState(false);
  const [messData, setMessData] = useState([]);
  const [mealsData, setMealsData] = useState([]);
  const [mealTypeData, setMealTypeData] = useState([]);

  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const handleClick1 = () => {
    setModal1(true);
  };
  const handleClick2 = () => {
    setModal2(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mess = await messService.getAllMess(token);
        const mealType = await mealTypeService.getMealType(token);
        setMealTypeData(mealType.data.mealTypes);
        setMessData(mess.data.mess);
      } catch (error) {
        console.log(error);
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
          <AddButton title="Add Meal" handleClick={handleClick1} />
          <AddButton title="Add Meal Type" handleClick={handleClick2} />
          {modal1 ? (
            <CreateMealModal
              mealTypeData={mealTypeData}
              messData={messData}
              setModal1={setModal1}
            />
          ) : (
            ""
          )}
          {modal2 ? (
            <CreateMealTypeModal messData={messData} setModal2={setModal2} />
          ) : (
            ""
          )}
          <div className="currentMealContainer">
            <CurrentMeal />
            <CurrentMeal />
            <CurrentMeal />
          </div>
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
                  <th>Total Users</th>
                  <th>Total Items</th>
                  <th>Units</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Lunch</td>
                  <td>70</td>
                  <td>2</td>
                  <td>220</td>
                  <td>
                    <FaRegEye className="tableIcon orangeIcon" />
                  </td>
                </tr>
                <tr>
                  <td>Lunch</td>
                  <td>70</td>
                  <td>2</td>
                  <td>220</td>
                  <td>
                    <FaRegEye className="tableIcon orangeIcon" />
                  </td>
                </tr>
                <tr>
                  <td>Lunch</td>
                  <td>70</td>
                  <td>2</td>
                  <td>220</td>
                  <td>
                    <FaRegEye className="tableIcon orangeIcon" />
                  </td>
                </tr>
                <tr>
                  <td>Lunch</td>
                  <td>70</td>
                  <td>2</td>
                  <td>220</td>
                  <td>
                    <FaRegEye className="tableIcon orangeIcon" />
                  </td>
                </tr>
                <tr>
                  <td>Lunch</td>
                  <td>70</td>
                  <td>2</td>
                  <td>220</td>
                  <td>
                    <FaRegEye className="tableIcon orangeIcon" />
                  </td>
                </tr>
              </tbody>
            </table>
          </Scrollbars>
        </div>
      </div>
    </div>
  );
};

export default Meal;
