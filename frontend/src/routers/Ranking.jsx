import React, { useState, useEffect } from 'react';
import all_filter from '../assets/ranking-all-filter.svg';
import animal_filter from '../assets/ranking-animal-filter.svg';
import ocean_filter from '../assets/ranking-ocean-filter.svg';
import hill_filter from '../assets/ranking-hill-filter.svg';
import camping_filter from '../assets/ranking-camping-filter.svg';
import season_filter from '../assets/ranking-season-filter.svg';

import '../styles/Ranking.css';
import Foot from '../components/Foot.jsx';
import RankingImg from '../components/RankingImg.jsx';
import GoodsImg from '../components/GoodsImg.jsx';

export default function Ranking() {
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);


    document.querySelectorAll('.ranking-filter button').forEach((button) => {
      button.style.backgroundColor = 'white';
      button.style.color = '#2D2D2D';
    });


    const clickedButton = document.getElementById(buttonId);
    clickedButton.style.backgroundColor = '#2D2D2D';
    clickedButton.style.color = 'white';

    
  };

  useEffect(() => {
    const allButton = document.getElementById('all-button');
    allButton.style.backgroundColor = '#2D2D2D';
    allButton.style.color = 'white';
  }, []);

  return (
    <div className="ranking-wrap">
      <header></header>

      <main>
        <div className="ranking-filter">
          <button
            id="all-button"
            className="ranking-all-button"
            onClick={() => handleButtonClick('all-button')}
          >
            <div className="ranking-all-filterBg">
              <img src={all_filter} alt="" className="ranking-all-filterImg" />
            </div>
            전체
          </button>
          <button
            id="animal-button"
            className="ranking-animal-button"
            onClick={() => handleButtonClick('animal-button')}
          >
            <img src={animal_filter} alt="" className="" />
            반려동물
          </button>
          <button
            id="ocean-button"
            className="ranking-ocean-button"
            onClick={() => handleButtonClick('ocean-button')}
          >
            <img src={ocean_filter} alt="" className="" />
            바다
          </button>
          <button
            id="hill-button"
            className="ranking-hill-button"
            onClick={() => handleButtonClick('hill-button')}
          >
            <img src={hill_filter} alt="" className="" />
            산
          </button>
          <button
            id="camping-button"
            className="ranking-camping-button"
            onClick={() => handleButtonClick('camping-button')}
          >
            <img src={camping_filter} alt="" className="" />
            캠핑
          </button>
          <button
            id="season-button"
            className="ranking-season-button"
            onClick={() => handleButtonClick('season-button')}
          >
            <img src={season_filter} alt="" className="" />
            계절
          </button>
        </div>

        <div className="ranking-main-best">
          <RankingImg />
        </div>
        <div className="ranking-main-goods">
          <h1 style={{ marginTop: '100px', marginLeft: '10px' }}>베스트 굿즈 상품들</h1>
          <GoodsImg />
        </div>
      </main>

      <foot className="ranking-foot">
        <Foot />
      </foot>
    </div>
  );
}
