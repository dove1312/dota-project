import axios from 'axios'
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { itemList } from '../data/item';

const MatchDetails = ({ heroesData, matchHistoryObject, matchHistoryData, searchResult }) => {

    const [matchInfo, setMatchInfo] = useState();
    const [itemNameArray, setItemNameArray] = useState();
    const { matchId } = useParams();

    const fetchPlayerData = async () => {
        const matchDetail = await axios({
            url: `https://api.opendota.com/api/matches/${matchId}`,
        })

        // console.log(search.data)
        console.log(matchDetail.data)
        setMatchInfo({
            playerDataArray: matchDetail.data.players,
            gameMode: matchDetail.data.game_mode,
            gameDuration: matchDetail.data.gameDuration,

        })
    }

    useEffect(() => {
        fetchPlayerData()
    }, [])


    return (
        <div className="wrapper">
            <div className="playerOverview">
                <div className="playerOverviewLeft">
                    <img src={searchResult?.profile.avatarfull} alt={`avatar of ${searchResult?.profile.personaname}`} />
                    <div className="userInfo">
                        <div className='playerName'>
                            {searchResult?.profile.personaname}
                        </div>
                        <div>
                            Overview
                        </div>
                    </div>
                </div>
                <div className="playerOverviewRight">
                    <div className="lastMatchContainer">
                        {matchHistoryData?.lastPlayedTime}
                        <p className='overviewInfo'>LAST MATCH</p>
                    </div>
                    <div className="recordContainer">
                        <span className="winCount">{matchHistoryData?.totalWin}</span> - <span className="lossCount">{matchHistoryData?.totalLoss}</span>
                        <p className='overviewInfo'>RECORD</p>
                    </div>
                    <div className="winrateContainer">
                        <span>{matchHistoryData?.winRate}%</span>
                        <p className='overviewInfo'>WIN RATE</p>
                    </div>
                </div>
            </div>
            {matchId}
            {matchInfo?.playerDataArray.map((player, idx) => {
                console.log(player)

                let newArray = []
                itemList.items.forEach((eachItem, idx) => {
                    if (eachItem.id === player.item_0 || eachItem.id === player.item_1 || eachItem.id === player.item_2 || eachItem.id === player.item_3 || eachItem.id === player.item_4 || eachItem.id === player.item_5) {
                        newArray.push(eachItem.name)
                    }
                })

                const findHeroName = heroesData?.filter((heroObject) => {
                    return heroObject.hero_id === player.hero_id
                })
                return (
                    <div key={`player${idx}`} >
                        <p>{player.personaname ? player.personaname : 'anonymous'}:{player.abandons === 1 && 'abandoned'}</p>
                        <img src={`https://api.opendota.com${findHeroName[0].img}`} alt="" className='mostPlayedHeroesImg' />
                        {newArray.map((itemName, idx) => {
                            return (<div key={`${itemName}-${idx}`}>
                                <img src={`http://cdn.dota2.com/apps/dota2/images/items/${itemName}_lg.png`} alt="" />
                            </div>
                            )
                        })}
                    </div>
                )

            })}
        </div>
    )
}

export default MatchDetails;