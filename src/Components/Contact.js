import React from "react";
import { useState } from "react";

const Contact = () => {

    const [selectedValue, setSelectedValue] = useState('Difficultés');
    const [selectedValue_2, setSelectedValue_2] = useState('Durée');

    const [formData, setFormData] = useState({
        pseudonyme: "",
        title: "",
        email: "",
        difficulties: "",
        duration: "",
        descriptionScene: "",
        descriptionGameplay: "",
      });

      const handleSubmit = (e) => {
        e.preventDefault();
        
        setFormData({
          pseudonyme: e.target[0].value,
          title: e.target[1].value,
          email: e.target[2].value,
          difficulties: e.target[3].value,
          duration: e.target[4].value,
          descriptionScene: e.target[5].value,
          descriptionGameplay: e.target[6].value
        });

        
      }
      console.log(formData);
      

      const handleSelectChange = (e) => {
        setSelectedValue(e.target.value);
      };

      const handleSelectChange_2 = (e) => {
        setSelectedValue_2(e.target.value);
      }
  

    return (
        <div className="main_contact">
            <div className="projet_contact">
                <h3 >Un projet ? Une idée ? <br/>N'hésitez pas à me contacter pour me <br/>proposer vos idées de scènes</h3>
            </div>

            <div className="form_div_main">
                <form className="full_formulaire" onSubmit={handleSubmit}>
                    <div className="pseudonyme_and_text_div">
                        <div className="under_div">
                            <label htmlFor="pseudonyme">Pseudonyme</label>
                            <input required type="text" id="pseudonyme" name="pseudonyme"></input>
                        </div>
                        <div className="under_div">
                            <label htmlFor="title">Titre de la scène</label>
                            <input required type="text" id="title" name="title" ></input>
                        </div>
                    </div>


                    <div className="email_hard_duration_div">
                        <div className="email_div">
                            <label htmlFor="email">Email</label>
                            <input required type="email" id="email" name="email" ></input>
                        </div>

                        <div className="selections" >
                            <div>
                                <select required name="difficulties" value={selectedValue}  onChange={handleSelectChange}>
                                    <option  disabled hidden>Difficultés</option>
                                    <option value="1">facile</option>
                                    <option value="2">intermédiaire</option>
                                    <option value="3">difficile</option>
                                </select>
                            </div>

                            <div>
                                
                                <select required name="duration" value={selectedValue_2} onChange={handleSelectChange_2} >
                                    <option  disabled hidden >Durée</option>
                                    <option value="1">15 minutes ou moins</option>
                                    <option value="2">30 minutes ou moins</option>
                                    <option value="3">45 minutes ou moins</option>
                                    <option value="4">60 minutes ou moins</option>
                                </select>
                            </div>
                        </div>
                    </div>


                    <div className="description_gameplay_contact_div">
                        <div className="under_div_scene">
                            <label htmlFor="description-scene">Description de la scène</label>
                            <textarea required  className="textarea" type="text" placeholder="Votre description ici..." id="description-scene" name="description-scene" ></textarea>
                        </div>

                        <div className="under_div_scene">
                            <label htmlFor="description-gameplay">Description du gameplay</label>
                            <textarea required className="textarea" type="text" placeholder="Votre explication du gameplay ici..." id="description-gameplay" name="description-gameplay" ></textarea>
                        </div>
                    </div>
                    <div className="button_contact">
                        <button type="submit">Envoyer</button>
                    </div>
                </form>
            </div>
        </div>
        
    )
}

export default Contact;