import React from "react";
import { useParams } from 'react-router-dom';
import Image from "../assets/image_1.jpg";
import Logo_1 from "../assets/Vector_1.svg";
import Logo_2 from "../assets/Vector_2.svg";
import Logo_3 from "../assets/Vector_3.svg";
import { useState } from "react";
import { useEffect } from "react";
import Icone from "../assets/edit.png";
import Bin from "../assets/bin.png";
import { Link } from "react-router-dom";



const SceneCard = () => {

    const [dataScene, setDataScene] = useState([]);
    const [Item, setItem] = useState([]);
    const [isModalActivated, setIsModalActivated] = useState(false)
    let {id} = useParams();

  

   

    useEffect(() => {
       fetch(`http://localhost:3000/api/idee_scene/${id}`)
       .then(res => res.json())
            .then(data => {
                if (data) {
                    setDataScene(data);
                    setItem(data)
                }
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des données :', error);
            });
    }, []);

    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleDelete = () => {
        setIsModalOpen(!isModalOpen); 
    }

    const handleErase = async () => {

            const fetchDelete = await fetch(`http://localhost:3000/api/idee_scene/${id}`, {
                method: "DELETE",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(Item)
            })
    }
    

    return (
        <div className="main_card">

    <div className={`${isModalOpen ? "myModal_warning_delete" : "hidden_warning_delete"}`}>
    <div className='warning_delete' >
                
                <h1>Êtes-vous sur de vouloir supprimer cette scène ?</h1>
                <div className='answer_yes_no'>
                    
                    <p onClick={handleErase}>OUI</p>
                    
                    <p onClick={handleDelete}>NON</p>
                </div>
            </div>
    </div> 

            <div className="instruction_auth_scene_card">

                <Link to={`/edit/form/${id}`}>
                    <span className="material_symbols_outlined">
                        <img src={Icone} alt="icone de modification de la scène"/>   
                    </span>   
                </Link>

                
                    <span className='material_symbols_outlined'>
                        <img src={Bin} alt="icone de suppression de la scène" onClick={handleDelete}/>   
                    </span> 
                    
                
            </div>


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