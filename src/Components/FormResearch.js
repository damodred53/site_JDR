import React from "react";
import { useState, useEffect } from "react";
import Image from "../assets/image_icone_loupe.svg"; 

const FormResearch = ({ research, updateResearch }) => {

    const [selectedValue, setSelectedValue] = useState('Difficultés');
    const [selectedValue_2, setSelectedValue_2] = useState('Durée');
    const [titleResearch, setTitleResearch] = useState('');
    const [filteredElement, setFilteredElement] = useState([]);


    useEffect(() => {
        updateResearch([]);
        updateResearch(filteredElement)
    }, [filteredElement]);

    let formData = {};
    const researchData = async () => {

        await fetch('http://localhost:3000/api/research', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        })
        .then((response) => response.json())
        .then((data) => {
        setFilteredElement(data);
        }) 
        
        
    }

    /* Ces deux constantes permettent de modifier le rendu visuel des valeurs dans la barre de recherche */
    const handleSelectChange = (e) => {
        setSelectedValue(e.target.value);
    }; 
        
    const handleSelectChange_2 = (e) => {
        setSelectedValue_2(e.target.value);
    };

    const handleChangeTitle = (e) => {
        const title = e.target.value;
        setTitleResearch(title);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        formData.name = titleResearch;
        formData.difficulty = selectedValue;
        formData.duration = selectedValue_2;
        await researchData();
        updateResearch(filteredElement);
    }

    return (
        <div>
            <form className="form_research" onSubmit={handleSubmit}>

                        <div className="title_author_research">
                            <label htmlFor="title">Titre de la scène</label>
                            <input type="text" placeholder="Nom de la scène" id="title" onChange={handleChangeTitle}></input>
                            
                        </div>

                        <div className="other_attributes_button">
                            <div className="first_row_research">

                            <select required name="difficulties" value={selectedValue}  onChange={handleSelectChange}>
                                    <option  disabled hidden>Difficultés</option>
                                    <option value="facile">facile</option>
                                    <option value="intermédiaire">intermédiaire</option>
                                    <option value="difficile">difficile</option>
                                </select>

                                <select required name="duration" value={selectedValue_2} onChange={handleSelectChange_2} >
                                    <option  disabled hidden >Durée</option>
                                    <option value="15">15 minutes ou moins</option>
                                    <option value="30">30 minutes ou moins</option>
                                    <option value="45">45 minutes ou moins</option>
                                    <option value="60">60 minutes ou moins</option>
                                </select>

                                

                            </div>

                            <div className="button_research">
                                <button >
                                    Lancer la recherche <img alt="icone de loupe" src={Image} />
                                </button> 
                            </div>  
                            
                        </div>

                        
            </form>
        </div>

    )
}

export default FormResearch;