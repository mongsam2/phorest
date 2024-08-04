import React, { useState } from 'react';

import Dropdown from '../components/Dropdown';
import '../styles/Search.css';

import array_drop_down from '../assets/arrow_drop_down.svg';
import array_drop_up from '../assets/arrow_drop_up.svg';
import search from '../assets/search.svg';
import tune from '../assets/tune.svg';
import favorite from '../assets/favorite.svg';

export default function Search() {
    const [view, setView] = useState(false);
    const [searchContent, setSearchContent] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [selectedSort, setSelectedSort] = useState('최신순'); 
    const list = ['최신순', '추천순', '좋아요순'];

    const handleSortChange = (sortOption) => {
        setSelectedSort(sortOption);
        setView(false); 
    };

    function handleInput(event) {
        setInputValue(event.target.value); 
    }

    const handleSearch = () => {
        setSearchContent(inputValue);
    };

    return (
        <div className='Search-wrap'>
            <div className='Search-top-box'>
                <div className='Search-top-input'>
                    <button className="Search-icon" onClick={handleSearch}>
                        <img src={search} alt="" style={{width:'2.5rem'}}/> 
                    </button>
                    <input 
                        className='Search-input' 
                        onChange={handleInput} 
                        value={inputValue} 
                    />
                </div>
                <button className='Search-button'>
                    <img src={tune} alt="" className="" />
                    <p style={{fontSize:'21px'}}>필터</p>
                </button>
            </div>
            <div className='Search-bottom-box'>
                <div className='Search-bottom-top-rectangle'>
                    <p className='Search-content'>{`"${searchContent}"`}</p>
                    <div className='Search-sort' onClick={() => setView(!view)}>
                        <p style={{ color: 'rgba(45, 45, 45, 0.40)', fontSize: '1.2rem', fontStyle: 'normal', fontWeight: '400'}}>
                            정렬 방식: <span style={{ color: '#000', fontSize: '1.2rem', fontStyle: 'normal', fontWeight: '500' }}>{selectedSort}</span>
                        </p>
                        {view ? <img src={array_drop_up} alt="dropdown up" className='Search-view-img' /> : <img src={array_drop_down} alt="dropdown down" className='Search-view-img' />}
                        {view && (
                            <Dropdown className="dropdown" onSortChange={handleSortChange} selectedSort={selectedSort} list={list} />
                        )}
                    </div>
                </div>
                <div className='Search-bottom-bottom-rectangle'>
                    <div className='Search-grid'>
                        {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map(() => {
                            return (
                                <div className='Search-grid-box' key={Math.random()}>
                                    <button className="Search-img-box"> 
                                        <img src={``} alt="" className="best-goods-image" />
                                    </button>
                                    <div className='Search-description-box'>
                                        <img src={favorite} alt="" className='Search-profile-img'></img>
                                        <div className='Search-description-middle'>
                                            <p className='best-goods-description'>닉네임</p>
                                            <img src={favorite} alt="" className='Search-favorite-icon' />
                                        </div>
                                        <p>0</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
