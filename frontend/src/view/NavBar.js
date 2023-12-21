import React from 'react'
import { Link } from 'react-router'
import '../styles/navBar.css'
import { useLocation, useHistory } from 'react-router-dom'

function HeaderView() {
  const location = useLocation();
  console.log(location.pathname);
  return location.pathname
}

function NavBar() {
    const history = useHistory();
    const isLoggedIn = !!localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('email');
        localStorage.removeItem('token');
        history.push('/login'); // Redirect to home after logout
    };
    return (
        <>
            <nav>
                <ul className="nav-list">
                    <li className="nav-item navbrand">
                        <a href="/" id="brandlogo">

                        <img className='navlogo' src={require("../assets/logoicon.png")} alt="LOGO NOT WORKING" srcset="" /> 
                        Travel Generator
                        </a>
                    </li>
                    <li className="nav-item">
                        {/* <a className='nav-sub-item-1' href="/profile">Profile</a> */}
                        {/* <a className='nav-sub-item-1' href="/preferences">Preferences</a> */}
                        <a href="/myTrips" className='nav-sub-item'>Trips</a>
                        {/* <a href="/notice" className='nav-sub-item-2'>Update and Notification</a> */}
                    </li>
                    {/* <li className="nav-item">
                        <a href="/login" className="nav-btn">Sign In</a>
                    </li> */}

                    <li className="nav-item">
                        {isLoggedIn ? (
                        <button onClick={handleLogout} className="nav-btn">Logout</button>
                        ) : (
                        <a href="/login" className="nav-btn">Sign In</a>
                        )}
                    </li>
                </ul>
            </nav>
        </>
    )
}
export default NavBar;



