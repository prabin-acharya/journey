const Button = ({ text, onClick }) => {
  return (
    <div className="file">
      <button onClick={onClick}>
        <b>{text}</b>
      </button>
    </div>
  );
};

export default Button;
