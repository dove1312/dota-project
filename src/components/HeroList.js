
import { Link } from 'react-router-dom';


const HeroList = ({ heroesData }) => {



    return (
        <div className="wrapper">
            <div className="heroList">
                {heroesData?.map((eachHero) => {
                    return (
                        <li>
                            <Link to={`/HeroList/${eachHero.localized_name}`}>
                                <img className='heroImg' src={`https://api.opendota.com${eachHero.img}`} alt={eachHero.localized_name} />
                            </Link>
                        </li>
                    )
                })}
            </div>
        </div>
    )
}

export default HeroList;