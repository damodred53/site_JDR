import React from "react";
import { useParams } from 'react-router-dom';
import Image from "../assets/image_1.jpg";
import Logo_1 from "../assets/Vector_1.svg";
import Logo_2 from "../assets/Vector_2.svg";
import Logo_3 from "../assets/Vector_3.svg";
import { useState } from "react";
import { useEffect } from "react";

const SceneCard = () => {

    const [dataScene, setDataScene] = useState([]);
    const [Item, setItem] = useState([]);
    let {id} = useParams();

    useEffect(() => {

    fetch(`http://localhost:3000/api/scene`)

        .then(res => res.json())
            .then(data_2 => {
                if (data_2) {  
                    setDataScene(data_2); 

                    const foundItem = dataScene.find((item) => item.id === parseInt(id, 10))
            if (foundItem) {
                setItem(foundItem);
                console.log(foundItem)
            }
            
                } 
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des données :', error);
            });

            
},[{id}] )


    return (
        <div className="main_card">
            <div className="scene_card_main">
                
                    <h1 className="title_scene_card">{Item.titre}</h1>
                    <div className="duration_modification_author_card">

                        <div className="duration_card">
                            <img src={Logo_3} alt="icône d'horloge" /> 
                            <p>{`Durée : ${Item.duration} minutes`}</p>
                        </div>
                        <div className="date_modification_card">
                            <img alt="icône de crayon" src={Logo_1}/>
                            <p >{`Dernière modification : ${Item.date_modification}`}</p>
                        </div>

                        <div className="author_card">
                            <img alt="icône de personnage" src={Logo_2}/>
                            <p >{`Auteur : ${Item.auteur}`}</p>
                        </div>
                    </div>

                    <div className="list_tags"></div>
                    <img className="image_card" alt="image_cyberpunk" src={Image}/>
                    <p className="description_card">{Item.description}</p>
                    <p className="explanation_card">{Item.explication}</p>
                
            </div>
        </div>
    )
}

export default SceneCard;