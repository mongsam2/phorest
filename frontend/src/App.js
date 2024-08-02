import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/navbar";
import Signup from "./pages/Signup";
import Gallery from "./routers/Gallery";
import Ranking from "./routers/Ranking";
import Goods from "./routers/Goods";
import Main from "./routers/Main";
import Upload from "./routers/Upload";
import GoodsBuy from "./routers/GoodsBuy";
import PostWithHashtags from "./routers/Test";

import "./styles/App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    // <div>
    //   {/* <Ranking /> */}
    //   {/* <Gallery /> */}
    //   <Goods />
    //   {/* <Main /> */}
    //   {/* <GoodsBuy /> */}
    // </div>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        {/* <Route path="/navbar" element={<Navbar />} /> */}
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/goods" element={<Goods />} />
        <Route path="/goodsbuy" element={<GoodsBuy />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/Gallery" element={<Gallery />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}
export default App;
