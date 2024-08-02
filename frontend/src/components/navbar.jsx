import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css'; 
import logo from '../assets/logo.png';

const Navbar = ({ isLoggedIn }) => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="PHOREST" />
        </Link>
      </div>
      <div className="nav-links">
        <Link to="/photos" className="nav-link">사진</Link>
        <Link to="/illustrations" className="nav-link">일러스트</Link>
        <Link to="/pets" className="nav-link">반려동물</Link>
      </div>
      <div className="nav-icons">
        <Link to="/search" className="search-icon">
          <i className="fas fa-search"></i>
        </Link>
        <Link to="/favorites" className="favorites-icon">
          <i className="fas fa-heart"></i>
        </Link>
        <Link to="/goods" className="goods-icon">
          <i className="fas fa-shopping-cart"></i>
        </Link>
        <Link to="/notifications" className="notifications-icon">
          <i className="fas fa-bell"></i>
        </Link>
      </div>
      {isLoggedIn ? (
        <div className="nav-actions">
          <Link to="/profile" className="nav-action-link">프로필</Link>
          <Link to="/logout" className="nav-action-link">로그아웃</Link>
          <Link to="/upload" className="upload-button">갤러리 업로드</Link>
        </div>
      ) : (
        <div className="nav-actions">
          <Link to="/login" className="nav-action-link">로그인</Link>
          <Link to="/signup" className="signup-button">회원가입</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
