import React, { useEffect, useState } from 'react';
import '../styles/FilterButton.css';

export default function FilterButton({ filterButtons }) {
    const [activeButton, setActiveButton] = useState('all-button');

    const handleButtonClick = (buttonId) => {
        setActiveButton(buttonId);
    };

    useEffect(() => {
        const buttons = document.querySelectorAll('.ranking-button');
        buttons.forEach(button => {
            if (button.id === activeButton) {
                button.style.backgroundColor = '#2D2D2D';
                button.style.color = 'white';
            } else {
                button.style.backgroundColor = '#FFF'; 
                button.style.color = '#2D2D2D'; 
            }
        });
    }, [activeButton]);

    return (
        <div className="filter-button-container">
            {filterButtons.map(({ id, label, icon }) => (
                <button
                    key={id}
                    id={id}
                    className={`ranking-button ${activeButton === id ? 'active' : ''}`}
                    onClick={() => handleButtonClick(id)}
                >
                    {icon && <img src={icon} alt="" className="ranking-filter-img" />}
                    <div style={{ fontSize: '1rem', fontStyle: 'normal', fontWeight: '500' }}>{label}</div>
                </button>
            ))}
        </div>
    );
}
