// import axios from "axios";
// import { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom'

const playerOverview = ({ matchHistoryData, searchResult, heroesData }) => {

    return (
        <div>
            <div className="playerOverview">
                <div className="playerOverviewLeft">
                    <img src={searchResult?.profile.avatarfull} alt={`avatar of ${searchResult?.profile.personaname}`} />
                    <div className="userInfo">
                        <div className='playerName'>
                            {searchResult?.profile.personaname}
                        </div>
                        <div>
                            <p>Overview</p>
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
            <div className="header">MOST PLAYED HEROES</div>
            <div className="playerInfoBox">
                <div className="labelContainer">
                    <div className="label1">Hero</div>
                    <div className="label2">Matches</div>
                    <div className="label3">Win%</div>
                </div>
                <div className="mostPlayedHeroesContainer">
                    {
                        matchHistoryData?.playerheroData.map((asd) => {
                            // console.log(asd)

                            const heroWinRate = asd.win * 100 / asd.games

                            const findHero = heroesData?.filter((heroObject) => {
                                return `${heroObject.hero_id}` === `${asd.hero_id}`
                            })

                            // console.log(findHero)

                            return (
                                <li className='mostPlayedHeroesRow'>
                                    <img src={`https://api.opendota.com${findHero[0].img}`} alt="" className="mostPlayedHeroesImg" />
                                    <div className="mostPlayedHeroNames">{findHero[0].localized_name}</div>
                                    <div className="mostPlayedHeroesMatchCount">{asd.games}</div>
                                    <div className="mostPlayedHeroesWinRate">{heroWinRate?.toFixed(2)}%</div>
                                </li>
                            )
                        })
                    }
                </div>
            </div>

        </div>
    )
}

export default playerOverview;


