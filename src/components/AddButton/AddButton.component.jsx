import "./AddButton.component.css";

const AddButton = ({ handleClick }) => {
  return (
    <button className="addBtn" onClick={handleClick}>
      + Add New
    </button>
  );
};

export default AddButton;
