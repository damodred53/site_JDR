import React from "react";
import Image from "../assets/image_1.jpg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Card = ({titre, auteur, imageUrl, key, id}) => {

    

    /*useEffect(() => {

        fetch(`http://localhost:3000/api/cards`)
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setData(data);
                } 
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des données :', error);
            });

    }, []);*/

    return (
        
            <div className="div_main_card" key={0}>
                
                <Link to={`/SceneCard/${id}`} className="link_card">
                    <div className="banner_picture_card" >
                        <img className="banner_picture"  key={3} alt="cyberpunk"  src={Image}/>
                    </div>
                    <div className="content_card">
                        <img className="picture_card" key={3} alt="cyberpunk"  src={Image}/>
                        <div className="title_author_div">
                            <div className="title_card"  key={1}>{titre}</div>
                            <div className="author_card" key={2}>{auteur}</div>
                        </div>
                    </div>
                </Link>
            </div>
    )
}

export default Card;