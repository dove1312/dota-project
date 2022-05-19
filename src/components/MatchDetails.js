import axios from 'axios'
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { itemList } from '../data/item';
import { lobbyTypeData } from '../data/LobbyType';


const MatchDetails = ({ heroesData, matchHistoryObject, matchHistoryData, searchResult }) => {

    const [matchInfo, setMatchInfo] = useState();
    const [itemNameArray, setItemNameArray] = useState();
    const { matchId } = useParams();
    const [lobbyString, setLobbyString] = useState('')

    const fetchPlayerData = async () => {
        const matchDetail = await axios({
            url: `https://api.opendota.com/api/matches/${matchId}`,
        })

        // console.log(matchHistoryData)
        console.log(matchDetail)
        console.log(matchDetail.data)

        const asdf = lobbyTypeData[matchDetail?.data.lobby_type]?.name
        const lobbyToString = asdf?.replace('lobby_type_', '')
        console.log(lobbyTypeData, asdf, lobbyToString, 'ok', matchDetail.data.lobby_type)

        setMatchInfo({
            matchId: matchDetail.data.match_id,
            playerDataArray: matchDetail.data.players,
            gameMode: matchDetail.data.game_mode,
            gameDuration: matchDetail.data.duration,
            lobbyType: lobbyToString,
            radiantWin: matchDetail.data.radiant_win,
            radiantScore: matchDetail.data.radiant_score,
            direScore: matchDetail.data.dire_score,
            lastPlayed: matchDetail.data.start_time,
        })
    }
    

    // const lobbyType = lobbyTypeData[matchInfo?.lobbyType].name

    useEffect(() => {
        
    }, [])



    useEffect(() => {
        fetchPlayerData()
    }, [])

    const durationFixed2 = Math.floor(matchInfo?.gameDuration / 60)
    const durationSeconds2 = matchInfo?.gameDuration % 60
    
    
    console.log(durationFixed2)

    const getLastPlayedTime = () => {
        const currentTime = new Date();
        const passedTime = currentTime.getTime() - matchInfo?.lastPlayed * 1000;

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

    const lastMatch = getLastPlayedTime()

    return (
        <div className="wrapper">
            <div className="playerOverview">
                <div className="matchOverviewLeft">
                    <p className='playerName'>Match {matchInfo?.matchId}</p>
                    <p>Overview</p>
                </div>
                <div className="playerOverviewRight">
                    <div className="lastMatchContainer">
                        {matchHistoryData?.lastPlayedTime}
                        <p className='capital'>{matchInfo?.lobbyType}</p>
                        <p className='description'>LOBBY TYPE</p>
                    </div>
                    <div className="recordContainer">
                        <p>{durationFixed2}:{durationSeconds2}</p>
                        <p className='description'>DURATION</p>
                    </div>
                    <div className="winrateContainer">
                        <p>{lastMatch}</p>
                        <p className='description'>MATCH ENDED</p>
                    </div>
                </div>
            </div>
            <div className="matchDetails">
                <div className="matchDetailsTitle">
                    <div className="gameResult">
                        {matchInfo?.radiantWin ? <h2 className='matchWon'>RADIANT VICTORY</h2> : <h2 className='matchLose'>DIRE VICTORY</h2>}
                    </div>
                    <div className="gameScoreContainer">
                        <span className="scoreLeft">{matchInfo?.radiantScore}</span>
                        <span className="gameTimer">:</span>
                        <span className="scoreRight">{matchInfo?.direScore}</span>
                    </div>
                </div>
                <div className="matchDetailsHeader">
                    <h3 className='teamRadiant'>THE RADIANT</h3>
                </div>
                <div className="matchDetailContainer">
                    {matchInfo?.playerDataArray.map((player, idx) => {
                        // console.log(player)

                        let newArray = []
                        itemList.items.forEach((eachItem, idx) => {
                            if (eachItem.id === player.item_0 || eachItem.id === player.item_1 || eachItem.id === player.item_2 || eachItem.id === player.item_3 || eachItem.id === player.item_4 || eachItem.id === player.item_5) {
                                newArray.push(eachItem.name)
                            }
                        })

                        const findHeroName = heroesData?.filter((heroObject) => {
                            return heroObject.hero_id === player.hero_id
                        })

                        const playerLabel = <p>{player.personaname ? player.personaname : 'anonymous'}</p>

                        const kda = (player.kills + player.assists) / player.deaths
                        const newKda = kda.toFixed(1)
                        // console.log(newKda)

                        return (
                            <div className='playerRow' key={`player${idx}`} >
                                <div className="mdRow mdRow1">
                                    {findHeroName && <img src={`https://api.opendota.com${findHeroName[0]?.img}`} alt="" className='mostPlayedHeroesImg' />}
                                </div>
                                <div className='mdRow mdRow2'>
                                    {player?.personaname ? <Link to={`/player/${player?.account_id}`}>
                                        {playerLabel}
                                    </Link> : playerLabel}
                                    {/* {player.abandons === 1 && <p>abandoned</p>} */}
                                </div>
                                <div className="mdRow kda mdRow3">
                                    <p>{player.kills} / {player.deaths} / {player.assists}</p>
                                    <p className='description'>{newKda} KDA</p>
                                </div>
                                <div className="mdRow creepScore mdRow4">
                                    <p>{player.last_hits} ({player.denies}) CS</p>
                                </div>
                                <div className="mdRow mdRow5">
                                    <p>{player.gold_per_min}</p>
                                    <p className='description'>GPM</p>
                                </div>
                                <div className="mdRow mdRow6">
                                    <p>{player.xp_per_min}</p>
                                    <p className='description'>XPM</p>
                                </div>
                                <div className="mdRow mdRow7">
                                    <p>{player.hero_damage}</p>
                                    <p className='description'>DMG</p>
                                </div>
                                <div className="itemsContainer">
                                    {newArray.map((itemName, idx) => {
                                        // console.log(itemName, idx)
                                        return (<div className='imgContainer' key={`${itemName}-${idx}`}>
                                            {itemName !== 'empty' && <img src={`http://cdn.dota2.com/apps/dota2/images/items/${itemName}_lg.png`} alt="" />}
                                        </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default MatchDetails;