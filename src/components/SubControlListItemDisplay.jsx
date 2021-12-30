import SubContolListItemPanel from "./SubControlListItemPanel";

const SubControlListItemDisplay = ({ setting, length, session }) => {
  return (
    <div className="container">
      <span>{length}</span>
      <SubContolListItemPanel {...{ setting, session }} />
    </div>
  );
};

export default SubControlListItemDisplay;
