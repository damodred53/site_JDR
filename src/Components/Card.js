import React from "react";
import { Link } from "react-router-dom";

const Card = ({titre, auteur, imageUrl, id}) => {
    return (
        
            <div className="div_main_card" key={0}>
                
                <Link to={`/SceneCard/${id}`} className="link_card">
                    <div className="banner_picture_card" >
                        <img className="banner_picture"  key={3} alt="cyberpunk" src={imageUrl} />
                    </div>
                    <div className="content_card">
                        <img className="picture_card" key={3} alt="cyberpunk" src={imageUrl} />
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