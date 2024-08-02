import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import temporal from '../assets/ranking-pet-filter.svg';
import '../styles/GoodsImg.css';

const BASE_URL = "http://localhost:8000";

function GoodsImgBox({ key, image, name, price, page }) {
    const navigate = useNavigate(); 


    const handleClick = () => {
        navigate('/goodsbuy', { state: { imgSrc: image, itemName: name, itemPrice: price } }); 
    };

    return (
        <div>
            <button className="goodsImg-box" onClick={handleClick}> 
                <img src={`http://${image}`} alt="" className="best-goods-image" />
            </button>
            <div>
                <p className='best-goods-description'>{name}</p>
                <p className='best-goods-price'>{price}</p>
            </div>
        </div>
    );
}

export default function GoodsImg({list, selectedSort}) {
    const [goods, setGoods] = useState([]);
    const fetchGoods= async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/goods?category=반려동물&page=1&sort=${selectedSort}`);
            if (Array.isArray(response.data)) {
                setGoods(response.data); 

            } else {
                console.error("응답이 배열이 아닙니다:", response.data);
            }
        } catch (error) {
            console.error("Error fetching ranking data:", error);
        }
    };
    
    useEffect(() => {
        fetchGoods(); 
    }, []);
    return (
        <div className="goodsImg-wrap">
            {goods.map((item) => (
                <GoodsImgBox key={1} image={item.image} name={item.name} price = {item.price} page={1} />
            ))}
        </div>
    );
}
