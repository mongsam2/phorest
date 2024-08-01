import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css'; 

const Navbar = ({ isLoggedIn }) => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">PHOREST</Link>
      </div>
      <div className="nav-links">
        <Link to="/photos">사진</Link>
        <Link to="/illustrations">일러스트</Link>
        <Link to="/pets">반려동물</Link>
      </div>
      <div className="nav-icons">
        <Link to="/search">🔍</Link>
        <Link to="/favorites">⭐</Link>
        <Link to="/goods">🛒</Link>
        <Link to="/notifications">🔔</Link>
      </div>
      {isLoggedIn ? (
        <div className="nav-actions">
          <Link to="/signup">프로필</Link>
          <Link to="/logout">로그아웃</Link>
          <Link to="/upload" className="upload-button">갤러리 업로드</Link>
        </div>
      ) : (
        <div className="nav-actions">
          <Link to="/login">로그인</Link>
          <Link to="/signup" className="signup-button">회원가입</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;