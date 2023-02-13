import "./Users.page.css";
import Navbar from "../../components/Navbar/Navbar.component";
import Greeting from "../../components/Greeting/Greeting.component";
import SectionBreak from "../../components/SectionBreak/SectionBreak.component";
import CreateUserModal from "../../components/CreateUserModal/CreateUserModal.component";
import EditUserModal from "../../components/EditUserModal/EditUserModal.component";
import AddButton from "../../components/AddButton/AddButton.component";
import Loader from "../../components/Loders";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import userService from "../../services/userService";
import messService from "../../services/messService";
import { FaEdit, FaTrashAlt, FaRegEye } from "react-icons/fa";
import { Scrollbars } from "react-custom-scrollbars-2";
import toast from "react-hot-toast";

const Users = () => {
  const [createUserModal, setCreateUserModal] = useState(false);
  const [editUserModal, setEditUserModal] = useState(false);
  const token = useSelector((state) => state.auth.user.token);
  const [usersData, setUsersData] = useState([]);
  const [messData, setMessData] = useState([]);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState("false");

  const handleClick = () => {
    setCreateUserModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await userService.deleteUser(id, token);
      toast.success("User deleted successfully");
      setUsersData(usersData?.filter((user) => user._id !== id));
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const handleUserEdit = (user) => {
    setUserData(user);
    setEditUserModal(() => true);
  };

  useEffect(() => {
    const getUsersData = async () => {
      try {
        setLoading(true);
        const usersData = await userService.getUsers(token);
        const messData = await messService.getAllMess(token);
        setUsersData(usersData.data.users);
        setMessData(messData.data.mess);
        setLoading(false);
      } catch (err) {
        toast.error(err.response.data.message);
        setLoading(false);
      }
    };
    getUsersData();
  }, [token]);

  return (
    <div className="users">
      <Navbar />
      <div className="usersContainer">
        <div className="usersWrapper">
          <Greeting />
          <SectionBreak title="users" />
          {createUserModal ? (
            <CreateUserModal
              setCreateUserModal={setCreateUserModal}
              usersData={usersData}
              messData={messData}
            />
          ) : (
            ""
          )}
          {editUserModal ? (
            <EditUserModal
              setEditUserModal={setEditUserModal}
              messData={messData}
              userData={userData}
            />
          ) : (
            ""
          )}
          <AddButton title="Add User" handleClick={handleClick} />

          {loading ? (
            <Loader />
          ) : (
            <>
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
                      <th>Name</th>
                      <th>Email</th>
                      <th>Contact</th>
                      <th>Role</th>
                      <th>Mess</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersData?.map((user) => {
                      return (
                        <tr key={user.email}>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.contact}</td>
                          <td>{user.role}</td>
                          <td>{user.messData.name}</td>
                          <td className="badgeCell">
                            {user.isActive ? (
                              <span className="badge badge-green">Active</span>
                            ) : (
                              <span className="badge badge-red">Inactive</span>
                            )}
                          </td>

                          <td>
                            <FaEdit
                              className="tableIcon greenIcon"
                              onClick={() => handleUserEdit(user)}
                            />
                            <FaTrashAlt
                              className="tableIcon redIcon"
                              onClick={() => handleDelete(user._id)}
                            />
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

export default Users;
