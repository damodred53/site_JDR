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
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SceneCard = () => {

    const [Item, setItem] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    /* récupération de la valeur de ID contenu dans l'URL via le hook useParams */
    let {id} = useParams();

    /* Fonction permettant d'aller chercher en base de données les informations sur la scène 
    les informations sont ensuite afficher dynamiquement à l'écran dans le formulaire*/
    useEffect(() => {
       fetch(`http://localhost:3000/api/idee_scene/${id}`)
       .then(res => res.json())
            .then(data => {
                if (data) {
                    setItem(data)
                }
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des données :', error);
            });
    }, []);

   /* fonction permettant l'ouverture de la modale ou sa fermeture */
    const handleDelete = () => {
        setIsModalOpen(!isModalOpen); 
    }

    /* fonction permettant de gérer la suppression d'une scène en base de donnée */
    const handleErase = async () => {

        await fetch(`http://localhost:3000/api/idee_scene/${id}`, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
        })
        toast.success("scène supprimée de la base de données avec succès");
    }
    
    return (
        <div className="main_card">

            <div className={`${isModalOpen ? "myModal_warning_delete" : "hidden_warning_delete"}`}>
            <div className='warning_delete' >
                        
                        <h1>Êtes-vous sur de vouloir supprimer cette scène ?</h1>
                        <div className='answer_yes_no'>
                        <Link to={`/`}> 
                            <p onClick={handleErase}>OUI</p>
                        </Link> 
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
                        
                            <h1 className="title_scene_card">{Item.title}</h1>
                            <div className="duration_modification_author_card">

                                <div className="duration_card">
                                    <img src={Logo_3} alt="icône d'horloge" /> 
                                    <p>{`Durée : ${Item.duration} minutes`}</p>
                                </div>
                                <div className="date_modification_card">
                                    <img alt="icône de crayon" src={Logo_1}/>
                                    <p >{`Difficultés : ${Item.difficulties}`}</p>
                                </div>

                                <div className="author_card">
                                    <img alt="icône de personnage" src={Logo_2}/>
                                    <p >{`Auteur : ${Item.pseudonyme}`}</p>
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