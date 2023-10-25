import React from "react";
import Introduction from "./text_in_components/introduction";
import Image from "../assets/image_icone_loupe.svg"; 
import Card from "./Card";
import { useEffect } from "react";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";



const LandingPage = () => {

    const [data, setData] = useState([])
    const [selectedValue, setSelectedValue] = useState('Difficultés');
    const [selectedValue_2, setSelectedValue_2] = useState('Durée');
    const [pageNumber, setPageNumber] = useState(0);

    const navigate = useNavigate();

    

    

    /* intégration du système de pagination via la librairie ReactPaginate */
    const cardsPerPage = 5;
    const pagesVisited = pageNumber * cardsPerPage;
    const displayCards = data.slice(pagesVisited, pagesVisited + cardsPerPage).map(({title, pseudonyme, key, _id}) => {
       return(
        <Card
        id= {_id}
        key={key}
        titre = {title}
        auteur = {pseudonyme}/>
       ) 
    });
    const pageCount = Math.ceil(data.length / cardsPerPage);
    const changePage = ({selected}) => {
        setPageNumber(selected)
    }

    /* Fonction permettant d'aller chercher en base de données toutes les cartes puis de les stocker dans 
    le useState data afin qu'elle soit affichée dynamiquement sur la landing page */
    useEffect(() => {

        fetch(`http://localhost:3000/api/scene`)
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setData(data);
                    console.log(data);
                } 
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des données :', error);
            });

    }, []);


/* Ces deux constantes permettent de modifier le rendu visuel des valeurs dans la barre de recherche */
    const handleSelectChange = (e) => {
        setSelectedValue(e.target.value);
    }; 
        
    const handleSelectChange_2 = (e) => {
        setSelectedValue_2(e.target.value);
    };

    const handleClickAddNewScene = () => {
        navigate('/newscene');
    }

   

    return (
        <div>
        <div className="div_presentation">

            <section className="explanation_landingpage">
                <Introduction/>
            </section>

            <section className="search_scene">
                <div className="search_div">
                    
                    <form className="form_research" >

                        <div className="title_author_research">
                            <label htmlFor="title">Titre de la scène</label>
                            <input type="text" placeholder="Nom de la scène" id="title"></input>
                            <label htmlFor="name">Auteur</label>
                            <input type="text" placeholder="Nom de l'auteur" id="name"></input>
                        </div>

                        <div className="other_attributes_button">
                            <div className="first_row_research">

                            <select required name="difficulties" value={selectedValue}  onChange={handleSelectChange}>
                                    <option  disabled hidden>Difficultés</option>
                                    <option value="1">facile</option>
                                    <option value="2">intermédiaire</option>
                                    <option value="3">difficile</option>
                                </select>

                                <select required name="duration" value={selectedValue_2} onChange={handleSelectChange_2} >
                                    <option  disabled hidden >Durée</option>
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
                                <button >
                                    Lancer la recherche <img alt="icone de loupe" src={Image} />
                                </button> 
                            </div>  
                            
                        </div>

                        
                    </form>
                    <div className="create_new_scene">
                            <button className="button_create_new_scene" onClick={handleClickAddNewScene}>Créer une nouvelle scène</button>
                    </div>

                </div>
                

            </section>
            <div className="cards_area">
                {displayCards}
                
                    <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        pageCount={pageCount}
                        onPageChange={changePage}
                        className="pagination_main"
                        activeClassName="paginationActive"
                    />
                
            </div>
        </div>
        </div>  
    )
};
export default LandingPage;