const Button = ({ clickHandler, text }) => {
  return (
    <div className="clickable" onClick={clickHandler}>
      {text}
    </div>
  );
};

export default Button;
