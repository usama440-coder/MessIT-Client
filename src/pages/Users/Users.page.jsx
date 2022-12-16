import "./Users.page.css";
import Navbar from "../../components/Navbar/Navbar.component";
import Greeting from "../../components/Greeting/Greeting.component";
import SectionBreak from "../../components/SectionBreak/SectionBreak.component";
import { useState } from "react";
import { FaEdit, FaTrashAlt, FaRegEye } from "react-icons/fa";
import { Scrollbars } from "react-custom-scrollbars-2";
import CreateUserModal from "../../components/CreateUserModal/CreateUserModal.component";
import AddButton from "../../components/AddButton/AddButton.component";

const Users = () => {
  const [modal, setModal] = useState(false);
  const handleClick = () => {
    setModal(true);
  };
  return (
    <div className="users">
      <Navbar />
      <div className="usersContainer">
        <div className="usersWrapper">
          <Greeting />
          <SectionBreak title="users" />
          {modal ? <CreateUserModal setModal={setModal} /> : ""}
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
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Role</th>
                  <th>Mess</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>035410</td>
                  <td>Usama Shaukat</td>
                  <td>usamamian440@gmail.com</td>
                  <td>03404403500</td>
                  <td>Admin</td>
                  <td>ABE</td>
                  <td>
                    <FaEdit className="tableIcon greenIcon" />
                    <FaTrashAlt className="tableIcon redIcon" />
                    <FaRegEye className="tableIcon orangeIcon" />
                  </td>
                </tr>
                <tr>
                  <td>035410</td>
                  <td>Usama Shaukat</td>
                  <td>usamamian440@gmail.com</td>
                  <td>03404403500</td>
                  <td>Admin</td>
                  <td>ABE</td>
                  <td>
                    <FaEdit className="tableIcon greenIcon" />
                    <FaTrashAlt className="tableIcon redIcon" />
                    <FaRegEye className="tableIcon orangeIcon" />
                  </td>
                </tr>
                <tr>
                  <td>035410</td>
                  <td>Usama Shaukat</td>
                  <td>usamamian440@gmail.com</td>
                  <td>03404403500</td>
                  <td>Admin</td>
                  <td>ABE</td>
                  <td>
                    <FaEdit className="tableIcon greenIcon" />
                    <FaTrashAlt className="tableIcon redIcon" />
                    <FaRegEye className="tableIcon orangeIcon" />
                  </td>
                </tr>
                <tr>
                  <td>035410</td>
                  <td>Usama Shaukat</td>
                  <td>usamamian440@gmail.com</td>
                  <td>03404403500</td>
                  <td>Admin</td>
                  <td>ABE</td>
                  <td>
                    <FaEdit className="tableIcon greenIcon" />
                    <FaTrashAlt className="tableIcon redIcon" />
                    <FaRegEye className="tableIcon orangeIcon" />
                  </td>
                </tr>
                <tr>
                  <td>035410</td>
                  <td>Usama Shaukat</td>
                  <td>usamamian440@gmail.com</td>
                  <td>03404403500</td>
                  <td>Admin</td>
                  <td>ABE</td>
                  <td>
                    <FaEdit className="tableIcon greenIcon" />
                    <FaTrashAlt className="tableIcon redIcon" />
                    <FaRegEye className="tableIcon orangeIcon" />
                  </td>
                </tr>
                <tr>
                  <td>035410</td>
                  <td>Usama Shaukat</td>
                  <td>usamamian440@gmail.com</td>
                  <td>03404403500</td>
                  <td>Admin</td>
                  <td>ABE</td>
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

export default Users;
