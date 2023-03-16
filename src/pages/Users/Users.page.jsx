import "./Users.page.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Scrollbars } from "react-custom-scrollbars-2";
import toast from "react-hot-toast";
import Navbar from "../../components/Navbar/Navbar.component";
import Greeting from "../../components/Greeting/Greeting.component";
import SectionBreak from "../../components/SectionBreak/SectionBreak.component";
import AddButton from "../../components/AddButton/AddButton.component";
import Loader from "../../components/Loders";
import ConfirmDeleteUserModal from "../../components/ConfirmModal/ConfirmDeleteUserModal.component";
import CreateUserModal from "../../components/CreateUserModal/CreateUserModal.component";
import EditUserModal from "../../components/EditUserModal/EditUserModal.component";
import userService from "../../services/userService";
import messService from "../../services/messService";

const Users = () => {
  const token = useSelector((state) => state.auth.user.token);
  const [usersData, setUsersData] = useState([]);
  const [messData, setMessData] = useState([]);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [createUserModal, setCreateUserModal] = useState(false);
  const [editUserModal, setEditUserModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);

  // states for filteration
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(50);
  const [mess, setMess] = useState("");

  // pagination
  const pages = new Array(totalPages).fill(null).map((v, i) => i);

  // CreateUserModal state
  const handleClick = () => {
    setCreateUserModal(true);
  };

  // delete user and ConfirmModal
  const handleDelete = (user) => {
    setUserData(user);
    setConfirmModal(() => true);
  };

  // EditUserModal state
  const handleUserEdit = (user) => {
    setUserData(user);
    setEditUserModal(() => true);
  };

  // update table instantly after API call
  // in CreateUserModal
  const updateTable = (newEntry) => {
    setUsersData([...usersData, newEntry]);
  };

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        setLoading(true);
        const usersData = await userService.getUsers(
          token,
          pageNumber,
          pageSize,
          mess
        );
        const messData = await messService.getAllMess(token);
        setUsersData(usersData.data.users);
        setMessData(messData.data.mess);
        setTotalPages(usersData?.data?.totalPages);
        setLoading(false);
      } catch (err) {
        toast.error(err.response.data.message);
        setLoading(false);
      }
    };
    fetchUsersData();
  }, [token, pageNumber, pageSize, mess]);

  return (
    <div className="users">
      <Navbar />
      <div className="usersContainer">
        <div className="usersWrapper">
          <Greeting />
          <SectionBreak title="users" />
          {confirmModal ? (
            <ConfirmDeleteUserModal
              userData={userData}
              setConfirmModal={setConfirmModal}
              setUsersData={setUsersData}
              usersData={usersData}
            />
          ) : (
            ""
          )}
          {createUserModal ? (
            <CreateUserModal
              setCreateUserModal={setCreateUserModal}
              usersData={usersData}
              messData={messData}
              updateTable={updateTable}
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
                  Show Entries
                  <select
                    className="filtersSelect"
                    name="mess"
                    defaultValue={pageSize}
                    onChange={(e) => setPageSize(e.target.value)}
                  >
                    <option name="select" id="select" value={50}>
                      50
                    </option>
                    <option name="ABE" id="ABE" value={100}>
                      100
                    </option>
                    <option name="CD" id="CD" value={200}>
                      200
                    </option>
                  </select>
                </div>
                <div className="filters">
                  {/* <input
                    className="filtersSearch"
                    type="text"
                    placeholder="Search User ID"
                  /> */}
                  <select
                    className="filtersSelect"
                    name="mess"
                    defaultValue={mess}
                    onChange={(e) => setMess(e.target.value)}
                  >
                    <option value="">All</option>
                    {messData?.map((mess) => {
                      return (
                        <option key={mess?._id} value={mess?._id}>
                          {mess?.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <Scrollbars
                autoHeight
                autoHide
                autoHeightMin={200}
                autoHeightMax={1000}
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
                          <td>
                            {user.role.map((role) => {
                              return (
                                <span key={`${user.email}-${role}`}>
                                  {role}{" "}
                                </span>
                              );
                            })}
                          </td>

                          <td>{user.messData.name}</td>
                          <td className="badgeCell">
                            {user.isActive ? (
                              <span className="tableBadge badge-green">
                                Active
                              </span>
                            ) : (
                              <span className="tableBadge badge-red">
                                Inactive
                              </span>
                            )}
                          </td>

                          <td>
                            <FaEdit
                              className="tableIcon greenIcon"
                              onClick={() => handleUserEdit(user)}
                            />
                            <FaTrashAlt
                              className="tableIcon redIcon"
                              onClick={() => handleDelete(user)}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </Scrollbars>
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

export default Users;
