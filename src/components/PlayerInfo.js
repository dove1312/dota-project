import axios from 'axios'
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MatchHistory from './MatchHistory';
import PlayerOverview from './PlayerOverview';


const Players = ({ heroesData }) => {


    // const [playerHeroData, setPlayerHeroData] = useState();

    const { playerId } = useParams();

    // console.log(playerId)

    const [playerWinLoss, setPlayerWinLoss] = useState();
    const [searchResult, setSearchResult] = useState();
    const [recentMatches, setRecentMatches] = useState();
    const [matchHistoryData, setMatchHistoryData] = useState();

    const fetchPlayerData = async () => {
        const search = await axios({
            url: `https://api.opendota.com/api/players/${playerId}`,
        })

        // console.log(search.data)
        setSearchResult(search.data)


        const playerData = await axios({
            url: `https://api.opendota.com/api/players/${playerId}/wl`
        })
        // console.log(playerData)
        setPlayerWinLoss(playerData)

        const recentMatchesApi = await axios({
            url: ` https://api.opendota.com/api/players/${playerId}/recentmatches `
        })
        console.log(recentMatchesApi)
        setRecentMatches(recentMatchesApi)

        const playerHeroApi = await axios({
            url: `https://api.opendota.com/api/players/${playerId}/heroes`
        })
        // console.log(playerHeroApi.data)
        // setPlayerHeroData(playerHeroApi)

        const slicedHeroData = playerHeroApi.data.slice(0, 10)

        const getLastPlayedTime = (matchInfo) => {
            const currentTime = new Date();
            const passedTime = currentTime.getTime() - matchInfo.data[0].start_time * 1000;

            let playedDate = 0
            if (passedTime < 60000) {
                playedDate = 1;
                return "2 minutes ago";
            } else if (passedTime < 3600000) {
                playedDate = passedTime / 60000;
                return `${Math.floor(playedDate)} minute${passedTime < 120000 ? ' ' : 's'} ago`;
            } else if (passedTime < 86400000) {
                playedDate = passedTime / 3600000;
                return `${Math.floor(playedDate)} hour${passedTime < 7200000 ? ' ' : 's'} ago`;
            } else if (passedTime < 31536000000) {
                playedDate = passedTime / 86400000;
                return `${Math.floor(playedDate)} day${passedTime < 172800000 ? ' ' : 's'} ago`;
            } else {
                playedDate = passedTime / 31536000000;
                return `${Math.floor(playedDate)} year${passedTime < 63072000000 ? ' ' : 's'} ago`;
            }
        }

        const lastMatchTime = getLastPlayedTime(recentMatchesApi)

        const winrate = playerData.data.win / (playerData.data.win + playerData.data.lose)

        // console.log({ searchData: search.data, winRate: winrate * 100, matchHistoryData: recentMatchesApi.data, lastPlayedTime: lastMatchTime })
        setMatchHistoryData({
            searchData: search.data,
            totalWin: playerData.data.win,
            totalLoss: playerData.data.lose,
            winRate: (winrate * 100).toFixed(2),
            recentMatchesData: recentMatchesApi.data,
            lastPlayedTime: lastMatchTime,
            playerheroData: slicedHeroData,
        })
    }

    useEffect(() => {
        fetchPlayerData();
    }, [])



    // console.log(heroesData)



    return (
        <div className="wrapper">
            <div className="playerList">
                <PlayerOverview matchHistoryData={matchHistoryData} searchResult={searchResult} heroesData={heroesData} />
                <MatchHistory recentMatchesData={matchHistoryData?.recentMatchesData} heroesData={heroesData} />
            </div>
        </div>
    )
}

export default Players;