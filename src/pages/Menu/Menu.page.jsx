import Greeting from "../../components/Greeting/Greeting.component";
import Navbar from "../../components/Navbar/Navbar.component";
import SectionBreak from "../../components/SectionBreak/SectionBreak.component";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "./Menu.page.css";
import AddButton from "../../components/AddButton/AddButton.component";
import AddMenuModal from "../../components/AddMenuModal/AddMenuModal.component";
import { useState } from "react";
import "react-accessible-accordion/dist/fancy-example.css";

const Menu = () => {
  const [modal, setModal] = useState(false);
  const handleClick = () => {
    setModal(true);
  };

  return (
    <div className="menu">
      <Navbar />
      <div className="menuContainer">
        <div className="menuWrapper">
          <Greeting />
          <SectionBreak title="Menu" />
          {modal ? <AddMenuModal setModal={setModal} /> : ""}
          <AddButton handleClick={handleClick} />

          <Accordion>
            <AccordionItem>
              <AccordionItemHeading>
                <AccordionItemButton>
                  What harsh truths do you prefer to ignore?
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <p>
                  Exercitation in fugiat est ut ad ea cupidatat ut in cupidatat
                  occaecat ut occaecat consequat est minim minim esse tempor
                  laborum consequat esse adipisicing eu reprehenderit enim.
                </p>
              </AccordionItemPanel>
            </AccordionItem>
          </Accordion>

          {/* <table className="table" cellSpacing={0}>
            <thead>
              <tr>
                <th>Day</th>
                <th>Breakfast</th>
                <th>Lunch</th>
                <th>Dinner</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Monday</td>
                <td>paratha(20) + fried Egg(30) + Tea(10) + Channy(70)</td>
                <td>roti(20) + chicken boneless(30)</td>
                <td>roti(20) + chicken pulao(30)</td>
                <td>
                  <FaEdit className="tableIcon greenIcon" />
                  <FaTrashAlt className="tableIcon redIcon" />
                </td>
              </tr>
              <tr>
                <td>Monday</td>
                <td>paratha(20) + fried Egg(30) + Tea(10) + Channy(70)</td>
                <td>roti(20) + chicken boneless(30)</td>
                <td>roti(20) + chicken pulao(30)</td>
                <td>
                  <FaEdit className="tableIcon greenIcon" />
                  <FaTrashAlt className="tableIcon redIcon" />
                </td>
              </tr>
              <tr>
                <td>Monday</td>
                <td>paratha(20) + fried Egg(30) + Tea(10) + Channy(70)</td>
                <td>roti(20) + chicken boneless(30)</td>
                <td>roti(20) + chicken pulao(30)</td>
                <td>
                  <FaEdit className="tableIcon greenIcon" />
                  <FaTrashAlt className="tableIcon redIcon" />
                </td>
              </tr>
              <tr>
                <td>Monday</td>
                <td>paratha(20) + fried Egg(30) + Tea(10) + Channy(70)</td>
                <td>roti(20) + chicken boneless(30)</td>
                <td>roti(20) + chicken pulao(30)</td>
                <td>
                  <FaEdit className="tableIcon greenIcon" />
                  <FaTrashAlt className="tableIcon redIcon" />
                </td>
              </tr>
              <tr>
                <td>Monday</td>
                <td>paratha(20) + fried Egg(30) + Tea(10) + Channy(70)</td>
                <td>roti(20) + chicken boneless(30)</td>
                <td>roti(20) + chicken pulao(30)</td>
                <td>
                  <FaEdit className="tableIcon greenIcon" />
                  <FaTrashAlt className="tableIcon redIcon" />
                </td>
              </tr>
              <tr>
                <td>Monday</td>
                <td>paratha(20) + fried Egg(30) + Tea(10) + Channy(70)</td>
                <td>roti(20) + chicken boneless(30)</td>
                <td>roti(20) + chicken pulao(30)</td>
                <td>
                  <FaEdit className="tableIcon greenIcon" />
                  <FaTrashAlt className="tableIcon redIcon" />
                </td>
              </tr>
            </tbody>
          </table> */}
        </div>
      </div>
    </div>
  );
};

export default Menu;
