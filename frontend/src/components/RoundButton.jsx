import "../styles/RoundButton.css";

const RoundButton = ({ onClick, imageSrc, alt }) => {
  return (
    <button className="round-button" onClick={onClick}>
      <img src={imageSrc} alt={alt} className="round-button-image" />
    </button>
  );
};

export default RoundButton;
