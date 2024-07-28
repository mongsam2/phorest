import styles from "../styles/Upload.module.css";
import { useState, useEffect } from "react";
import useHover2 from "../utils/useHover2";
import useInput2 from "../utils/useInput2";
import useDate from "../utils/useDate";

import mainPhoto from "../assets/mainPhoto1.png";

import bgImg from "../assets/bgImg1.png";

import profileImg from "../assets/profileImg.png";

const Upload = () => {
  const [infoBoxHovered, setInfoBoxHovered] = useState(false);
  const [bgImgHovered, setBgImgHovered] = useState(false);
  const [photoHovered, setPhotoHovered] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const maxLength = 20;
  const title = useInput2("(제목을 지어주세요)", null, maxLength);
  const currentDate = useDate();

  const handleInfoBoxHover = () => {
    setInfoBoxHovered(true);
    setBgImgHovered(false);
    setPhotoHovered(false);
  };
  const handleInfoBoxHoverOut = () => {
    setInfoBoxHovered(false);
    setBgImgHovered(true);
  };
  const handleBgImgHover = () => {
    setBgImgHovered(true);
  };
  const handleBgImgHoverOut = () => {
    setBgImgHovered(false);
  };
  const handlePhotoHover = () => {
    setPhotoHovered(true);
    setBgImgHovered(false);
  };
  const handlePhotoHoverOut = () => {
    setPhotoHovered(false);
    setBgImgHovered(true);
  };
  const handleTitleClick = () => {
    setIsEditingTitle(true);
  };
  const handleTitleBlur = () => {
    setIsEditingTitle(false);
  };

  const bgImgRef = useHover2(handleBgImgHover, handleBgImgHoverOut);
  const photoRef = useHover2(handlePhotoHover, handlePhotoHoverOut);
  const infoBoxRef = useHover2(handleInfoBoxHover, handleInfoBoxHoverOut);

  return (
    <div className={styles.containerUpload}>
      <div className={styles.previewBox}>
        <div className={styles.previewContainer}>
          <div
            ref={bgImgRef}
            className={`${styles.bgImg} ${
              bgImgHovered ? styles.bgImgHovered : ""
            }`}
            style={{
              backgroundImage: `url(${bgImg})`,
            }}
          >
            <div
              ref={photoRef}
              className={`${styles.mainPhoto} ${
                photoHovered ? styles.mainPhotoHovered : ""
              }`}
            >
              <img src={mainPhoto} alt="Main Photo" />
            </div>
            <div
              ref={infoBoxRef}
              className={`${styles.infoBox} ${
                infoBoxHovered ? styles.hovered : ""
              }`}
              onClick={handleTitleClick}
            >
              <div className={styles.userImage}>
                <img src={profileImg} alt="User" />
              </div>
              <div className={styles.textContent}>
                {isEditingTitle ? (
                  <input
                    type="text"
                    value={title.value}
                    onChange={title.onChange}
                    onKeyDown={title.onKeyDown}
                    onBlur={handleTitleBlur}
                    className={styles.titleInput}
                    autoFocus
                  />
                ) : (
                  <div className={styles.title}>{title.value}</div>
                )}
                {title.error && (
                  <div className={styles.error}>{title.error}</div>
                )}
                <div className={styles.date}>{currentDate}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.customBox}>
        <div className={styles.custom_head}></div>
        <div className={styles.custom_body}></div>
        <div className={styles.custom_foot}></div>
      </div>
    </div>
  );
};

export default Upload;
