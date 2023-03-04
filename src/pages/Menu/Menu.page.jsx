import Greeting from "../../components/Greeting/Greeting.component";
import Navbar from "../../components/Navbar/Navbar.component";
import SectionBreak from "../../components/SectionBreak/SectionBreak.component";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "./Menu.page.css";
import AddButton from "../../components/AddButton/AddButton.component";
import AddMenuModal from "../../components/AddMenuModal/AddMenuModal.component";
import { useState, useEffect } from "react";
import "react-accessible-accordion/dist/fancy-example.css";
import { useSelector } from "react-redux";
import menuService from "../../services/menuService";
import EditMenuModal from "../../components/EditMenuModal/EditMenuModal.component";

const Menu = () => {
  const token = useSelector((state) => state.auth.user.token);
  const [menuData, setMenuData] = useState([]);
  const [addMenuModal, setAddMenuModal] = useState(false);
  const [editMenuModal, setEditMenuModal] = useState(false);
  const [currMenu, setCurrMenu] = useState({});

  const handleClick = () => {
    setAddMenuModal(true);
  };

  const handleEditMenu = (menu) => {
    setEditMenuModal(true);
    setCurrMenu(menu);
  };

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await menuService.getMenu(token);

        // function to group elements by day
        const groupedMenu = res?.data?.menu.reduce((acc, cur) => {
          if (!acc[cur.day]) {
            acc[cur.day] = {
              day: cur.day,
              data: [cur],
            };
          } else {
            acc[cur.day].data.push(cur);
          }
          return acc;
        }, {});

        const result = Object.values(groupedMenu);
        setMenuData(result || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMenu();
  }, [token]);

  return (
    <div className="menu">
      <Navbar />
      <div className="menuContainer">
        <div className="menuWrapper">
          <Greeting />
          <SectionBreak title="Menu" />
          {addMenuModal ? (
            <AddMenuModal setAddMenuModal={setAddMenuModal} />
          ) : (
            ""
          )}
          {editMenuModal ? (
            <EditMenuModal
              setEditMenuModal={setEditMenuModal}
              currMenu={currMenu}
            />
          ) : (
            ""
          )}
          <AddButton handleClick={handleClick} title="Add Menu" />

          <Accordion allowZeroExpanded={true}>
            {menuData?.map((menu) => {
              return (
                <AccordionItem>
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      {menu?.day?.toUpperCase()}
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel className="menuTypeContainer">
                    {menu?.data?.map((data) => {
                      return (
                        <div className="menuTypeItem">
                          <FaEdit
                            className="menuTypeEdit"
                            onClick={() => handleEditMenu(data)}
                          />
                          <h4>{data?.type?.type?.toUpperCase()}</h4>
                          <p>
                            {data?.items?.map((item) => {
                              return (
                                <span>
                                  {item?.name}({item?.units}){" "}
                                </span>
                              );
                            })}
                          </p>
                        </div>
                      );
                    })}
                  </AccordionItemPanel>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default Menu;
