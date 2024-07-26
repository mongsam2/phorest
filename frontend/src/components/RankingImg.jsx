import temporal from '../assets/ranking-pet-filter.svg';
import '../styles/RankingImg.css';

function RankingImgBox({ index }) {
    return (
        <div className="rankingImg-box">
            <div className='best-ranking-number'>{index + 1}</div>
            <img src={temporal} alt="" className="best-ranking" />
            <img src={temporal} alt="" className="profile-img"/>
            <p className='best-ranking-p'>임시 글쓰기</p>
        </div>
    );
}

export default function RankingImg({count}) {
    return (
        <div className="rankingImg-wrap">
            {Array.from({ length: count }, (_, index) => (
                <RankingImgBox key={index} index={index}/>
            ))}
        </div>
    );
}