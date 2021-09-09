const Button = ({ text, onClick, id }) => {
  const charLimit = 27;
  if (text.length > charLimit) {
    text = text.substring(0, charLimit) + "...";
  }
  return (
    <div>
      <button id={id} onClick={onClick}>
        <strong>{text}</strong>
      </button>
    </div>
  );
};

export default Button;
