import './style.scss';
import React from 'react';
import { useNavigate } from "react-router-dom";


const Footer = () => {

    const navigate = useNavigate()

    const handleClickAuthentification = () => {
            navigate("/authentification");
        };

    const handleNavigateMentionsLegales = () => {
        navigate("/mentions_legales");
    }

    return (
        <div id='footer_div' className='footer_div'>
            <h3 className='text_footer_div'>Site crée en février 2025</h3>
            <h3 className='text_footer_div'>Auteur : Florent Guyard & Simon Lefort</h3>
            <div className="create_new_scene">
                <button className="button_create_new_scene" onClick={handleClickAuthentification}>
                    Accès admin
                </button>
                <button className="button_mentions_légales" onClick={handleNavigateMentionsLegales}>
                    Mentions légales
                </button>
            </div>
        </div>
    )
}

export default Footer;