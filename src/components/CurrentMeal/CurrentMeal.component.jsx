import "./CurrentMeal.component.css";

const CurrentMeal = () => {
  return (
    <div className="currentMealItem">
      <table>
        <tbody>
          <tr>
            <td>Type</td>
            <td>Lunch</td>
          </tr>
          <tr>
            <td>End Time</td>
            <td>Dec 22, 2022 12:30am</td>
          </tr>
          <tr>
            <td>Items</td>
            <td>
              <table>
                <tbody>
                  <tr>
                    <td>Roti</td>
                    <td>20</td>
                  </tr>
                  <tr>
                    <td>Daal</td>
                    <td>70</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td>On/Off</td>
            <td>Check Box</td>
          </tr>
        </tbody>
      </table>
      <div className="tableFooter">
        <p>2hr:20min:30s left</p>
        <button>Save</button>
      </div>
    </div>
  );
};

export default CurrentMeal;
