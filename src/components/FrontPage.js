import '../App.scss';
import Home from './Home';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import HeroInfo from './HeroInfo';
import HeroList from './HeroList';
import TopNav from './TopNav';
import axios from "axios";
import { useEffect, useState } from "react";
import PlayerInfo from './PlayerInfo';
import SearchResult from './SearchResult';
import MatchDetails from './MatchDetails';
import { Link, useParams } from 'react-router-dom';


function FrontPage() {

  const [heroesData, setHeroesData] = useState();

  const fetchHeroStats = () => {
    axios({
      url: `https://api.opendota.com/api/heroStats`
    }).then((stats) => {
      // console.log(stats.data)
      setHeroesData(stats.data)

      const heroInfo = stats.data;

      heroInfo.sort((a, b) => {
        const nameA = a.localized_name.toLowerCase();
        const nameB = b.localized_name.toLowerCase();

        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      })
    })
  }

  useEffect(() => {
    fetchHeroStats();
  }, [])


  return (
    <>
      <TopNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/HeroList" element={<HeroList heroesData={heroesData} />} />
        <Route path="/HeroList/:heroName" element={<HeroInfo heroesData={heroesData} />} />
        <Route path="/search/:playerName" element={<SearchResult />} />
        <Route path="/player/:playerId" element={<PlayerInfo heroesData={heroesData} />} />
        <Route path="/matches/:matchId" element={<MatchDetails heroesData={heroesData}/>}/>
      </Routes>
    </>
  );
}

export default FrontPage;
