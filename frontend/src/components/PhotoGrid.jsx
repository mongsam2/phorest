import PhotoCell from "./PhotoCell";
import styles from "../styles/PhotoGrid.module.css";

const PhotoGrid = ({ photos, selectedPhotoIndex, onPhotoClick }) => {
  return (
    <div className={styles.photoGrid}>
      {photos.map((photo, index) => (
        <PhotoCell
          key={index}
          src={photo}
          isSelected={index === selectedPhotoIndex}
          onClick={() => onPhotoClick(index)}
        />
      ))}
    </div>
  );
};

export default PhotoGrid;
