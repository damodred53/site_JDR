import React from "react";
import { useState, useEffect } from "react";
import Image from "../assets/image_icone_loupe.svg"; 
import Cross from "../assets/cross.svg";
import { verifyResearch } from "../Services/Services.jsx";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormResearch = ({ research, updateResearch }) => {

    const [selectedValue, setSelectedValue] = useState('');
    const [selectedValue_2, setSelectedValue_2] = useState('');
    const [titleResearch, setTitleResearch] = useState('');
    const [filteredElement, setFilteredElement] = useState([]);
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };


    useEffect(() => {
        updateResearch([]);
        updateResearch(filteredElement)
    }, [filteredElement]);

    let formData = {};
    const researchData = async () => {
        console.log(formData)
        await fetch('http://localhost:3000/api/research', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        })
        .then((response) => {
            if (response.status === 404) {
                toast.error("Aucune scène ne correspond à votre recherche, mais vous pouvez réessayer")
            }
            return response.json()
        })
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
        setTitleResearch(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        formData.name = titleResearch;
        formData.difficulty = selectedValue;
        formData.duration = selectedValue_2;
        const isResearchValid = verifyResearch(formData);
        await researchData();
        updateResearch(filteredElement);
    }

    const handleErase = () => {
        if (titleResearch !== '') {
            setTitleResearch('');
        } else {
            console.log("je suis vide déjà")
        }
    }

    return (
        <div>
            <form className="form_research" onSubmit={handleSubmit}>

                        <div className="title_author_research">
                            <label htmlFor="title">Titre de la scène</label>
                            <div className="div_input_cross">
                            <input
                                type="text"
                                id="title"
                                onChange={handleChangeTitle}
                                value={titleResearch || ''}
                                onFocus={handleFocus}  // Gère le focus
                                onBlur={handleBlur}    // Gère le blur (perte de focus)
                                style={{
                                    boxShadow: isFocused
                                        ? 'rgba(255, 255, 255, 0.25) 0px 54px 55px, rgba(255, 255, 255, 0.12) 0px -12px 30px, rgba(255, 255, 255, 0.12) 0px 4px 6px, rgba(255, 255, 255, 0.17) 0px 12px 13px, rgba(255, 255, 255, 0.09) 0px -3px 5px'
                                        : 'none',
                                }}
                            />
                                <span className="div_input_cross_erase"> 
                                    {titleResearch !== '' ? <img className="div_input_cross_erase_icon" onClick={handleErase} src={Cross} alt="icone de croix pour vider la recherche"/> : "" }
                                </span>
                            </div>
                        </div>

                        <div className="other_attributes_button">
                            <div className="first_row_research">

                                <select required name="difficulties" value={selectedValue}  onChange={handleSelectChange}>
                                    {/* <option  disabled hidden>Difficultés</option> */}
                                    <option value="null">Aucune difficulté renseignée</option>
                                    <option value="facile">facile</option>
                                    <option value="intermédiaire">intermédiaire</option>
                                    <option value="difficile">difficile</option>
                                </select>

                                <select required name="duration" value={selectedValue_2} onChange={handleSelectChange_2} >
                                    {/* <option  disabled hidden >Durée</option> */}
                                    <option value="null">Aucune durée renseignée</option>
                                    <option value="15">environ 15 minutes</option>
                                    <option value="30">environ 30 minutes </option>
                                    <option value="45">environ 45 minutes </option>
                                    <option value="60">environ 60 minutes </option>
                                </select>

                            </div>

                            <div className="button_research">
                                <button type="submit">
                                    Lancer la recherche <img alt="icone de loupe" src={Image} />
                                </button> 
                            </div>  
                            
                        </div>

                        
            </form>
        </div>

    )
}

export default FormResearch;