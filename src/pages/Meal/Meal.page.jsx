import AddButton from "../../components/AddButton/AddButton.component";
import CurrentMeal from "../../components/CurrentMeal/CurrentMeal.component";
import Greeting from "../../components/Greeting/Greeting.component";
import Navbar from "../../components/Navbar/Navbar.component";
import SectionBreak from "../../components/SectionBreak/SectionBreak.component";
import CreateMealModal from "../../components/CreateMealModal/CreateMealModal.component";
import { Scrollbars } from "react-custom-scrollbars-2";
import { FaRegEye } from "react-icons/fa";
import "./Meal.page.css";
import { useState } from "react";

const Meal = () => {
  const [modal, setModal] = useState(false);
  const handleClick = () => {
    setModal(true);
  };

  return (
    <div className="meal">
      <Navbar />
      <div className="mealContainer">
        <div className="mealWrapper">
          <Greeting />
          <SectionBreak title="current meals" />
          <AddButton handleClick={handleClick} />
          {modal ? <CreateMealModal setModal={setModal} /> : ""}
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
