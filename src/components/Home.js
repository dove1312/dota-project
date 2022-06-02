import { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';




const Home = () => {


    const [userInput, setUserInput] = useState('');
    useEffect(() => {
        axios({
            url: ` https://api.opendota.com/api/heroes`
        }).then((heroes) => {
            console.log(heroes.data)
        })
    }, [])

    const handleChange = (e) => {
        setUserInput(e.target.value)
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
    }


    // console.log(userInput)

    return (
        <div className='wrapper'>
            
            <form className='form' onSubmit={handleSubmit}>
                <div className="inputWrapper">
                    <label htmlFor="searchInput">
                        <input type="text" onChange={handleChange} className="searchInput" placeholder="Search for heroes, items, players" />
                    </label>
                    <Link to={`/search/${userInput}`}>
                        <button className="searchButton">SEARCH</button>
                    </Link>
                </div>
            </form>
            
        </div>
    )
}

export default Home;