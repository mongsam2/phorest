import styles from "../styles/Gallery.module.css";
import { useState, useEffect } from "react";
import useHover2 from "../utils/useHover2";
import useFullscreen from "../utils/useFullscreen";
import useFullscreen2 from "../utils/useFullscreen2";
import useWheelHandler from "../utils/useWheelHandler";
import createWheelHandler from "../utils/createWheelHandler";

import RoundButton from "../components/RoundButton";
import zoomInIcon from "../assets/icon_zoom_in.png";
import zoomOutIcon from "../assets/icon_zoom_out.png";
import likeRedIcon from "../assets/icon_like_red.png";
import likeBlackIcon from "../assets/icon_like_black.png";
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
  const { element, isFullscreen, triggerFull, exitFull } = useFullscreen2();

  const pageCount = 2;
  const wheelHandler = createWheelHandler(element, pageCount);
  useWheelHandler(element, wheelHandler);

  const galleryData = [
    {
      image: mainPhoto,
      background_image: bgImg,
      title: "나의 첫 번째 작품",
      upload_date: "2024-07-27",
      profile_image: profileImg,
    },
    {
      image: mainPhoto2,
      background_image: bgImg,
      title: "하하하핳",
      upload_date: "2024-07-29",
      profile_image: profileImg,
    },
  ];

  const handleInfoBoxHover = () => {
    setInfoBoxHovered(true);
  };
  const handleInfoBoxHoverOut = () => {
    setInfoBoxHovered(false);
  };
  const infoBoxRef = useHover2(handleInfoBoxHover, handleInfoBoxHoverOut);

  return (
    <div className={styles.container} ref={element}>
      {galleryData.map((item, index) => (
        <div key={index} className="galleryItem">
          <div
            className={styles.bgImg}
            style={{ backgroundImage: `url(${item.background_image})` }}
          >
            <div className={styles.mainPhoto}>
              <img src={item.image} alt="Main Photo" />
            </div>
            <div
              ref={infoBoxRef}
              className={`${styles.infoBox} ${
                infoBoxHovered ? styles.hovered : ""
              }`}
            >
              <div className={styles.userImage}>
                <img src={item.profile_image} alt="User Profile Image" />
              </div>
              <div className={styles.textContent}>
                <div className={styles.title}>{item.title}</div>
                <div className={styles.date}>{item.upload_date}</div>
              </div>
            </div>
            <div className={styles.sideBtns}>
              {isFullscreen ? (
                <RoundButton
                  onClick={exitFull}
                  imageSrc={zoomOutIcon}
                  alt="Fullscreen Off Button"
                />
              ) : (
                <RoundButton
                  onClick={triggerFull}
                  imageSrc={zoomInIcon}
                  alt="Fullscreen On Button"
                />
              )}
              <RoundButton
                onClick={triggerFull}
                imageSrc={likeBlackIcon}
                alt="Like Button"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Gallery;
