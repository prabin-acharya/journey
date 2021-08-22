const Button = ({ text, onClick }) => {
  return (
    <div className="page-sidebar">
      <button onClick={onClick}>
        <b>{text}</b>
      </button>
    </div>
  );
};

export default Button;
