import "./SectionBreak.component.css";

const SectionBreak = ({ title }) => {
  return (
    <div className="sectionBreak">
      <p className="sectionBreakTitle">{title}</p>
      <hr />
    </div>
  );
};

export default SectionBreak;
