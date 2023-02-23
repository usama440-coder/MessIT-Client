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
import Loader from "../../components/Loders";
import EditItemModal from "../../components/EditItemModal/EditItemModal.component";
import ConfirmDeleteItemModal from "../../components/ConfirmModal/ConfirmDeleteItemModal";

const Items = () => {
  const token = useSelector((state) => state.auth.user.token);
  const [createItemModal, setCreateItemModal] = useState(false);
  const [editItemModal, setEditItemModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [itemsData, setItemsData] = useState([]);
  const [itemData, setItemData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setCreateItemModal(true);
  };

  const handleDelete = (item) => {
    setItemData(item);
    setConfirmModal(() => true);
  };

  const handleItemEdit = (item) => {
    setItemData(item);
    setEditItemModal(() => true);
  };

  useEffect(() => {
    const fetchItemsData = async () => {
      try {
        setLoading(true);
        const items = await itemService.getItems(token);
        setItemsData(items?.data?.items);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    fetchItemsData();
  }, [token]);

  return (
    <div className="items">
      <Navbar />
      <div className="itemsContainer">
        <div className="itemsWrapper">
          <Greeting />
          <SectionBreak title="items" />
          {editItemModal ? (
            <EditItemModal
              itemData={itemData}
              itemsData={itemsData}
              setEditItemModal={setEditItemModal}
            />
          ) : (
            ""
          )}
          {createItemModal ? (
            <CreateItemModal setCreateItemModal={setCreateItemModal} />
          ) : (
            ""
          )}

          {confirmModal ? (
            <ConfirmDeleteItemModal
              itemsData={itemsData}
              itemData={itemData}
              setConfirmModal={setConfirmModal}
              setItemsData={setItemsData}
            />
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
                        <td>{0}</td>
                        <td>
                          <FaEdit
                            className="tableIcon greenIcon"
                            onClick={() => handleItemEdit(item)}
                          />
                          <FaTrashAlt
                            className="tableIcon redIcon"
                            onClick={() => handleDelete(item)}
                          />
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
