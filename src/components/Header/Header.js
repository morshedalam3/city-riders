import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import './Header.css';

const Header = () => {
    const[loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div>
            
        <nav className="nav">
            <ul>
           
            <li className='title-container'>city riders</li>
                <li>
                    <Link to="/home">Home</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/login">Destination</Link>
                </li>
                <li>
                    <Link  to="/contact">Contact</Link>
                </li>
                <li>
                    <Link to="/blog">Blog</Link>
                </li>
                <li> {loggedInUser.name}</li>
            </ul>
        </nav>
    </div>
    );
};

export default Header;