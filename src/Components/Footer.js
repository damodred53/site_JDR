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
        <div className=' footer'>
            <h3 className='text_footer_div footer_title'>Site crée en février 2025</h3>
            <h3 className='text_footer_div footer_title'>Auteur : Florent Guyard & Simon Lefort</h3>
            <div className="create_new_scene footer_buttons_zone">
                <button className="button_create_new_scene footer_buttons_zone_button" onClick={handleClickAuthentification}>
                    Accès admin
                </button>
                <button className="button_mentions_légales footer_buttons_zone_button footer_buttons_zone_button_mention_legales" onClick={handleNavigateMentionsLegales}>
                    Mentions légales
                </button>
            </div>
        </div>
    )
}

export default Footer;