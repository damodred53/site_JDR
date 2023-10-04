import React from "react";
import Introduction from "./documents/introduction";
import Image from "../assets/image_icone_loupe.svg"; 
import Footer from "./Footer";

const LandingPage = () => {

    return (
        <div>
        <div className="div_presentation">

            <section className="explanation_landingpage">
                <Introduction/>
            </section>

            <section className="search_scene">
                <div className="search_div">
                    <form className="form_research">

                        <div className="title_author_research">
                            <label for="title">Titre de la scène</label>
                            <input type="text" placeholder="Nom de la scène" id="title"></input>
                            <label for="name">Auteur</label>
                            <input type="text" placeholder="Nom de l'auteur" id="name"></input>
                        </div>

                        <div className="other_attributes_button">
                            <div className="first_row_research">

                                <select>
                                    <option selected>Difficultés</option>
                                    <option value="1">facile</option>
                                    <option value="2">intermédiaire</option>
                                    <option value="3">difficile</option>
                                </select>

                                <select>
                                    <option selected>Durée</option>
                                    <option value="1">15 minutes ou moins</option>
                                    <option value="2">30 minutes ou moins</option>
                                    <option value="3">45 minutes ou moins</option>
                                    <option value="4">60 minutes ou moins</option>
                                </select>

                                <div>
                                    <label>Public majeur</label>
                                    <input type="checkbox"></input>
                                </div>

                            </div>

                            <div className="button_research">
                                <button>
                                    Lancer la recherche <img alt="icone de loupe" src={Image}/>
                                </button> 
                            </div>  
                            
                        </div>
                    </form>

                </div>
                

            </section>

        </div>
        
        </div>
        
    )
} 
export default LandingPage;