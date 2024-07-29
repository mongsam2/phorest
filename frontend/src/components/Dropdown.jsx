import React from 'react';
import '../styles/Dropdown.css';

export default function Dropdown({ onSortChange, selectedSort }) {
    const sortOptions = ['최신순', '추천순', '좋아요순'];

    const handleClick = (option) => {
        onSortChange(option);
    };

    return (
        <ul className='dropdown'>
            {sortOptions.map(option => (
                <li 
                    key={option} 
                    onClick={() => handleClick(option)}
                    style={{ backgroundColor: selectedSort === option ? '#F0F0F0' : '#FFF', width : '120px' }} 
                >
                    {option}
                </li>
            ))}
        </ul>
    );
}
