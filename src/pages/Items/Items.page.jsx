import { useState } from "react";
import AddButton from "../../components/AddButton/AddButton.component";
import CreateItemModal from "../../components/CreateItemModal/CreateItemModal.component";
import Greeting from "../../components/Greeting/Greeting.component";
import Navbar from "../../components/Navbar/Navbar.component";
import SectionBreak from "../../components/SectionBreak/SectionBreak.component";
import { FaEdit, FaTrashAlt, FaRegEye } from "react-icons/fa";
import { Scrollbars } from "react-custom-scrollbars-2";
import "./Items.page.css";

const Items = () => {
  const [modal, setModal] = useState(false);
  const handleClick = () => {
    setModal(true);
  };

  return (
    <div className="items">
      <Navbar />
      <div className="itemsContainer">
        <div className="itemsWrapper">
          <Greeting />
          <SectionBreak title="items" />
          {modal ? <CreateItemModal setModal={setModal} /> : ""}
          <AddButton handleClick={handleClick} />
          <Scrollbars
            autoHeight
            autoHeightMin={300}
            autoHeightMax={1000}
            autoHide
          >
            <table className="table" cellSpacing={0}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Units</th>
                  <th>Rating</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>035410</td>
                  <td>Chicken Qorma</td>
                  <td>120</td>
                  <td>4.2</td>
                  <td>
                    <FaEdit className="tableIcon greenIcon" />
                    <FaTrashAlt className="tableIcon redIcon" />
                    <FaRegEye className="tableIcon orangeIcon" />
                  </td>
                </tr>
                <tr>
                  <td>035410</td>
                  <td>Chicken Qorma</td>
                  <td>120</td>
                  <td>4.2</td>
                  <td>
                    <FaEdit className="tableIcon greenIcon" />
                    <FaTrashAlt className="tableIcon redIcon" />
                    <FaRegEye className="tableIcon orangeIcon" />
                  </td>
                </tr>
                <tr>
                  <td>035410</td>
                  <td>Chicken Qorma</td>
                  <td>120</td>
                  <td>4.2</td>
                  <td>
                    <FaEdit className="tableIcon greenIcon" />
                    <FaTrashAlt className="tableIcon redIcon" />
                    <FaRegEye className="tableIcon orangeIcon" />
                  </td>
                </tr>
                <tr>
                  <td>035410</td>
                  <td>Chicken Qorma</td>
                  <td>120</td>
                  <td>4.2</td>
                  <td>
                    <FaEdit className="tableIcon greenIcon" />
                    <FaTrashAlt className="tableIcon redIcon" />
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

export default Items;
