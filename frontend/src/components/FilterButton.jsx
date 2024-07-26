import React, { useEffect, useState } from 'react';

export default function FilterButton({ filterButtons }) {
    const [activeButton, setActiveButton] = useState('all-button');

    const handleButtonClick = (buttonId) => {
        setActiveButton(buttonId);
    };

    useEffect(() => {
        const allButton = document.getElementById(activeButton);
        if (allButton) {
            allButton.style.backgroundColor = '#2D2D2D';
            allButton.style.color = 'white';
        }
    }, [activeButton]);

    return (
        <div style={{display:'flex', gap : '35px'}}>
            {filterButtons.map(({ id, label, icon }) => (
                <button
                    key={id}
                    id={id}
                    className={`ranking-button ${activeButton === id ? 'active' : ''}`}
                    onClick={() => handleButtonClick(id)}
                    style={{
                        backgroundColor: activeButton === id ? '#2D2D2D' : 'white',
                        color: activeButton === id ? 'white' : '#2D2D2D',
                        display: 'inline-flex',
                        height: '72px',
                        padding: '8px 24px 8px 16px',
                        alignItems: 'center',
                        gap: '18.383px',
                        borderRadius: '49.021px',
                        border: '2px solid rgba(45, 45, 45, 0.16)',
                        backGround: '#FFF'
                    }}
                >
                    {icon && <img src={icon} alt="" className="ranking-filter-img" />}
                    <div style={{fontSize:'24px', fontStyle: 'normal', fontWeight: '500'}}>{label}</div>
                </button>
            ))}
        </div>
    );
}
