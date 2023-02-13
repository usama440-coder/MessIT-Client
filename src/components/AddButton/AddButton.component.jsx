import "./AddButton.component.css";

const AddButton = ({ title, handleClick }) => {
  return (
    <button className="addBtn" onClick={handleClick}>
      + {title}
    </button>
  );
};

export default AddButton;
