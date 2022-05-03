// import axios from "axios";
// import { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom'

const HeroInfo = ({ heroesData }) => {

    const { heroName } = useParams();
    console.log(heroName)

    const hero = heroesData?.filter((eachHero) => {
        return eachHero.localized_name === heroName
    })

    console.log(hero)


    return (
        <div>
            {heroName}

            <li>
                {hero && <img className='heroImg' src={`https://api.opendota.com${hero[0].img}`} alt={hero[0].localized_name} />}
            </li>


        </div>
    )
}

export default HeroInfo;