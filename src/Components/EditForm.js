import React from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useEffect } from "react";
import 'react-toastify/dist/ReactToastify.css';

const EditForm =  () => {

    const [data_2, setData] = useState({
        pseudonyme: "",
        title: "",
        difficulties: null,
        duration : "",
        explication: "",
        description: "",
    });

    /* récupération de la valeur de ID contenu dans l'URL via le hook useParams */
    let {id} = useParams();
    const navigate = useNavigate();
    /* Variable stockant les informations destinées à être envoyées en base de 
    données pour des modifications de celle-ci */
    let modifiedFormData = {};


    /* Fonction permettant d'aller chercher en base de données les informations existantes concernant 
    la scène que l'on va modifier, les informations sont ensuite afficher dynamiquement à l'écran dans le formulaire*/
    useEffect(() => {
        const fetchData = async () => {
                await  fetch(`http://localhost:3000/api/scenes/${id}`)
            .then(res => {
                return res.json()})
            .then(data => {
                if (data) {
                    console.log("voici les données que j'obtiens : ", data)
                    setData(data);
                }
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des données :', error);
            });
             
        }

        fetchData(); 
    }, [])
        

/* Fonction permettant d'envoyer en base de données à les modifications */
const postData = async () => {
        console.log(modifiedFormData)
    await fetch(`http://localhost:3000/api/scenes/${id}`, {
        method: 'PUT',
        headers: {"Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem("tokenUser")},
        body: JSON.stringify(modifiedFormData)
    })
    toast.success('Modification effectuée avec succès');
    navigate('/');

  }  

    const handleSubmit = (e) => {
        e.preventDefault();
        
        modifiedFormData = {
            pseudonyme: data_2.pseudonyme,
            title: data_2.title,
            difficulties: e.target[2].value,
            duration: e.target[3].value,
            description: e.target[4].value,
            explication: e.target[5].value,
          };

        postData();
        console.log(modifiedFormData)
      };

      const handleChange = (event) => {
        
        const {name, value} = event.target
        console.log(name, value)
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
      }

      console.log(data_2)
    return (
       
        <div className="main_contact">
            
            <div className="projet_contact">
                <h3>Vous pouvez modifier <br/> à présent cette scène : <br/> <span className="title_project_contact">{data_2.title}</span> </h3>
            </div>

            <div className="form_div_main">
                <form className="full_formulaire" onSubmit={handleSubmit} >
                    <div className="pseudonyme_and_text_div">
                        <div className="under_div">
                            <label htmlFor="pseudonyme">Pseudonyme</label>
                            <input required type="text" id="pseudonyme" name="pseudonyme" value={data_2.pseudonyme} onChange={handleChange}></input>
                        </div>
                        <div className="under_div">
                            <label htmlFor="title">Titre de la scène</label>
                            <input required type="text" id="title" name="title" value={data_2.title} onChange={handleChange}></input>
                        </div>
                    </div>


                    <div className="email_hard_duration_div">
                        

                        <div className="selection_edit" >
                            <div>
                                <select required name="difficulties" value={data_2.difficulties}  onChange={handleChange}>
                                    <option  disabled hidden>Difficultés</option>
                                    <option value="facile">facile</option>
                                    <option value="intermédiaire">intermédiaire</option>
                                    <option value="difficile">difficile</option>
                                </select>
                            </div>

                            <div>
                                
                                <select required name="duration" value={data_2.duration} onChange={handleChange} >
                                    <option  disabled hidden >Durée</option>
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
                            <label htmlFor="description-scene">Description de la scène</label>
                            <textarea required  className="textarea"  id="description-scene" name="description" value={data_2.description} onChange={handleChange}></textarea>
                        </div>

                        <div className="under_div_scene">
                            <label htmlFor="description-gameplay">Description du gameplay</label>
                            <textarea required className="textarea"  id="description-gameplay" name="explication" value={data_2.explication} onChange={handleChange} ></textarea>
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