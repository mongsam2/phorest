import styles from "../styles/PhotoMiniscreen.module.css";

const PhotoMiniscreen = ({ src }) => {
  return (
    <div className={styles.photo}>
      <img src={src} alt="업로드 할 사진" />
    </div>
  );
};

export default PhotoMiniscreen;
