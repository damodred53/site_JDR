import React from "react";
import './style.scss';
import Presentation from "./text_in_components/presentation";

const About = () => {
   
    return (
        <div className="about_text_presentation">
            <div className="about_text_presentation_text">
                <Presentation />
            </div>
        </div>
    )
}

export default About;