import "./Mess.page.css";
import Navbar from "../../components/Navbar/Navbar.component";
import Greeting from "../../components/Greeting/Greeting.component";
import SectionBreak from "../../components/SectionBreak/SectionBreak.component";
import CreateMessModal from "../../components/CreateMessModal/CreateMessModal.component";
import AddButton from "../../components/AddButton/AddButton.component";
import Loader from "../../components/Loders";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import messService from "../../services/messService";
import { FaEdit } from "react-icons/fa";
import { Scrollbars } from "react-custom-scrollbars-2";
import toast from "react-hot-toast";

const Mess = () => {
  const [modal, setModal] = useState(false);
  const token = useSelector((state) => state.auth.user.token);
  const [messData, setMessData] = useState([]);
  const [loading, setLoading] = useState("false");
  const [error, setError] = useState("");

  const handleClick = () => {
    setModal(true);
  };

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
        setError(err.response.message);
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
            <CreateMessModal setModal={setModal} messData={messData} />
          ) : (
            ""
          )}
          <AddButton handleClick={handleClick} />

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
                      <th>Active</th>
                      <th>Inactive</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {messData.map((mess) => {
                      return (
                        <tr key={mess._id}>
                          <td>{mess.name}</td>
                          <td>{100}</td>
                          <td>{80}</td>
                          <td>{20}</td>
                          <td>
                            <FaEdit className="tableIcon greenIcon" />
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
