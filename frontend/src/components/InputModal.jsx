import React from 'react';
import '../styles/InputModal.css'; 

const InputModal = ({ isOpen,  onClose, suggestions, onSuggestionClick, setInputValue }) => {
    if (!isOpen) return null;

    function handleModal(suggestion) {
        setInputValue(suggestion); 
        onSuggestionClick(suggestion);
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>추천 검색어</h2>
                <ul style={{marginTop : '2%'}}>
                    {suggestions.map((suggestion, index) => (
                        <li className="modal-content-li" key={index} onClick={() => handleModal(suggestion)}>
                            <p>→</p>{suggestion}
                        </li>
                    ))}
                </ul>
                <button className="modal-content-button" onClick={onClose}>닫기</button>
            </div>
        </div>
    );
};

export default InputModal;
