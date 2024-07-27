import React, {useState} from 'react';
import goodsBuyplus from '../assets/goodsBuy-plus.svg';
import goodsBuyminus from '../assets/goodsBuy-minus.svg';

import sample from '../assets/mainPhoto1.png';

import '../styles/GoodsBuy.css';

export default function GoodsBuy(props) {
    const [count, setCount] = useState(1);

    function handleValue(event) {
        if(event.target.value === 1) {
            setCount(count+1);
        } else if (event.target.value === 0) {
            setCount(count-1);
        }
    }

    return (<div className="GoodsBuy-wrap">
        <header>
            
        </header>
        <main className='GoodsBuy-main'>
            <div className='GoodsBuy-left'>
                <img src={sample} alt="굿즈 사진" className="GoodsBuy-img" />
            </div>

            <div className='GoodsBuy-right'>
                <div className='GoodsBuy-description'>
                    <p className='GoodsBuy-producer'>글레이즈드 도넛</p>
                    <p className='GoodsBuy-introduction'>[2월 1위 상품] 다이브투 패브릭 포스터</p>
                    <p className='GoodsBuy-introduction'>15,000원</p>
                </div>
                <div className='GoodsBuy-line'></div>
                <div className='GoodsBuy-countBox'>
                    <p className='GoodsBuy-small-title'>[2월 1위 상품] 다이브투 패브릭 포스터</p>
                    <div className='GoodsBuy-count'>
                        <button  className="plus-minus" onClick={handleValue} value={1}>
                            <img src={goodsBuyplus} alt='플러스기호'/>
                        </button>
                        {count}
                        <button className="plus-minus" onClick={handleValue} value={0}>
                            <img src={goodsBuyminus} alt='마이너스기호'/>
                        </button>
                        <span className='GoodsBuy-countPrice'>15,000원</span>
                    </div>
                </div>
                <div className='GoodsBuy-totalPrice-box'>
                    <div className='GoodsBuy-price-description'>총 가격</div><div className='GoodsBuy-totalPrice'>15,000원</div>
                </div>
                <button className='GoodsBuy-button'><p className='GoodsBuy-button-p'>바로 구매하기</p></button>
            </div>
        </main>
    </div>);
}