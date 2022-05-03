import { Link } from 'react-router-dom';


const TopNav = () => {
    return (
        <nav className="topNav">
            <ul className="topNavList">
                <li className="homeButton">
                    <Link to="/">DOTASTAT</Link>
                </li>
                <li>
                    <Link to="/HeroList">Heroes</Link>
                </li>
                <li>Players</li>
                <li>Items</li>
                <li>Matches</li>

            </ul>
        </nav>
    )
}

export default TopNav;



