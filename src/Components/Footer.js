import './style.scss';
import React from 'react';
import { useNavigate } from "react-router-dom";

const Footer = () => {

    const navigate = useNavigate()

    const handleClickAuthentification = () => {
            navigate("/authentification");
        };

    return (
        <div id='footer_div' className='footer_div'>
            <h3 className='text_footer_div'>Site crée en octobre 2023</h3>
            <h3 className='text_footer_div'>Auteur : Florent Guyard</h3>
            <div className="create_new_scene">
                <button className="button_create_new_scene" onClick={handleClickAuthentification}>
                    Accès admin
                </button>
            </div>
        </div>
    )
}

export default Footer;