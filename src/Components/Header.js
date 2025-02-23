import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Burger from "../assets/icon_burger.png";

const Header = () => {
    const location = useLocation(); 

    const [accueilActive, setAccueilActive] = useState(false);
    const [aboutActive, setAboutActive] = useState(false);
    const [contactActive, setContactActive] = useState(false);
    const [opening, setOpening] = useState(false);

    useEffect(() => {
        switch (location.pathname) {
            case "/":
                setAccueilActive(true);
                setAboutActive(false);
                setContactActive(false);
                break;
            case "/about":
                setAccueilActive(false);
                setAboutActive(true);
                setContactActive(false);
                break;
            case "/contact":
                setAccueilActive(false);
                setAboutActive(false);
                setContactActive(true);
                break;
            case "/authentification":
                setAccueilActive(false);
                setAboutActive(false);
                setContactActive(false);
                break;
            case "/mentions_legales":
                setAccueilActive(false);
                setAboutActive(false);
                setContactActive(false);
                break;

            default: break;
        }
    }, [location.pathname]); 

    const setOpen = () => {
        setOpening(!opening);
    };

    return (
        <div className="header">
            <div className="welcome_and_navbar">
                <h1>
                    <Link to="/" className="home_title" onClick={() => setAccueilActive(true)}>
                        Bienvenue sur le Scenatorium
                    </Link>
                </h1>
                <nav className="navbar_Header">
                    <ul className="navbar_Header_list">
                        <li>
                            <Link to="/" className={`${accueilActive ? "underline" : ""}`}>
                                Accueil
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" className={`${aboutActive ? "underline" : ""}`}>
                                A propos
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" className={`${contactActive ? "underline" : ""}`}>
                                Contact
                            </Link>
                        </li>
                    </ul>

                    <img alt="menu burger" className="burger_header" src={Burger} onClick={setOpen} />

                    <div className={`${opening ? "opened_navbar" : "invisible_navbar"}`}>
                        <Link className="menu_hidden_navbar" to="/" onClick={setOpen}>
                            Accueil
                        </Link>
                        <Link className="menu_hidden_navbar" to="/about" onClick={setOpen}>
                            A propos
                        </Link>
                        <Link className="menu_hidden_navbar" to="/contact" onClick={setOpen}>
                            Contact
                        </Link>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Header;
