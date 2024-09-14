import React from "react";

const Presentation = () => {

    return (
        <div className="presentation">
            <p>Le but de ce site et de son auteur est de proposer aux 
                maîtres non seulement des idées de scènes facile à intégrer dans un scénario
                déjà existant, mais aussi de proposer via ces différentes scènes des logiques
                de gameplay originales. Ces dernières ont vocation à faire varier l'expérience
                de jeu au sein d'une même séance de JDR. Ainsi, les scènes que vous trouverez
                sur ce site se composent de deux éléments : </p><br/><br/>
                <ul className="presentation_list">
                    <li className="presentation_list_under_list_presentation">- Une description de la scène en question. </li>
                    <li className="presentation_list_under_list_presentation">- Quelles logiques de jeu est présente dans cette scène et la rend originales.</li>
                </ul> <br/><br/>

            <p>
                Si vous souhaitez vous aussi proposer vos idées de scènes, vous pouvez
                pour l'heure me contacter via le formulaire de contact présent sur ce site.

            </p>
        </div>
    )
}

export default Presentation;