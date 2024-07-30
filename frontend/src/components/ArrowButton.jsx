import "../styles/ArrowButton.css";

const ArrowButton = ({ onClick, imageSrc, alt }) => {
  return (
    <button className="ArrowButton" onClick={onClick}>
      <img src={imageSrc} alt={alt} className="arrow-button-image" />
    </button>
  );
};

export default ArrowButton;
