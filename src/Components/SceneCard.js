import React from "react";
import { useParams } from 'react-router-dom';
import Scene from "../scene";
import Image from "../assets/image_1.jpg";
import Logo_1 from "../assets/Vector_1.svg";
import Logo_2 from "../assets/Vector_2.svg";
import Logo_3 from "../assets/Vector_3.svg";

const SceneCard = () => {

    let {id} = useParams();
    
    console.log("id:", id);
    console.log("Scene:", Scene);
    
        let researchItem = Scene.find((item) => item.id === parseInt(id, 10));
        if (!researchItem) {
          console.log('j\'ai rien');
        } else {
            console.log(researchItem);
        }
      

    return (
        <div className="main_card">
            <div className="scene_card_main">
                
                    <h1 className="title_scene_card">{researchItem.titre}</h1>
                    <div className="duration_modification_author_card">

                        <div className="duration_card">
                            <img src={Logo_3} alt="icône d'horloge" /> 
                            <p>{`Durée : ${researchItem.duration} minutes`}</p>
                        </div>
                        <div className="date_modification_card">
                            <img alt="icône de crayon" src={Logo_1}/>
                            <p >{`Dernière modification : ${researchItem.date_modification}`}</p>
                        </div>

                        <div className="author_card">
                            <img alt="icône de personnage" src={Logo_2}/>
                            <p >{`Auteur : ${researchItem.auteur}`}</p>
                        </div>
                    </div>

                    <div className="list_tags"></div>
                    <img className="image_card" alt="image_cyberpunk" src={Image}/>
                    <p className="description_card">{researchItem.description}</p>
                    <p className="explanation_card">{researchItem.explication}</p>
                
            </div>
        </div>
    )
}

export default SceneCard;