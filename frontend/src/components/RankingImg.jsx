import React, { useEffect, useState } from 'react';
import ranking1 from '../assets/ranking_first.png';
import ranking2 from '../assets/ranking_second.png';
import ranking3 from '../assets/ranking_third.png';
import ranking4 from '../assets/ranking_fourth.png';
import ranking5 from '../assets/ranking_five.png';
import ranking6 from '../assets/ranking_sixth.png';
import axios from 'axios';
import '../styles/RankingImg.css';

const BASE_URL = "http://localhost:8000";

export default function RankingImg({ count }) {
    const [ranking, setRanking] = useState([]);

    const rankingGet = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/galleries/ranking?type=사진&category=반려동물`);
            // 응답이 배열인지 확인하고 설정
            if (Array.isArray(response.data)) {
                setRanking(response.data); // 배열로 설정
            } else {
                console.error("응답이 배열이 아닙니다:", response.data);
            }
            console.log(response.data);
            console.log(ranking);
            console.log(ranking.image);
            console.log(ranking.profile_image);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    useEffect(() => {
        rankingGet(); 
    }, []);

    return (
        <div className="rankingImg-wrap">
          {ranking.slice(0, Math.min(count, ranking.length)).map((rankingItem, index) => (
              <RankingImgBox index={index} ranking={rankingItem} />
          ))}
        </div>
    );
}

function RankingImgBox({ index, ranking }) {
    const img = [ranking1, ranking2, ranking3, ranking4, ranking5, ranking6];
    return (
        <div className="rankingImg-box">
          <img src={img[index]} className='best-ranking-number' alt={`Ranking`} />
          <img src={`http://${ranking.image}`} alt="" className="best-ranking" />
          <img src={`http://${ranking.profile_image}`} alt="" className="profile-img" />
          <p className='best-ranking-p'>{ranking.title || '임시 글쓰기'}</p>
        </div>
    );
}
