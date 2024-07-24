import temporal from '../assets/ranking-animal-filter.svg';
import '../styles/RankingImg.css';

function RankingImgBox({ index }) {
    return (
        <div className="rankingImg-box">
            <img src={temporal} alt="" className="best-ranking" />
            <img src={temporal} alt="" className="profile-img"/>
            <p className='best-ranking-p'>임시 글쓰기</p>
        </div>
    );
}

export default function RankingImg() {
    return (
        <div className="rankingImg-wrap">
            {[1, 2, 3, 4, 5, 6].map((index) => (
                <RankingImgBox key={index}/>
            ))}
        </div>
    );
}