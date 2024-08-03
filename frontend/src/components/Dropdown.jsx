import React from 'react';
import '../styles/Dropdown.css';

export default function Dropdown({ onSortChange, selectedSort, list }) {
    const sortOptions = list

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
