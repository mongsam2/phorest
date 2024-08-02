import temporal from '../assets/ranking-pet-filter.svg';
import ranking1 from '../assets/ranking_first.png';
import ranking2 from '../assets/ranking_second.png';
import ranking3 from '../assets/ranking_third.png';
import ranking4 from '../assets/ranking_fourth.png';
import ranking5 from '../assets/ranking_five.png';
import ranking6 from '../assets/ranking_sixth.png';

import '../styles/RankingImg.css';

function GoodsRankingBox({ index }) {
    const img = [ranking1, ranking2, ranking3, ranking4, ranking5, ranking6];
    return (
        <div className="rankingImg-box">
            <img src={img[index]} className='best-ranking-number'/>
            <img src={temporal} alt="" className="best-ranking" />
            <img src={temporal} alt="" className="profile-img"/>
            <p className='best-ranking-p'>임시 글쓰기</p>
        </div>
    );
}

export default function GoodsRanking({count}) {
    return (
        <div className="rankingImg-wrap">
            {Array.from({ length: count }, (_, index) => (
                <GoodsRankingBox key={index} index={index}/>
            ))}
        </div>
    );
}