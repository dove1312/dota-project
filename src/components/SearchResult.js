import axios from 'axios'
import { Link, useParams } from 'react-router-dom';
import {useState, useEffect} from 'react';

const SearchResult = () => {

    const [searchResult, setSearchResult] = useState();
    const {playerName} = useParams();

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
            {searchResult?.map((eachUser) => {
                    return (
                        <li>
                            <Link to={`/player/${eachUser.account_id}`}>
                                <p>{eachUser.personaname}</p>
                                <img className='playerAvatar' src={eachUser.avatarfull} alt={`avatar of ${eachUser.personaname}`} />
                            </Link>
                        </li>
                    )
                })}
        </div>
    )
}

export default SearchResult;