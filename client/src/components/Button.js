const Button = ({ text, onClick, id }) => {
  return (
    <div>
      <button id={id} onClick={onClick}>
        <strong>{text}</strong>
      </button>
    </div>
  );
};

export default Button;
