import all_filter from '../assets/ranking-all-filter.svg';
import pet_filter from '../assets/ranking-pet-filter.svg';
import ocean_filter from '../assets/ranking-ocean-filter.svg';
import hill_filter from '../assets/ranking-hill-filter.svg';
import camping_filter from '../assets/ranking-camping-filter.svg';
import season_filter from '../assets/ranking-season-filter.svg';

import Foot from '../components/Foot.jsx';
import GoodsImg from '../components/GoodsImg.jsx';
import RankingImg from '../components/RankingImg';
import FilterButton from '../components/FilterButton.jsx';

import '../styles/Goods.css';

const goodsFilterButtons = [
    { id: 'all-button', label: '전체', icon: all_filter },
    { id: 'pet-button', label: '반려동물', icon: pet_filter },
    { id: 'ocean-button', label: '바다', icon: ocean_filter },
    { id: 'hill-button', label: '산', icon: hill_filter },
    { id: 'camping-button', label: '캠핑', icon: camping_filter },
    { id: 'season-button', label: '계절', icon: season_filter },
    { id: 'character-button', label: '캐릭터', icon: season_filter },
    { id: 'animal-button', label: '동물', icon: season_filter },
    { id: 'object-button', label: '사물', icon: season_filter },
    { id: 'etc-button', label: '기타', icon: season_filter }
];

export default function Goods() {
    

    return (
        <div className='Goods-wrap'>
            <header></header>

            <main>
                <div className="Goods-main-best">
                    <RankingImg count={3} />
                </div>

                <div className="ranking-filter">
                    <FilterButton filterButtons={goodsFilterButtons} />
                </div>

                <div className="Goods-main-goods">
                    <GoodsImg />
                </div>
            </main>

            <footer className="Goods-foot">
                <Foot />
            </footer>
        </div>
    );
}
