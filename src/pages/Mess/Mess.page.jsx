import "./Mess.page.css";
import Navbar from "../../components/Navbar/Navbar.component";
import Greeting from "../../components/Greeting/Greeting.component";
import SectionBreak from "../../components/SectionBreak/SectionBreak.component";
import CreateMessModal from "../../components/CreateMessModal/CreateMessModal.component";
import AddButton from "../../components/AddButton/AddButton.component";
import EditMessModal from "../../components/EditMessModal/EditMessModal.component";
import Loader from "../../components/Loders";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import messService from "../../services/messService";
import { FaEdit } from "react-icons/fa";
import { Scrollbars } from "react-custom-scrollbars-2";
import toast from "react-hot-toast";

const Mess = () => {
  const [modal, setModal] = useState(false);
  const [editMessModal, setEditMessModal] = useState(false);
  const token = useSelector((state) => state.auth.user.token);
  const [messData, setMessData] = useState([]);
  const [loading, setLoading] = useState("false");
  const [currMess, setCurrMess] = useState({});

  // state updates CreateMessModal component
  const handleClick = () => {
    setModal(true);
  };

  // state updates for EditMessModal component
  const handleEditMess = (mess) => {
    setCurrMess(mess);
    setEditMessModal(true);
  };

  // passing as prop to CreateMessModal
  // instantly updates the state after API request
  const updateTable = (newEntry) => {
    setMessData([...messData, newEntry]);
  };

  // fetch data of mess
  useEffect(() => {
    const getMessData = async () => {
      try {
        setLoading(true);
        const messData = await messService.getAllMess(token);
        setMessData(messData.data.mess);
        setLoading(false);
      } catch (err) {
        toast.error(err.response.data.message);
        setLoading(false);
      }
    };
    getMessData();
  }, [token]);

  return (
    <div className="users">
      <Navbar />
      <div className="usersContainer">
        <div className="usersWrapper">
          <Greeting />
          <SectionBreak title="mess" />
          {modal ? (
            <CreateMessModal setModal={setModal} updateTable={updateTable} />
          ) : (
            ""
          )}
          {editMessModal ? (
            <EditMessModal
              setEditMessModal={setEditMessModal}
              messData={currMess}
            />
          ) : (
            ""
          )}
          <AddButton title="Create New" handleClick={handleClick} />

          {loading ? (
            <Loader />
          ) : (
            <>
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
                      <th>Users</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {messData.map((mess) => {
                      return (
                        <tr key={mess._id}>
                          <td>{mess.name}</td>
                          <td>{mess.totalUsers}</td>
                          <td>
                            <FaEdit
                              className="tableIcon greenIcon"
                              onClick={() => handleEditMess(mess)}
                            />
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

export default Mess;
