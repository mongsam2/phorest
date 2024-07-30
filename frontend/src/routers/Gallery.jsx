import styles from "../styles/Gallery.module.css";
import { useState, useEffect } from "react";
import useHover2 from "../utils/useHover2";

import RoundButton from "../components/RoundButton";
import btnFullscreenImage from "../assets/btn_fullscreen.png";
import btnLikeImage from "../assets/btn_like.png";
import mainPhoto from "../assets/mainPhoto1.png";
import mainPhoto2 from "../assets/mainPhoto2.png";
import bgImg from "../assets/bgImg1.png";
import bgImg2 from "../assets/bgImg2.png";
import useScroll from "../utils/useScroll";
import profileImg from "../assets/profileImg.png";

const Gallery = () => {
  const [sections, setSections] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { y } = useScroll();
  const [infoBoxHovered, setInfoBoxHovered] = useState(false);

  const handleClick = () => {
    alert("Button clicked!");
  };

  const handleInfoBoxHover = () => {
    setInfoBoxHovered(true);
  };
  const handleInfoBoxHoverOut = () => {
    setInfoBoxHovered(false);
  };
  const infoBoxRef = useHover2(handleInfoBoxHover, handleInfoBoxHoverOut);

  return (
    <div className={styles.container}>
      <div
        className={styles.bgImg}
        style={{
          backgroundImage: y < 100 ? `url(${bgImg})` : `url(${bgImg2})`,
        }}
      >
        <div className={styles.mainPhoto}>
          <img src={y < 100 ? mainPhoto : mainPhoto2} alt="Main Photo" />
        </div>
        <div
          ref={infoBoxRef}
          className={`${styles.infoBox} ${
            infoBoxHovered ? styles.hovered : ""
          }`}
        >
          <div className={styles.userImage}>
            <img src={profileImg} alt="User" />
          </div>
          <div className={styles.textContent}>
            <div className={styles.title}>이곳은 제목입니다.</div>
            <div className={styles.date}>2024. 7. 26</div>
          </div>
        </div>
        <div className={styles.sideBtns}>
          <RoundButton
            onClick={handleClick}
            imageSrc={btnFullscreenImage}
            alt="Fullscreen Button"
          />
          <RoundButton
            onClick={handleClick}
            imageSrc={btnLikeImage}
            alt="Like Button"
          />
        </div>
      </div>
    </div>
  );
};

export default Gallery;
