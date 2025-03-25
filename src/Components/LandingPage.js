import React, {useEffect, useRef, useState} from "react";
import Introduction from "./text_in_components/introduction";
import FormResearch from "./FormResearch";
import Card from "./Card";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const [data, setData] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [hasToken, setHasToken] = useState(false);
    const [research, setResearch] = useState([]);
    const navigate = useNavigate();
    const cardsAreaRef = useRef(null);

    const URL = process.env.REACT_APP_URL_SERVER;

    /* intégration du système de pagination via la librairie ReactPaginate */
    const cardsPerPage = 5;
    const pagesVisited = pageNumber * cardsPerPage;

    // Déterminer les cartes à afficher en fonction des résultats (recherche ou données de base)
    const activeData = research.length > 0 ? research : data;

    const displayCards = activeData.slice(pagesVisited, pagesVisited + cardsPerPage).map(({ title, pseudonyme, _id, imageUrl = "/scenes/cyberpunk.jpg" }) => (
        <Card id={_id} key={_id} titre={title} auteur={pseudonyme} imageUrl={imageUrl} />
    ));

    const pageCount = Math.max(1, Math.ceil(activeData.length / cardsPerPage));
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    /* Fonction permettant d'aller chercher en base de données toutes les cartes */
    useEffect(() => {
        const getToken = localStorage.getItem("tokenUser");
        if (getToken !== null) {
            setHasToken(true);
        }

        fetch(`${URL}/api/scenes`)
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    setData(data);
                }
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des données :", error);
            });
    }, []);

    const handleClickAddNewScene = () => {
        navigate("/newscene");
    };

    const handleClickDisconnect = () => {
        try {
            if (hasToken === true) {
                window.localStorage.removeItem("tokenUser");
                setHasToken(false);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleGoUp = () => {
        if (cardsAreaRef.current) {
            cardsAreaRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleResearchUpdate = (newResearch) => {
        setResearch(newResearch);
        setPageNumber(0);
    };

    
    return (
        
            <div className="div_presentation">
                <section className="explanation_landingpage">
                    <Introduction />
                </section>

                <section className="search_scene">
                    <div className="search_div">
                        <FormResearch research={research} updateResearch={handleResearchUpdate} />
                        <section className="admin_space">
                            <div className="create_new_scene1 create_new_scene">
                                <button
                                    className={`${hasToken ? "" : "toggleDisplay"} button_create_new_scene`}
                                    onClick={handleClickAddNewScene}
                                >
                                    Créer une nouvelle scène
                                </button>
                            </div>
                            <div className="deconnexion create_new_scene">
                                <button
                                    className={`${hasToken ? "" : "toggleDisplay"} button_create_new_scene deconnexion`}
                                    onClick={handleClickDisconnect}
                                >
                                    Se déconnecter
                                </button>
                            </div>
                        </section>
                    </div>
                </section>
                <div className="cards_area" ref={cardsAreaRef}>
                    {displayCards}

                    <ReactPaginate
                        previousLabel={"Précédent"}
                        nextLabel={"Suivant"}
                        pageCount={pageCount}
                        onPageChange={changePage}
                        className="pagination_main"
                        activeClassName="paginationActive"
                        disabledClassName="paginationDisabled"
                        onClick={handleGoUp}
                        disableInitialCallback={true}
                        forcePage={pageNumber}
                    />
                </div>
            </div>
        
    );
};

export default LandingPage;
