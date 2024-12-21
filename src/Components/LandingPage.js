import React, { useEffect, useState } from "react";
import Introduction from "./text_in_components/introduction";
import FormResearch from "./FormResearch";
import Card from "./Card";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const [data, setData] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [hasToken, setHasToken] = useState(false);
    const [research, updateResearch] = useState([]);
    const navigate = useNavigate();

    /* intégration du système de pagination via la librairie ReactPaginate */
    const cardsPerPage = 5;
    const pagesVisited = pageNumber * cardsPerPage;

    // Déterminer les cartes à afficher en fonction des résultats (recherche ou données de base)
    const activeData = research.length > 0 ? research : data;

    const displayCards = activeData.slice(pagesVisited, pagesVisited + cardsPerPage).map(({ title, pseudonyme, _id, imageUrl = "/scenes/cyberpunk.jpg" }) => (
        <Card id={_id} key={_id} titre={title} auteur={pseudonyme} imageUrl={imageUrl} />
    ));

    const pageCount = Math.ceil(activeData.length / cardsPerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    /* Fonction permettant d'aller chercher en base de données toutes les cartes */
    useEffect(() => {
        const getToken = localStorage.getItem("tokenUser");
        if (getToken !== null) {
            setHasToken(true);
        }

        fetch(`http://localhost:3000/api/scenes`)
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

    const handleClickAuthentification = () => {
        navigate("/authentification");
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
        window.scrollTo(0, 550);
    };

    return (
        
            <div className="div_presentation">
                <section className="explanation_landingpage">
                    <Introduction />
                </section>

                <section className="search_scene">
                    <div className="search_div">
                        <FormResearch research={research} updateResearch={updateResearch} />
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
                        <div className="create_new_scene">
                            <button className="button_create_new_scene" onClick={handleClickAuthentification}>
                                Accès admin
                            </button>
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
                        onClick={handleGoUp}
                    />
                </div>
            </div>
        
    );
};

export default LandingPage;
