import React, { useState } from 'react';
import './navbar.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/">PHOREST</a>
      </div>
      <ul className="navbar-links">
        <li><a href="/photos">사진</a></li>
        <li><a href="/illustrations">일러스트</a></li>
        <li><a href="/pets">반려동물</a></li>
      </ul>
      <div className="navbar-icons">
        {isLoggedIn ? (
          <>
            <a href="/search" className="icon"><i className="fas fa-search"></i></a>
            <a href="/favorites" className="icon"><i className="fas fa-star"></i></a>
            <a href="/store" className="icon"><i className="fas fa-store"></i></a>
            <a href="/notifications" className="icon"><i className="fas fa-bell"></i></a>
            <div className="dot"></div>
            <button className="upload-btn">갤러리 업로드</button>
            <button className="logout-btn" onClick={handleLogout}>로그아웃</button>
          </>
        ) : (
          <>
            <a href="/search" className="icon"><i className="fas fa-search"></i></a>
            <a href="/favorites" className="icon"><i className="fas fa-star"></i></a>
            <a href="/store" className="icon"><i className="fas fa-store"></i></a>
            <a href="/login" onClick={handleLogin}>로그인</a>
            <button className="signup-btn">회원가입</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default navbar;