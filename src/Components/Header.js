import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {

    const [accueilActive, setAccueilActive] = useState(true);
    const [aboutActive, setAboutActive] = useState(false);
    const [contactActive, setContactActive] = useState(false);

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
    

    return (
        <div className="header">
            <div className="welcome_and_navbar">
                <h1>Bienvenue sur le Scenatorium</h1>
                <nav className="navbar_Header">
                    <ul className="navbar_Header_list">
                        <li><Link to="/" className={`${accueilActive ? "underline" : ""}`} onClick={handleClickAcceuil}>Accueil</Link></li>
                        <li><Link to="/about" className={`${aboutActive ? "underline" : ""}`} onClick={handleClickAbout}>A propos</Link></li>
                        <li><Link to="/contact" className={`${contactActive ? "underline" : ""}`} onClick={handleClickContact}>Contact</Link></li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}
export default Header;
