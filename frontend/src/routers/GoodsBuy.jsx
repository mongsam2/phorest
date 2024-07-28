import React, { useState } from 'react';
import goodsBuyplus from '../assets/goodsBuy-plus.svg';
import goodsBuyminus from '../assets/goodsBuy-minus.svg';

import sample from '../assets/mainPhoto1.png';

import '../styles/GoodsBuy.css';

export default function GoodsBuy(props) {
    const [count, setCount] = useState(1);

    function handleValue(event) {
        const value = Number(event.currentTarget.value);
        if (value === 1) {
            setCount(prevCount => prevCount + 1); // 이전 상태 기반으로 증가
            console.log("+");
        } else if (value === 0 && count > 1) {
            setCount(prevCount => prevCount - 1); // 이전 상태 기반으로 감소
            console.log("-");
        }
    }

    return (
        <div className="GoodsBuy-wrap">
            <header>
                {/* 헤더 내용 */}
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
                            <button className="plus-minus" onClick={handleValue} value='1'>
                                <img src={goodsBuyplus} alt='플러스기호' />
                            </button>
                            {count}
                            <button className="plus-minus" onClick={handleValue} value='0' disabled={count <= 1}>
                                <img src={goodsBuyminus} alt='마이너스기호' />
                            </button>
                            <span className='GoodsBuy-countPrice'>{count * 15000}원</span>
                        </div>
                    </div>
                    <div className='GoodsBuy-totalPrice-box'>
                        <div className='GoodsBuy-price-description'>총 가격</div>
                        <div className='GoodsBuy-totalPrice'>{count * 15000}원</div>
                    </div>
                    <button className='GoodsBuy-button'>
                        <p className='GoodsBuy-button-p'>바로 구매하기</p>
                    </button>
                </div>
            </main>
        </div>
    );
}
