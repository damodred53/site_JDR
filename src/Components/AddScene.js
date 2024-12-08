import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Contact = () => {

    const [selectedValue, setSelectedValue] = useState('Difficultés');
    const [selectedValue_2, setSelectedValue_2] = useState('Durée');
    
      let formData = {};
        const navigate =useNavigate();

      /* Fonction permettant de proposer une idée de scène le formulaire se trouve dans Contact */
      const postData = async () => {
        
        const response = await fetch('http://localhost:3000/api/scenes', {
            method: 'POST',
            headers: {"Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem("tokenUser")},
            body: JSON.stringify(formData)
        })

        if (response.ok) {
            toast.success("Vous venez de créer une nouvelle scène");
        } else {
            toast.error("Imposible de créer la nouvelles scène")
        }
    
        navigate('/');
      }
      /* fonction permettant de récupérer les informations contenus dans le formulaire de contact et de stocker les 
      informations dans formData avant son envoi en base de donnés */

      const handleSubmit = async (e) =>  {
        e.preventDefault();
        formData = {
            pseudonyme: e.target[0].value,
            title: e.target[1].value,
            email: e.target[2].value,
            difficulties: e.target[3].value,
            duration: e.target[4].value,
            description: e.target[5].value,
            explication: e.target[6].value
          };
          
        await postData();
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
            <div className="form_div_main_newscene">
                <form className="full_formulaire" onSubmit={handleSubmit} method="POST" action="localhost:3000/api/scenes">
                    
                    <div className="suggestion_newscene">
                        <h1>Voici la page vous permettant de créer une nouvelle scène pour le Scenatorium </h1>
                    </div>
                       
                    <div className="pseudonyme_and_text_div">
                        <div className="pseudonyme_and_text_div_under_div">
                            <label htmlFor="pseudonyme">Pseudonyme</label>
                            <input required type="text" id="pseudonyme" name="pseudonyme" ></input>
                        </div>
                        <div className="pseudonyme_and_text_div_under_div">
                            <label htmlFor="title">Titre de la scène</label>
                            <input required type="text" id="title" name="title"  ></input>
                        </div>
                    </div>


                    <div className="email_hard_duration_div">
                        <div className="email_div">
                            <label htmlFor="email">Email</label>
                            <input required type="email" id="email" name="email"  ></input>
                        </div>

                        <div className="selections" >
                            <div>
                                <select required name="difficulties" value={selectedValue}  onChange={handleSelectChange}>
                                    <option  disabled hidden>Difficultés</option>
                                    <option value="facile">facile</option>
                                    <option value="intermédiaire">intermédiaire</option>
                                    <option value="difficile">difficile</option>
                                </select>
                            </div>

                            <div >
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
                            <textarea required  className="textarea" placeholder="Votre description ici..." id="description-scene" name="description-scene"  ></textarea>
                        </div>

                        <div className="under_div_scene">
                            <label htmlFor="description-gameplay">Description du gameplay</label>
                            <textarea required className="textarea" placeholder="Votre explication du gameplay ici..." id="description-gameplay" name="description-gameplay"  ></textarea>
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

export default Contact;