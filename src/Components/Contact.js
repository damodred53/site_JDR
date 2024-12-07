import React from "react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { verifyForm } from "../Services/Services";


const Contact = () => {

    /*const [errorName, setErrorName] = useState(false);
    const [errorMail, setErrorMail] = useState(false);
    const [errorDescription, setErrorDescription] = useState(false);
    const [errorScene, setErrorScene] = useState(false);*/
    const [error, setError] = useState({});
    const [selectedValue, setSelectedValue] = useState('Difficultés');
    const [selectedValue_2, setSelectedValue_2] = useState('Durée');
    const refName = useRef();
    const refTitle = useRef();
    const refEmail = useRef();
    const refScene = useRef();
    const refDescription = useRef();

    let formData = {};

    const navigate = useNavigate();


    /* Fonction permettant de proposer une idée de scène le formulaire se trouve dans Contact */
    const postData = async () => {

        /*if (errorDescription || errorMail || errorName || errorScene) {
            console.log(errorName);
            console.log(errorMail);
            console.log(errorDescription);
            console.log(errorScene);
    
        return*/


        await fetch('http://localhost:3000/api/send_email', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        })
            .then(toast.success("mail envoyé à l'administrateur avec succès"))

    }


    /* fonction permettant de récupérer les informations contenus dans le formulaire de contact et de stocker les 
    informations dans formData avant son envoi en base de donnés */

    const handleSubmit = async (e) => {
        e.preventDefault();

        /*setErrorName(false);
        setErrorMail(false);
        setErrorDescription(false);
        setErrorScene(false);*/

        try {
            formData = {
                pseudonyme: e.target[0].value,
                title: e.target[1].value,
                email: e.target[2].value,
                difficulties: e.target[3].value,
                duration: e.target[4].value,
                description: e.target[5].value,
                explication: e.target[6].value
            };
        } catch (error) {
            console.log("Remplissage incorrect du formulaire");
            throw error;
        }


        /* faire ici une fonction de vérification des données */
        let IsFormValid = verifyForm(formData);

        console.log(IsFormValid);

        if (Object.keys(IsFormValid).length > 0) {
            console.log("Des erreurs ont été détectées dans le formulaire.");
            setError(IsFormValid)
        }
        else {
            setError(IsFormValid)
            console.log(error)
            IsFormValid = {}
            postData();
            navigate("/");
        }
    }


    /* Ces deux constantes permettent de modifier le rendu visuel des valeurs dans les 
    deux menus déroulants du formulaire */

    const handleSelectChange = (e) => {
        setSelectedValue(e.target.value);
    };

    const handleSelectChange_2 = (e) => {
        setSelectedValue_2(e.target.value);
    }


    return (
        <div className="main_contact">
            <div className="projet_contact">
                <h3 >Un projet ? Une idée ? Ou simplement une question ?<br />N'hésitez pas à me contacter pour me <br />proposer vos idées de scènes</h3>
            </div>

            <div className="form_div_main">
                <form className="full_formulaire" onSubmit={handleSubmit} method="POST" action="/send_email">
                    <div className="name_title">
                        <div className="name_title_name ">
                            <div className="name_title_name_text_div">
                                <label htmlFor="pseudonyme">Pseudonyme</label>
                                <input type="text" id="pseudonyme" name="pseudonyme" ></input>
                            </div>
                            { error.name &&
                            <div >
                                    <p className="name_title_name_error" ref={refName}>Veuillez remplir ce champ avant l'envoi du formulaire</p>
                            </div>
                            }
                        </div>

                        <div className="name_title_title ">
                            <div className="name_title_name_text_div">
                                <label htmlFor="title">Titre de la scène</label>
                                <input type="text" id="title" name="title" />
                            </div>
                            { error.title &&
                            <div >
                                    <p className="name_title_name_error" ref={refTitle}>Veuillez remplir ce champ avant l'envoi du formulaire</p>
                            </div>
                            }
                        </div>
                    </div>


                    <div className="email_hard_duration_div">
                        
                            <div className="email_div" >
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="email"  ></input>
                            </div>
                            {error.mail &&
                                <div>
                                    <p className="name_title_title_error" ref={refEmail}>Veuillez remplir ce champ avant l'envoi du formulaire</p>
                                </div>
                            }
                        
                        

                        <div className="selections" >
                            <div>
                                <select name="difficulties" value={selectedValue} onChange={handleSelectChange}>
                                    <option disabled hidden>Difficultés</option>
                                    <option value="facile">facile</option>
                                    <option value="intermédiaire">intermédiaire</option>
                                    <option value="difficile">difficile</option>
                                </select>
                            </div>

                            <div className="selections_duration" >
                                <select name="duration" value={selectedValue_2} onChange={handleSelectChange_2} >
                                    <option disabled hidden >Durée</option>
                                    <option value="15">15 minutes ou moins</option>
                                    <option value="30">30 minutes ou moins</option>
                                    <option value="45">45 minutes ou moins</option>
                                    <option value="60">60 minutes ou moins</option>
                                </select>
                            </div>
                        </div>
                    </div>


                    <div className="description_gameplay_contact_div">
                        <div className="under_div_scene">
                            <div >
                                <label htmlFor="under_div_scene_description-scene">Description de la scène <span className="under_div_scene_description-scene_span">( Vous pouvez ici poser votre question )</span></label>
                                <textarea className="textarea" type="text" placeholder="Votre description ici..." id="description-scene" name="description-scene"  ></textarea>
                            </div>
                            {error.description &&
                                <div>
                                    <p className="name_title_title_error_big" ref={refDescription}>Veuillez remplir ce champ avant l'envoi du formulaire</p>
                                </div>
                            }
                        </div>

                        <div className="under_div_scene">
                            <div>
                                <label htmlFor="description-gameplay">Description du gameplay</label>
                                <textarea className="textarea" type="text" placeholder="Votre explication du gameplay ici..." id="description-gameplay" name="description-gameplay"  ></textarea>
                            </div>


                            {error.explication &&
                                <div>
                                    <p className="name_title_title_error_big" ref={refScene}>Veuillez remplir ce champ avant l'envoi du formulaire</p>
                                </div>
                            }



                            <div className="button_contact">
                                <button value="submit" type="submit">Envoyer</button>
                            </div>

                        </div>
                    </div>

                </form>
            </div>
        </div>

    )
}

export default Contact;