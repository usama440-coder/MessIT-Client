import { useEffect, useState } from "react";
import AddButton from "../../components/AddButton/AddButton.component";
import CreateItemModal from "../../components/CreateItemModal/CreateItemModal.component";
import Greeting from "../../components/Greeting/Greeting.component";
import Navbar from "../../components/Navbar/Navbar.component";
import SectionBreak from "../../components/SectionBreak/SectionBreak.component";
import { FaEdit, FaTrashAlt, FaRegEye } from "react-icons/fa";
import { Scrollbars } from "react-custom-scrollbars-2";
import "./Items.page.css";
import itemService from "../../services/itemService";
import { useSelector } from "react-redux";
import messService from "../../services/messService";
import Loader from "../../components/Loders";

const Items = () => {
  const token = useSelector((state) => state.auth.user.token);
  const [modal, setModal] = useState(false);
  const [itemsData, setItemsData] = useState([]);
  const [messData, setMessData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setModal(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const items = await itemService.getItems(token);
        const mess = await messService.getAllMess(token);
        setItemsData(items?.data?.items);
        setMessData(mess?.data?.mess);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div className="items">
      <Navbar />
      <div className="itemsContainer">
        <div className="itemsWrapper">
          <Greeting />
          <SectionBreak title="items" />
          {modal ? (
            <CreateItemModal setModal={setModal} messData={messData} />
          ) : (
            ""
          )}
          <AddButton title="Add Item" handleClick={handleClick} />
          {loading ? (
            <Loader />
          ) : (
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
                    <th>Units</th>
                    <th>Rating</th>
                    <th>Mess</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {itemsData.map((item) => {
                    return (
                      <tr key={item._id}>
                        <td>{item.name}</td>
                        <td>{item.units}</td>
                        <td>{3.2}</td>
                        <td>{item.messData.name}</td>
                        <td>
                          <FaEdit className="tableIcon greenIcon" />
                          <FaTrashAlt className="tableIcon redIcon" />
                          <FaRegEye className="tableIcon orangeIcon" />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Scrollbars>
          )}
        </div>
      </div>
    </div>
  );
};

export default Items;
