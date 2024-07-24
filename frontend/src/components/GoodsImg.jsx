import temporal from '../assets/ranking-animal-filter.svg';
import '../styles/GoodsImg.css';

function GoodsImgBox({ index }) {
    return (<div>
        <div className="goodsImg-box">
            <img src={temporal} alt="" className="best-goods" />
        </div>
        <div>
            <p className='best-goods-description'>[2월 1위 상품] 다이브투 패브릭 포스터</p>
            <p className='best-goods-price'>1,5000원</p>
        </div>
    </div>
    );
}

export default function GoodsImg() {
    return (
        <div className="goodsImg-wrap">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => (
                <GoodsImgBox key={index}/>
            ))}
        </div>
    );
}