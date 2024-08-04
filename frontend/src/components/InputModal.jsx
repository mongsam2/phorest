import React from 'react';
import style from '../styles/InputModal.module.css'; 

const InputModal = ({ isOpen,  onClose, suggestions, onSuggestionClick, setInputValue }) => {
    if (!isOpen) return null;

    function handleModal(suggestion) {
        setInputValue(suggestion); 
        onSuggestionClick(suggestion);
    }

    return (
        <div className={style.modalOverlay}>
            <div className={style.modalContent}>
                <h2>추천 검색어</h2>
                <ul style={{marginTop : '2%'}}>
                    {suggestions.map((suggestion, index) => (
                        <li className={style.modalContentLi} key={index} onClick={() => handleModal(suggestion)}>
                            <p>→</p>{suggestion}
                        </li>
                    ))}
                </ul>
                <button className={style.modalContentButton} onClick={onClose}>닫기</button>
            </div>
        </div>
    );
};

export default InputModal;
