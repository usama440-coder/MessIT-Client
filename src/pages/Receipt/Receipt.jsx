import "./Receipt.css";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import billingService from "../../services/billingService";
import { useSelector } from "react-redux";

const Receipt = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [billData, setBillData] = useState({});
  const token = useSelector((state) => state.auth.user.token);
  const format = {
    month: "short",
    day: "2-digit",
    year: "numeric",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await billingService.getBill(id, token);
        setBillData(res?.data || {});
      } catch (error) {
        setBillData({});
      }
    };

    fetchData();
  }, [id, token]);

  return (
    <div className="receiptContainer">
      <div className="receiptWrapper">
        <div className="receiptHeader">
          <h2>MessIT</h2>
          <p>Bill Receipt</p>
        </div>
        <div className="receiptDescription">
          <p>
            <b>Mess: </b>
            {billData?.mess?.name}
          </p>
          <p>
            <b>Dated: </b>{" "}
            {new Date(billData?.bill?.updatedAt).toLocaleString(
              "en-US",
              format
            )}
          </p>
        </div>
        <div className="receiptContent">
          <table>
            <tbody>
              <tr>
                <td>Name</td>
                <td>{billData?.user?.name}</td>
              </tr>
              <tr>
                <td>Date range</td>
                <td>
                  {new Date(billData?.bill?.from).toLocaleString(
                    "en-US",
                    format
                  )}
                  {" - "}
                  {new Date(billData?.bill?.to).toLocaleString("en-US", format)}
                </td>
              </tr>
              <tr>
                <td>Total units</td>
                <td>{billData?.bill?.totalUnits}</td>
              </tr>
              <tr>
                <td>Unit Cost</td>
                <td>{billData?.bill?.unitCost}</td>
              </tr>
              <tr>
                <td>Addtional Charges</td>
                <td>{billData?.bill?.additionalCharges}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="receiptFooter">
          <table>
            <tbody>
              <tr>
                <td>Net amount</td>
                <td>{billData?.bill?.netAmount}</td>
              </tr>
              <tr>
                <td>Payment</td>
                <td>{billData?.bill?.payment}</td>
              </tr>
              <tr>
                <td>Cashier</td>
                <td>{billData?.cashier?.name}</td>
              </tr>
            </tbody>
          </table>
          <br />
          <br />
          <br />
          <p>Signature</p>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
