import styles from "../styles/BgMiniscreen.module.css";

const BgMiniscreen = ({ src }) => {
  console.log(src);
  return (
    <div className={styles.photo}>
      <img src={src} alt="업로드 할 배경" />
    </div>
  );
};

export default BgMiniscreen;
