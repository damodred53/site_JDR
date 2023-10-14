import React from "react";
import {useState} from "react";
import { useParams } from "react-router-dom";

const EditForm =  () => {
    let {id} = useParams();
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
    const [data_2, setData] = useState([]);
    const [Item, setItem] = useState([]);
        
        const fetchData = async () => {
            if(Item.length === 0) {
                await  fetch(`http://localhost:3000/api/scene`)
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setData(data);
                    const foundItem = data_2.find(item => item.id === parseInt(id, 10));
                    if (foundItem) {
                        setItem(foundItem);
                    }
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

const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value,
    });
    console.log(formData);
};
     
    const handleSubmit = (e) => {
        e.preventDefault();
        
        setFormData({
            pseudonyme: e.target[0].value,
            title: e.target[1].value,
            difficulties: e.target[2].value,
            duration: e.target[3].value,
            description: e.target[4].value,
            descriptionGameplay: e.target[5].value
          });

        fetch('http://localhost:3000/api/idee_scene', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formData)
        
        }).then(() => {
            console.log(formData);
        })
      };
      
      const handleSelectChange = (e) => {
        setSelectedValue(e.target.value);
      };

      const handleSelectChange_2 = (e) => {
        setSelectedValue_2(e.target.value);
      };

      
      
    return (
       
        <div className="main_contact">
            
            <div className="projet_contact">
                <h3>Vous pouvez modifier <br/> à présent cette scène : <br/> <span className="title_project_contact">{Item.titre}</span> </h3>
            </div>

            <div className="form_div_main">
                <form className="full_formulaire" onSubmit={handleSubmit} method="POST" action="localhost:3000/api/idee_scene">
                    <div className="pseudonyme_and_text_div">
                        <div className="under_div">
                            <label htmlFor="pseudonyme">Pseudonyme</label>
                            <input required type="text" id="pseudonyme" name="pseudonyme" value={Item.auteur} onChange={handleInputChange}></input>
                        </div>
                        <div className="under_div">
                            <label htmlFor="title">Titre de la scène</label>
                            <input required type="text" id="title" name="title" value={Item.titre} onChange={handleInputChange} ></input>
                        </div>
                    </div>


                    <div className="email_hard_duration_div">
                        

                        <div className="selection_edit" onChange={handleInputChange} >
                            <div>
                                <select required name="difficulties" value={selectedValue}  onChange={handleSelectChange}>
                                    <option  disabled hidden>Difficultés</option>
                                    <option value="1">facile</option>
                                    <option value="2">intermédiaire</option>
                                    <option value="3">difficile</option>
                                </select>
                            </div>

                            <div onChange={handleInputChange}>
                                
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
                            <textarea required  className="textarea" type="text" value={Item.description} id="description-scene" name="description-scene" onChange={handleInputChange} ></textarea>
                        </div>

                        <div className="under_div_scene">
                            <label htmlFor="description-gameplay">Description du gameplay</label>
                            <textarea required className="textarea" type="text" value={Item.explication} id="description-gameplay" name="description-gameplay" onChange={handleInputChange} ></textarea>
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