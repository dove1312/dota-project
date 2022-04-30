import { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';




const Home = () => {

    const [userInput, setUserInput] = useState('');
    const [heroes, setHeroes] = useState();
    const [heroInfoFetched, setHeroInfoFetched] = useState(false);

    useEffect(() => {
        axios({
            url: ` https://api.opendota.com/api/heroes`
        }).then((heroes) => {
            console.log(heroes.data)
        })
    }, [])

    useEffect(() => {
        axios({
            url: `https://api.opendota.com/api/search`,
            params: {
                q: `dendi`
            }
        }).then((search) => {
            console.log(search.data)
        })
    }, [])

    const fetchHeroStats = () => {
        axios({
            url: `https://api.opendota.com/api/heroStats`
        }).then((stats) => {
            console.log(stats.data)
            setHeroes(stats.data)

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

            setHeroInfoFetched(true);
        })
    }

    useEffect(() => {
        fetchHeroStats();
    }, [])

    const handleChange = (e) => {
        setUserInput(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    // heroes.sort(function(a, b){
    //     const nameA = a.localized_name
    //     const nameB = b.localized_name
    //     if(nameA < nameB){
    //         return -1;
    //     }
    //     if(nameA > nameB){
    //         return 1;
    //     }
    //     return 0;
    // })

    console.log(userInput)

    return (
        <div className='wrapper'>
            <nav className="topNav">
                <ul className="topNavList">
                    <li className="homeButton">DOTASTAT</li>
                    <li>Heroes</li>
                    <li>Players</li>
                    <li>Items</li>
                    <li>Matches</li>

                </ul>
            </nav>
            <form className='form' onSubmit={handleSubmit}>
                <div className="inputWrapper">
                    <label htmlFor="searchInput">
                        <input type="text" onChange={handleChange} className="searchInput" placeholder="Search for heroes, items, players" />
                    </label>
                    <Link to="/heroInfo">
                        <button className="searchButton">SEARCH</button>
                    </Link>
                </div>
            </form>
            <div className="heroList">
            {heroInfoFetched && heroes.map((eachHero) => {
                return (
                    <li>
                        <Link to="/HeroInfo">
                            <img className='heroImg' src={`https://api.opendota.com${eachHero.img}`} alt={eachHero.localized_name} />
                        </Link>
                    </li>
                )
            })}
            </div>
        </div>
    )
}

export default Home;