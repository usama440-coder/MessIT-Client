import AddButton from "../../components/AddButton/AddButton.component";
import CurrentMeal from "../../components/CurrentMeal/CurrentMeal.component";
import Greeting from "../../components/Greeting/Greeting.component";
import Navbar from "../../components/Navbar/Navbar.component";
import SectionBreak from "../../components/SectionBreak/SectionBreak.component";
import CreateMealModal from "../../components/CreateMealModal/CreateMealModal.component";
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
        </div>
      </div>
    </div>
  );
};

export default Meal;
