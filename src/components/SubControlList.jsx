import SubControlListItem from "./SubControlListItem";

const SubControlList = ({ sessionLength, breakLength, setting }) => {
  return (
    <div className="container">
      <SubControlListItem
        {...{
          setting,
          name: "Session Length",
          length: sessionLength,
          session: true,
        }}
      />
      <SubControlListItem
        {...{
          setting,
          name: "Break Length",
          length: breakLength,
          session: false,
        }}
      />
    </div>
  );
};

export default SubControlList;
