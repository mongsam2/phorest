import styles from "../styles/PhotoCell.module.css";

const PhotoCell = ({ src, isSelected, onClick }) => {
  return (
    <div
      className={`${styles.photoCell} ${isSelected ? styles.selected : ""}`}
      onClick={onClick}
    >
      <img src={src} alt="배경이미지" className={styles.photoImg} />
    </div>
  );
};

export default PhotoCell;
