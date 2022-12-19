import AddButton from "../../components/AddButton/AddButton.component";
import Greeting from "../../components/Greeting/Greeting.component";
import Navbar from "../../components/Navbar/Navbar.component";
import SectionBreak from "../../components/SectionBreak/SectionBreak.component";
import CreateBillModal from "../../components/CreateBillModal/CreateBillModal.component";
import "./Billing.page.css";
import { FaEdit, FaTrashAlt, FaRegEye } from "react-icons/fa";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useState } from "react";

const Billing = () => {
  const [modal, setModal] = useState(false);
  const handleClick = () => {
    setModal(true);
  };

  return (
    <div className="billing">
      <Navbar />
      <div className="billingContainer">
        <div className="billingWrapper">
          <Greeting />
          <SectionBreak title="Billing" />
          {modal ? <CreateBillModal setModal={setModal} /> : ""}
          <AddButton handleClick={handleClick} />
          <div className="tableFilters">
            <div className="showEntries">
              <p className="showEntries">Show Entries</p>
              <input className="showEntriesInput" type="text" />
            </div>
            <div className="filters">
              <input
                className="filtersSearch"
                type="text"
                placeholder="Search User ID"
              />
              <select
                className="filtersSelect"
                name="mess"
                defaultValue={"Mess"}
              >
                <option name="select" id="select" disabled>
                  Mess
                </option>
                <option name="ABE" id="ABE">
                  ABE
                </option>
                <option name="CD" id="CD">
                  CD
                </option>
                <option name="JH" id="JH">
                  JH
                </option>
              </select>
              <select
                className="filtersSelect"
                name="mess"
                defaultValue={"Status"}
              >
                <option name="select" id="select" disabled>
                  Status
                </option>
                <option name="ABE" id="ABE">
                  paid
                </option>
                <option name="CD" id="CD">
                  unpaid
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
                  <th>Bill ID</th>
                  <th>Date Range</th>
                  <th>Amount</th>
                  <th>Cashier</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>035410</td>
                  <td>Dec 28, 2022 - Jan 28, 2023</td>
                  <td>5600/-</td>
                  <td>Shah G</td>
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

export default Billing;
