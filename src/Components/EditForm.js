import React from "react";
import {useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {toast} from 'react-toastify';
import {useEffect} from "react";
import 'react-toastify/dist/ReactToastify.css';

const EditForm = () => {

    const [sceneData, setSceneData] = useState({
        pseudonyme: "",
        title: "",
        email: "",
        difficulties: "",
        duration: "",
        description: "",
        explication: "",
    });

    /* récupération de la valeur de ID contenu dans l'URL via le hook useParams */
    const {id} = useParams();
    const navigate = useNavigate();
    /* Variable stockant les informations destinées à être envoyées en base de 
    données pour des modifications de celle-ci */
    let modifiedFormData = {};
    let initialTitle;


    /* Fonction permettant d'aller chercher en base de données les informations existantes concernant 
    la scène que l'on va modifier, les informations sont ensuite afficher dynamiquement à l'écran dans le formulaire*/
    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/scenes/${id}`);
                const data = await res.json();
                if (data) {
                    console.log("voici les données que j'obtiens : ", data);
                    if (!data.email) {
                        data.email = "";
                    }
                    setSceneData(data);
                    initialTitle = data.title;
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des données :', error);
            }
        })();
    }, []);


    /* Fonction permettant d'envoyer en base de données à les modifications */
    const postData = async () => {
        console.log(modifiedFormData)
        try {
            await fetch(`http://localhost:3000/api/scenes/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("tokenUser")
                },
                body: JSON.stringify(modifiedFormData)
            })
            toast.success('Modification effectuée avec succès');
            navigate('/');
        } catch (error) {
            console.error('Erreur lors de la modification des données :', error);
            toast.error('Erreur lors de la mise à jour de la scène');
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        modifiedFormData = {
            pseudonyme: sceneData.pseudonyme,
            title: sceneData.title,
            email: sceneData.email,
            difficulties: sceneData.difficulties,
            duration: sceneData.duration,
            description: sceneData.description,
            explication: sceneData.explication,
        };
        console.log("modifiedFormData", modifiedFormData)

        postData();
        console.log(modifiedFormData)
    };

    const handleChange = (event) => {

        const {name, value} = event.target
        console.log("editing " + name + "with value " + value);
        setSceneData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    console.log(sceneData)
    return (
        <div className="main_edit_form">
            <div className="form_div_main_editscene">
                <form className="full_formulaire" onSubmit={handleSubmit}>
                    <div className="suggestion_newscene">
                        <h1>Vous pouvez modifier à présent cette scène :</h1>
                        <h2> {initialTitle} </h2>
                    </div>

                    <div className="pseudonyme_and_text_div">
                        <div className="pseudonyme_and_text_div_under_div">
                            <label htmlFor="pseudonyme">Pseudonyme</label>
                            <input required type="text" id="pseudonyme" name="pseudonyme" value={sceneData.pseudonyme}
                                   onChange={handleChange}></input>
                        </div>
                        <div className="pseudonyme_and_text_div_under_div">
                            <label htmlFor="title">Titre de la scène</label>
                            <input required type="text" id="title" name="title" value={sceneData.title}
                                   onChange={handleChange}></input>
                        </div>
                    </div>


                    <div className="email_hard_duration_div">
                        <div className="email_div">
                            <label htmlFor="email">Email</label>
                            <input required type="email" id="email" name="email" value={sceneData.email}
                                   onChange={handleChange}></input>
                        </div>

                        <div className="selections">
                            <div>
                                <select required name="difficulties" value={sceneData.difficulties}
                                        onChange={handleChange}>
                                    <option disabled hidden>Difficultés</option>
                                    <option value="facile">facile</option>
                                    <option value="intermédiaire">intermédiaire</option>
                                    <option value="difficile">difficile</option>
                                </select>
                            </div>

                            <div>
                                <select required name="duration" value={sceneData.duration} onChange={handleChange}>
                                    <option disabled hidden>Durée</option>
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
                            <label htmlFor="description">Description de la scène</label>
                            <textarea required className="textarea" id="description" name="description"
                                      value={sceneData.description} onChange={handleChange}></textarea>
                        </div>

                        <div className="under_div_scene">
                            <label htmlFor="explication">Description du gameplay</label>
                            <textarea required className="textarea" id="explication"
                                      name="explication" value={sceneData.explication}
                                      onChange={handleChange}></textarea>
                        </div>
                    </div>
                    <div className="button_contact">
                        <button value="submit" type="submit">Envoyer</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditForm;