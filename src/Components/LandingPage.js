import React from "react";
import Introduction from "./text_in_components/introduction";
import FormResearch from './FormResearch';
import Card from "./Card";
import { useEffect } from "react";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";



const LandingPage = () => {

    const [data, setData] = useState([])
    
    const [pageNumber, setPageNumber] = useState(0);
    const [hasToken, setHasToken] = useState(false);
    const [research, updateResearch] = useState([]);

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
        
        const getToken = localStorage.getItem('tokenUser');
    if (getToken !== null) {
        setHasToken(true);
        
    }
    console.log(research)
        fetch(`http://localhost:3000/api/scene`)
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setData(data);
                    
                } 
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des données :', error);
            });

    }, [research]);




    const handleClickAddNewScene = () => {
        navigate('/newscene');
    }

    const handleClickAuthentification = () => {
        navigate('/authentification');
    }

    const handleClickDisconnect = () => {
        try {
            if (hasToken === true) {
                window.localStorage.removeItem('tokenUser');
                setHasToken(false);
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
        <div className="div_presentation">

            <section className="explanation_landingpage">
                <Introduction/>
            </section>

            <section className="search_scene">
                <div className="search_div">
                    
                    <FormResearch research={research} updateResearch={updateResearch}/>
                    <section className="admin_space">
                        <div className="create_new_scene1 create_new_scene">
                            <button className={`${hasToken ? '' : 'toggleDisplay'} button_create_new_scene`} onClick={handleClickAddNewScene}>Créer une nouvelle scène</button>
                        </div>
                        <div className="deconnexion create_new_scene">
                            <button className={`${hasToken ? '' : 'toggleDisplay'} button_create_new_scene deconnexion`} onClick={handleClickDisconnect}>Se déconnecter</button>
                        </div>
                    </section>
                    <div className="create_new_scene">
                        <button className="button_create_new_scene" onClick={handleClickAuthentification}>Accès admin</button>
                    </div>

                </div>
                

            </section>
            <div className="cards_area">

        {research.length > 0 ? 
        
                research.map((elem) => (
                    <Card
                    id= {elem._id}
                    key={elem.key}
                    titre = {elem.title}
                    auteur = {elem.pseudonyme}/>
                ))
                         : (
                            <>
                {displayCards}
                
                    <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        pageCount={pageCount}
                        onPageChange={changePage}
                        className="pagination_main"
                        activeClassName="paginationActive"
                    />
                    </>)}
                
            </div>
        </div>
        </div>  
    )
};
export default LandingPage;