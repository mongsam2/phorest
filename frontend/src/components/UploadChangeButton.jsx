import styles from "../styles/UploadChangeButton.module.css";

const UploadChangeButton = ({ text, onClick }) => {
  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={onClick}>
        {text}
      </button>
    </div>
  );
};

export default UploadChangeButton;
