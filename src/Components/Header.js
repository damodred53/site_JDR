import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Burger from "../assets/icon_burger.png";

const Header = () => {

    const [accueilActive, setAccueilActive] = useState(true);
    const [aboutActive, setAboutActive] = useState(false);
    const [contactActive, setContactActive] = useState(false);
    const [opening, setOpening] = useState(false)

    const handleClickAcceuil = () => {
        setAccueilActive(true);
        setAboutActive(false);
        setContactActive(false);
    }
    const handleClickAbout = () => {
        setAccueilActive(false);
        setAboutActive(true);
        setContactActive(false);
    }
    const  handleClickContact = () => {
        setAccueilActive(false);
        setAboutActive(false);
        setContactActive(true);
    }

    const setOpen = () => {
        setOpening(!opening);
    }

    return (
        <div className="header">
            <div className="welcome_and_navbar">
                <h1><Link to="/" className="home_title" onClick={handleClickAcceuil}>Bienvenue sur le Scenatorium</Link></h1>
                <nav className="navbar_Header">

                    <ul className="navbar_Header_list">
                        <li><Link to="/" className={`${accueilActive ? "underline" : ""}`} onClick={handleClickAcceuil}>Accueil</Link></li>
                        <li><Link to="/about" className={`${aboutActive ? "underline" : ""}`} onClick={handleClickAbout}>A propos</Link></li>
                        <li><Link to="/contact" className={`${contactActive ? "underline" : ""}`} onClick={handleClickContact}>Contact</Link></li>
                        
                    </ul>

                    <img alt="menu burger" className="burger_header" src={Burger} onClick={setOpen}/>
                    
                    <div className={`${opening ? "opened_navbar" : "invisible_navbar"}`}>
                            <Link className="menu_hidden_navbar" to="/"  onClick={setOpen}>Accueil</Link>
                            <Link className="menu_hidden_navbar" to="/about"  onClick={setOpen}>A propos</Link>
                            <Link className="menu_hidden_navbar" to="/contact"  onClick={setOpen}>Contact</Link>
                            
                    </div>
                </nav>
            </div>
        </div>
    )
}
export default Header;
