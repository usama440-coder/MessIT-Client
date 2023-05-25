import { useEffect, useState } from "react";
import AddButton from "../../components/AddButton/AddButton.component";
import CreateItemModal from "../../components/CreateItemModal/CreateItemModal.component";
import Greeting from "../../components/Greeting/Greeting.component";
import Navbar from "../../components/Navbar/Navbar.component";
import SectionBreak from "../../components/SectionBreak/SectionBreak.component";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Scrollbars } from "react-custom-scrollbars-2";
import "./Items.page.css";
import itemService from "../../services/itemService";
import { useSelector } from "react-redux";
import Loader from "../../components/Loders";
import EditItemModal from "../../components/EditItemModal/EditItemModal.component";
import ConfirmDeleteItemModal from "../../components/ConfirmModal/ConfirmDeleteItemModal";

const Items = () => {
  const token = useSelector((state) => state.auth.user.token);
  const role = useSelector((state) => state.auth.role);
  const [createItemModal, setCreateItemModal] = useState(false);
  const [editItemModal, setEditItemModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [itemsData, setItemsData] = useState([]);
  const [itemData, setItemData] = useState({});
  const [loading, setLoading] = useState(false);

  // createItemModal state
  const handleClick = () => {
    setCreateItemModal(true);
  };

  // ConfirmModal state and set current item to pass on
  const handleDelete = (item) => {
    setItemData(item);
    setConfirmModal(() => true);
  };

  // EditModal state and set current item to pass on
  const handleItemEdit = (item) => {
    setItemData(item);
    setEditItemModal(() => true);
  };

  // update table instantly
  const updateTable = (newEntry) => {
    setItemsData([...itemsData, newEntry]);
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
            <CreateItemModal
              setCreateItemModal={setCreateItemModal}
              updateTable={updateTable}
            />
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

          {role === "secretary" ? (
            <AddButton title="Add Item" handleClick={handleClick} />
          ) : (
            ""
          )}

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
                    {role === "secretary" ? <th></th> : ""}
                  </tr>
                </thead>
                <tbody>
                  {itemsData.map((item) => {
                    return (
                      <tr key={item._id}>
                        <td>{item.name}</td>
                        <td>{item.units}</td>
                        {role === "secretary" ? (
                          <td>
                            <FaEdit
                              className="tableIcon greenIcon"
                              onClick={() => handleItemEdit(item)}
                            />
                            <FaTrashAlt
                              className="tableIcon redIcon"
                              onClick={() => handleDelete(item)}
                            />
                          </td>
                        ) : (
                          ""
                        )}
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
