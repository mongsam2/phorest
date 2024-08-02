import styles from "../styles/Main.module.css";
import { useState } from "react";
import useHover2 from "../utils/useHover2";
import axios from "axios";

import ArrowButton from "../components/ArrowButton";
import leftArrowBtnImg from "../assets/btn_left_white.png";
import rightArrowBtnImg from "../assets/btn_right_white.png";
import gradationFilterImg from "../assets/gradationFilter.png";
import categoryPet from "../assets/category_pet.png";
import enterButtonNormal from "../assets/btn_enter_normal.png";
import enterButtonHover from "../assets/btn_enter_hover.png";

const Main = () => {
  const [category, setCategory] = useState("");
  const [enterBtnHovered, setEnterBtnHovered] = useState(false);

  const enterOnHover = () => {
    setEnterBtnHovered(true);
  };
  const enterOnHoverOut = () => {
    setEnterBtnHovered(false);
  };
  const refEnterBtn = useHover2(enterOnHover, enterOnHoverOut);

  const leftButtonHandler = () => {
    // fetchCategory();
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
      />
      <div
        className={styles.bgGradationFilter}
        style={{ backgroundImage: `url(${gradationFilterImg})` }}
      />
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
      <button
        className={styles.enterButton}
        ref={refEnterBtn}
        onClick={enterClickHandler}
      >
        {enterBtnHovered ? (
          <img src={enterButtonHover} alt="입장하기" />
        ) : (
          <img src={enterButtonNormal} alt="입장하기" />
        )}
      </button>
    </div>
  );
};

export default Main;
