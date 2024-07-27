import "../styles/Gallery.css";
import { useState, useEffect } from "react";
import useHover from "../utils/useHover";

import RoundButton from "../components/RoundButton";
import btnFullscreenImage from "../assets/btn_fullscreen.png"; // 이미지 경로를 import로 불러옴
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
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    alert("Button clicked!");
  };

  const handleHover = () => {
    setHovered(true);
  };

  const handleHoverOut = () => {
    setHovered(false);
  };

  const infoBoxRef = useHover(handleHover);

  return (
    <div className="container">
      <div
        className="bgImg"
        style={{
          backgroundImage: y < 100 ? `url(${bgImg})` : `url(${bgImg2})`,
        }}
      >
        <div className="mainPhoto">
          <img src={y < 100 ? mainPhoto : mainPhoto2} alt="Main Photo" />
        </div>
        <div
          ref={infoBoxRef}
          className={`infoBox ${hovered ? "hovered" : ""}`}
          onMouseLeave={handleHoverOut}
        >
          <div className="userImage">
            <img src={profileImg} alt="User" />
          </div>
          <div className="textContent">
            <div className="title">이곳은 제목입니다.</div>
            <div className="date">2024. 7. 26</div>
          </div>
        </div>
        <div className="sideBtns">
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
