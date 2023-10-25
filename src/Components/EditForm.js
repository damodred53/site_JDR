import React from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const EditForm =  () => {

    const [selectedValue, setSelectedValue] = useState('Difficultés');
    const [selectedValue_2, setSelectedValue_2] = useState('Durée');
    const [data_2, setData] = useState([]);

    /* récupération de la valeur de ID contenu dans l'URL via le hook useParams */
    let {id} = useParams();
    const navigate = useNavigate();
    /* Variable stockant les informations destinées à être envoyées en base de 
    données pour des modifications de celle-ci */
    let modifiedFormData = {};


    /* Fonction permettant d'aller chercher en base de données les informations existantes concernant 
    la scène que l'on va modifier, les informations sont ensuite afficher dynamiquement à l'écran dans le formulaire*/

        const fetchData = async () => {
            if(data_2.length === 0) {
                await  fetch(`http://localhost:3000/api/idee_scene/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setData(data);
                }
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des données :', error);
            });
            } else {
                return
            }    
}
fetchData();

/* Fonction permettant d'envoyer en base de données à les modifications */
const postData = async () => {
        
    await fetch(`http://localhost:3000/api/idee_scene/${id}`, {
        method: 'PATCH',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(modifiedFormData)
    })
    toast.success('Modification effectuée avec succès');
    navigate('/');

  }  

    const handleSubmit = (e) => {
        e.preventDefault();
        
        modifiedFormData = {
            pseudonyme: e.target[0].value,
            title: e.target[1].value,
            difficulties: e.target[2].value,
            duration: e.target[3].value,
            description: e.target[4].value,
            explication: e.target[5].value,
          };

        postData();
        
      };

      /* Ces deux constantes permettent de modifier le rendu visuel des valeurs dans les 
      deux menus déroulants du formulaire */
      const handleSelectChange = (e) => {
        setSelectedValue(e.target.value);
      };
      const handleSelectChange_2 = (e) => {
        setSelectedValue_2(e.target.value);
      };

    return (
       
        <div className="main_contact">
            
            <div className="projet_contact">
                <h3>Vous pouvez modifier <br/> à présent cette scène : <br/> <span className="title_project_contact">{data_2.title}</span> </h3>
            </div>

            <div className="form_div_main">
                <form className="full_formulaire" onSubmit={handleSubmit} method="PATCH" action="localhost:3000/api/idee_scene">
                    <div className="pseudonyme_and_text_div">
                        <div className="under_div">
                            <label htmlFor="pseudonyme">Pseudonyme</label>
                            <input required type="text" id="pseudonyme" name="pseudonyme" value={data_2.titre}></input>
                        </div>
                        <div className="under_div">
                            <label htmlFor="title">Titre de la scène</label>
                            <input required type="text" id="title" name="title" value={data_2.titre}></input>
                        </div>
                    </div>


                    <div className="email_hard_duration_div">
                        

                        <div className="selection_edit" >
                            <div>
                                <select required name="difficulties" value={selectedValue}  onChange={handleSelectChange}>
                                    <option  disabled hidden>Difficultés</option>
                                    <option value="facile">facile</option>
                                    <option value="intermédiaire">intermédiaire</option>
                                    <option value="difficile">difficile</option>
                                </select>
                            </div>

                            <div>
                                
                                <select required name="duration" value={selectedValue_2} onChange={handleSelectChange_2} >
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
                            <textarea required  className="textarea" type="text"  id="description-scene" name="description-scene"  >{data_2.description}</textarea>
                        </div>

                        <div className="under_div_scene">
                            <label htmlFor="description-gameplay">Description du gameplay</label>
                            <textarea required className="textarea" type="text"  id="description-gameplay" name="description-gameplay" >{data_2.explication}</textarea>
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