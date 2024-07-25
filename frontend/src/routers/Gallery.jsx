import "../styles/Gallery.css";
import { useState, useEffect } from "react";

import RoundButton from "../components/RoundButton";
import btnFullscreenImage from "../assets/btn_fullscreen.png"; // 이미지 경로를 import로 불러옴
import btnLikeImage from "../assets/btn_like.png";
import mainPhoto from "../assets/mainPhoto1.png";
import mainPhoto2 from "../assets/mainPhoto2.png";
import bgImg from "../assets/bgImg1.png";
import bgImg2 from "../assets/bgImg2.png";
import useScroll from "../utils/useScroll";

const Gallery = () => {
  const [sections, setSections] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { y } = useScroll();

  const handleClick = () => {
    alert("Button clicked!");
  };

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
        <div className="infoBox">{/* 정보 박스 내용 */}</div>
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
