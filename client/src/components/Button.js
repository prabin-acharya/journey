const Button = ({ text, onClick }) => {
  return (
    <div className="page">
      <button onClick={onClick}>
        <b>{text}</b>
      </button>
    </div>
  );
};

export default Button;
