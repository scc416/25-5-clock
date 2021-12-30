import SubControlListItemDisplay from "./SubControlListItemDisplay";

const SubControlListItem = ({ name, setting, length, session }) => {
  return (
    <div className="sub-controls">
      <span>{name}</span>
      <SubControlListItemDisplay {...{ setting, length, session }} />
    </div>
  );
};

export default SubControlListItem;
