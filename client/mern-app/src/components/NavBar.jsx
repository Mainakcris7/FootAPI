import { NavLink } from "react-router-dom"
import { useState } from "react";
import "../styles/NavBar.css";
import { Context } from "../utils/Provider"
import { IconButton } from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { useContext } from "react";
import logo from "../images/logo.png"

export default function NavBar() {
    const { token } = useContext(Context);
    const isTokenAvailable = !!token
    const [showMenus, setShowMenus] = useState(false)

    const toggleMenus = () => {
        setShowMenus(prevValue => !prevValue)
    }

    return (
        <>
            <div className="nav">
                <NavLink to="/" id="logo-link">
                    <div className="logo">
                        <div id="logo-container">
                            <img src={logo} alt="logo" id="logo" />
                        </div>
                        <h2>FootAPI</h2>
                    </div>

                </NavLink>
                <ul className="nav-ul">
                    <div className="menus">
                        <li>
                            <NavLink to="/">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/about">About</NavLink>
                        </li>
                        <li>
                            <NavLink to="/docs">Docs</NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact">Contact</NavLink>
                        </li>
                        {isTokenAvailable ?
                            <>
                                <li>
                                    <NavLink to="/profile">Profile</NavLink>
                                </li>
                            </>
                            :
                            <>
                                <li>
                                    <NavLink to="/login">Log in</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/register">Register</NavLink>
                                </li>
                            </>
                        }
                    </div>
                </ul>

                <div className="nav-mobile">
                    <div className="hamburger-icon">
                        <IconButton size="large" style={{ color: "white" }} onClick={toggleMenus} className={showMenus ? "active-hamburger" : null}>
                            <MenuRoundedIcon fontSize="inherit" />
                        </IconButton>
                    </div>

                    <ul className={showMenus ? "mobile-menus show-mobile-menus" : "mobile-menus"}>
                        <li className="mobile-menu">
                            <NavLink to="/">Home</NavLink>
                        </li>

                        <li className="mobile-menu">
                            <NavLink to="/about">About</NavLink>
                        </li>
                        <li className="mobile-menu">
                            <NavLink to="/docs">Docs</NavLink>
                        </li>
                        <li className="mobile-menu">
                            <NavLink to="/contact">Contact</NavLink>
                        </li>
                        {isTokenAvailable ?
                            <>
                                <li>
                                    <NavLink to="/profile">Profile</NavLink>
                                </li>
                            </>
                            :
                            <>
                                <li>
                                    <NavLink to="/login">Log in</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/register">Register</NavLink>
                                </li>
                            </>
                        }
                    </ul>

                </div>
            </div>
        </>
    )
}