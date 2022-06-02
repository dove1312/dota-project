// import axios from "axios";
// import { useEffect, useState } from "react";
// import { itemList } from '../data/item';
// import pizzaImg from './assets/pizza.jpg'
import strengthImg from '../assets/Strength_attribute_symbol.jpg'
import agilityImg from '../assets/Agility_attribute_symbol.jpg'
import intelligenceImg from '../assets/Intelligence_attribute_symbol.jpg'
import heraldImg from '../assets/herald.jpg'
import { heroLore } from '../data/heroLore';
import { useParams, Link } from 'react-router-dom'
import { useEffect } from 'react';

const HeroInfo = ({ heroesData }) => {

    const { heroName } = useParams();
    console.log(heroName)

    const hero = heroesData?.filter((eachHero) => {
        return eachHero.localized_name === heroName
    })

    console.log(hero)

    for (const [key, value] of Object.entries(heroLore)) {

    }


    const attributeNameMaker = () => {
        if(hero && hero[0].primary_attr === 'str'){
            return "Strength";
        }else if(hero && hero[0].primary_attr === 'agi'){
            return "Agility"
        }else if(hero && hero[0].primary_attr === 'int'){
            return "Intelligence"
        }
    }

    return (
        <div>
            <div className="wrapper">
                <div className="heroOverview">
                    <div className="heroOverviewLeft">
                        {hero && <img className='heroImg' src={`https://api.opendota.com${hero[0].img}`} alt={hero[0].localized_name} />}
                        <div className="heroTitle">
                            <h2>{heroName}</h2>
                            {hero && hero[0].roles.map((roles, idx, arr) => {
                                return (
                                    <span>{`${roles}${arr.length - 1 === idx ? '' : ','} `}</span>
                                )
                            })}
                            {/* {hero && hero[0].roles.map((roles, idx)=>{
                                        return(
                                            <span>{`${roles}${hero[0].roles.length - 1 === idx ? '' : ','} `}</span>
                                        )
                                    })} */}
                        </div>
                        {hero && hero.map((heroObject) => {
                            for (const [key, value] of Object.entries(heroLore)) {
                                if (heroObject.name.includes(key)) {
                                    return <p className='heroLore'>{value}</p>
                                }
                            }
                        })}
                    </div>
                </div>
                <div className="heroInfoContainer">
                    <div className="heroAttribute">
                        <div className="attributeContainer">
                            <div className="strengthContainer">
                                <img className={hero && hero[0].primary_attr === "str" ? "strength" : ""} src={strengthImg} alt="image of strength attribute" />
                                <p>{hero && hero[0].base_str} + {hero && hero[0].str_gain}</p>
                            </div>
                            <div className="agilityContainer">
                                <img className={hero && hero[0].primary_attr === "agi" ? "agility" : ""} src={agilityImg} alt="image of agility attribute" />
                                <p>{hero && hero[0].base_agi} + {hero && hero[0].agi_gain}</p>
                            </div>
                            <div className="intelligenceContainer">
                                <img className={hero && hero[0].primary_attr === "int" ? "intelligence" : ""} src={intelligenceImg} alt="image of intelligence attribute" />
                                <p>{hero && hero[0].base_int} + {hero && hero[0].int_gain}</p>
                            </div>
                        </div>
                        <div className="attributeRow attributeRow1">
                            <p className='attributeLeft'>Damage</p>
                            <p className='attributeRight'>{hero && hero[0].base_attack_min + (hero && hero[0][`base_${hero[0].primary_attr}`])} - {hero && hero[0].base_attack_max + (hero && hero[0][`base_${hero[0].primary_attr}`])}</p>
                        </div>
                        <div className="attributeRow attributeRow2">
                            <p className='attributeLeft'>Base Attack Time</p>
                            <p className='attributeRight'>{hero && hero[0].attack_rate}</p>
                        </div>
                        <div className="attributeRow attributeRow3">
                            <p className='attributeLeft'>Attack Type</p>
                            <p className='attributeRight'>{hero && hero[0].attack_type}</p>
                        </div>
                        <div className="attributeRow attributeRow4">
                            <p className='attributeLeft'>Movement Speed</p>
                            <p className='attributeRight'>{hero && hero[0].move_speed}</p>
                        </div>
                        <div className="attributeRow attributeRow5">
                            <p className='attributeLeft'>Main Attribute</p>
                            <p className='attributeRight'>{attributeNameMaker()}</p>
                        </div>
                        <div className="attributeRow attributeRow6">
                            <p className='attributeLeft'>Attack Range</p>
                            <p className='attributeRight'>{hero && hero[0].attack_range}</p>
                        </div>
                        <div className="attributeRow attributeRow7">
                            <p className='attributeLeft'>Legs</p>
                            <p className='attributeRight'>{hero && hero[0].legs}</p>
                        </div>
                    </div>
                    <div className="winRateContainer">
                        <div className="winRateCol winRateCol1">
                            <p className='winRateUp'>Rank</p>
                            <p className='winRateDown'>Winrate</p>
                        </div>
                        <div className="winRateCol winRateCol2">
                            <div className='winRateUp'><img src={heraldImg} alt="" /></div>
                            <p className='winRateDown'>Winrate</p>
                        </div>
                        <div className="winRateCol winRateCol3">
                            <div className='winRateUp'><img src={heraldImg} alt="" /></div>
                            <p className='winRateDown'>Winrate</p>
                        </div>
                        <div className="winRateCol winRateCol4">
                            <div className='winRateUp'><img src={heraldImg} alt="" /></div>
                            <p className='winRateDown'>Winrate</p>
                        </div>
                        <div className="winRateCol winRateCol5">
                            <div className='winRateUp'><img src={heraldImg} alt="" /></div>
                            <p className='winRateDown'>Winrate</p>
                        </div>
                        <div className="winRateCol winRateCol6">
                            <div className='winRateUp'><img src={heraldImg} alt="" /></div>
                            <p className='winRateDown'>Winrate</p>
                        </div>
                        <div className="winRateCol winRateCol7">
                            <div className='winRateUp'><img src={heraldImg} alt="" /></div>
                            <p className='winRateDown'>Winrate</p>
                        </div>
                        <div className="winRateCol winRateCol8">
                            <div className='winRateUp'><img src={heraldImg} alt="" /></div>
                            <p className='winRateDown'>Winrate</p>
                        </div>
                        <div className="winRateCol winRateCol9">
                            <div className='winRateUp'><img src={heraldImg} alt="" /></div>
                            <p className='winRateDown'>Winrate</p>
                        </div>
                        
                    </div>
                </div>

            </div>


        </div>
    )
}

export default HeroInfo;