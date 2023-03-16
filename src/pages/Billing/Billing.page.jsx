import AddButton from "../../components/AddButton/AddButton.component";
import Greeting from "../../components/Greeting/Greeting.component";
import Navbar from "../../components/Navbar/Navbar.component";
import SectionBreak from "../../components/SectionBreak/SectionBreak.component";
import CreateBillModal from "../../components/CreateBillModal/CreateBillModal.component";
import "./Billing.page.css";
import { FaEdit, FaReceipt } from "react-icons/fa";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useEffect, useState } from "react";
import billingService from "../../services/billingService";
import { useSelector } from "react-redux";
import Loader from "../../components/Loders";
import EditBillModal from "../../components/EditBillModal/EditBillModal.component";
import { Link } from "react-router-dom";

const Billing = () => {
  const [createBillModal, setCreateBillModal] = useState(false);
  const [editBillModal, setEditBillModal] = useState(false);
  const token = useSelector((state) => state.auth.user.token);
  const role = useSelector((state) => state.auth.role);
  const [loading, setLoading] = useState(false);
  const [bills, setBills] = useState([]);
  const [currBill, setCurrBill] = useState({});

  const handleClick = () => {
    setCreateBillModal(true);
  };

  const handleEditIcon = (bill) => {
    setCurrBill(bill);
    setEditBillModal(true);
  };

  const handleReceiptIcon = (bill) => {
    setCurrBill(bill);
  };

  const format = {
    month: "short",
    day: "2-digit",
    year: "numeric",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await billingService.getBills(token);
        setBills(res?.data?.bills || []);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div className="billing">
      <Navbar />
      <div className="billingContainer">
        <div className="billingWrapper">
          <Greeting />
          <SectionBreak title="Billing" />
          {createBillModal ? (
            <CreateBillModal setCreateBillModal={setCreateBillModal} />
          ) : (
            ""
          )}
          {editBillModal ? (
            <EditBillModal
              billData={currBill}
              setEditBillModal={setEditBillModal}
            />
          ) : (
            ""
          )}
          {role === "cashier" ? (
            <AddButton handleClick={handleClick} title="Create Bill" />
          ) : (
            ""
          )}

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
                      <th>Date Range</th>
                      <th>Amount</th>
                      <th>Units</th>
                      <th>User</th>
                      <th>Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {bills?.map((bill) => {
                      return (
                        <tr key={bill._id}>
                          <td>
                            {new Date(bill?.from).toLocaleString(
                              "en-US",
                              format
                            )}{" "}
                            -{" "}
                            {new Date(bill?.to).toLocaleString("en-US", format)}
                          </td>
                          <td>{bill?.netAmount}</td>
                          <td>{bill?.totalUnits}</td>
                          <td>{bill?.user?.name}</td>

                          <td>
                            {bill?.isPaid ? (
                              <span className="tableBadge badge-green">
                                Paid
                              </span>
                            ) : (
                              <span className="tableBadge badge-red">
                                Unpaid
                              </span>
                            )}
                          </td>
                          <td>
                            {role === "cashier" ? (
                              <>
                                <FaEdit
                                  className="tableIcon greenIcon"
                                  onClick={() => handleEditIcon(bill)}
                                />
                                <Link
                                  to={`/receipt/${bill._id}`}
                                  target="_blank"
                                >
                                  <FaReceipt
                                    className="tableIcon orangeIcon"
                                    onClick={() => handleReceiptIcon(bill)}
                                  />
                                </Link>
                              </>
                            ) : (
                              ""
                            )}
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

export default Billing;
