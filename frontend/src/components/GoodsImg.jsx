import { useNavigate } from 'react-router-dom'; 

import temporal from '../assets/ranking-pet-filter.svg';
import sample from '../assets/mainPhoto1.png';
import '../styles/GoodsImg.css';

function GoodsImgBox({ index }) {
    const navigate = useNavigate(); 

    const handleClick = () => {
        navigate('/goodsbuy', { state: { imgSrc: temporal } }); 
    };

    return (
        <div>
            <button className="goodsImg-box" onClick={handleClick}> 
                <img src={temporal} alt="" className="best-goods" />
            </button>
            <div>
                <p className='best-goods-description'>[2월 1위 상품] 다이브투 패브릭 포스터</p>
                <p className='best-goods-price'>15,000원</p>
            </div>
        </div>
    );
}

export default function GoodsImg() {
    return (
        <div className="goodsImg-wrap">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => (
                <GoodsImgBox key={index} />
            ))}
        </div>
    );
}
