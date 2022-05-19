import axios from 'axios'
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const SearchResult = () => {

    const [searchResult, setSearchResult] = useState();
    const { playerName } = useParams();

    useEffect(() => {
        axios({
            url: `https://api.opendota.com/api/search`,
            params: {
                q: playerName
            }
        }).then((search) => {
            console.log(search.data)
            setSearchResult(search.data)
        })
    }, [])

    return (
        <div className="wrapper">
            <div className="searchNav">
                <h2>Search Results</h2>
                <p>Results for '{playerName}'</p>
            </div>
            <div className="usersContainer">
                {searchResult?.map((eachUser) => {
                    return (
                        <li className='usersList'>
                            <Link to={`/player/${eachUser.account_id}`}>
                                <div className="userContainer">
                                    <img className='playerAvatar' src={eachUser.avatarfull} alt={`avatar of ${eachUser.personaname}`} />
                                    <div className="userText">
                                        <p>{eachUser.personaname}</p>
                                    </div>
                                </div>
                            </Link>
                        </li>
                    )
                })}
            </div>
        </div>
    )
}

export default SearchResult;