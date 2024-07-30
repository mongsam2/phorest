import styles from "../styles/Main.module.css";
import { useState } from "react";
import useHover from "../utils/useHover";
import useScroll from "../utils/useScroll";

import ArrowButton from "../components/ArrowButton";
import leftArrowBtnImg from "../assets/btn_left_white.png";
import rightArrowBtnImg from "../assets/btn_right_white.png";
import categoryPet from "../assets/category_pet.png";
import enterButton from "../assets/btn_enter.png";

const Main = () => {
  const [category, setCategory] = useState([]);
  const [hovered, setHovered] = useState(false);

  const leftButtonHandler = () => {
    alert("left btn clicked!");
  };
  const rightButtonHandler = () => {
    alert("right btn clicked!");
  };

  const enterClickHandler = () => {
    alert("enter");
  };

  return (
    <div className={styles.containerMain}>
      <div
        className={styles.bgImg}
        style={{ backgroundImage: `url(${categoryPet})` }}
      ></div>
      <div className={styles.bigLetterLogo}></div>
      <div className={styles.ArrowButtonsBox}>
        <ArrowButton
          onClick={leftButtonHandler}
          imageSrc={leftArrowBtnImg}
          alt="left arrow button"
        />
        <ArrowButton
          onClick={rightButtonHandler}
          imageSrc={rightArrowBtnImg}
          alt="right arrow button"
        />
      </div>
      <button className={styles.enterButton} onClick={enterClickHandler}>
        <img src={enterButton} alt="입장하기" />
      </button>
    </div>
  );
};

export default Main;
