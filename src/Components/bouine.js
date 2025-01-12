import React, { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
    // État pour les champs du formulaire
    const [formData, setFormData] = useState({
        pseudonyme: '',
        title: '',
        email: '',
        difficulties: 'Difficultés',
        duration: 'Durée',
        description: '',
        explication: ''
    });

    const URL = process.env.REACT_APP_URL_SERVER;

    // État pour les erreurs de formulaire
    const [errors, setErrors] = useState({});

    // Gestion des changements de champs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Validation du formulaire
    const validateForm = () => {
        const newErrors = {};
        if (!formData.pseudonyme.trim()) newErrors.pseudonyme = "Veuillez remplir ce champ.";
        if (!formData.email.trim()) newErrors.email = "Veuillez remplir ce champ.";
        if (!formData.description.trim()) newErrors.description = "Veuillez remplir ce champ.";
        if (!formData.explication.trim()) newErrors.explication = "Veuillez remplir ce champ.";
        return newErrors;
    };

    // Soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            await fetch(`${URL}/api/send_email`, {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(formData)
            });
            toast.success("Mail envoyé à l'administrateur avec succès.");
            setFormData({
                pseudonyme: '',
                title: '',
                email: '',
                difficulties: 'Difficultés',
                duration: 'Durée',
                description: '',
                explication: ''
            });
            setErrors({});
        } catch (error) {
            toast.error("Une erreur est survenue lors de l'envoi du mail.");
        }
    };

    return (
        <div className="main_contact">
            <div className="projet_contact">
                <h3>
                    Un projet ? Une idée ? Ou simplement une question ?<br />
                    N'hésitez pas à me contacter pour me<br />
                    proposer vos idées de scènes
                </h3>
            </div>

            <div className="form_div_main">
                <form className="full_formulaire" onSubmit={handleSubmit}>
                    <div className="name_title">
                        <div className="name_title_name">
                            <div className="name_title_name_text_div">
                                <label htmlFor="pseudonyme">Pseudonyme</label>
                                <input
                                    type="text"
                                    id="pseudonyme"
                                    name="pseudonyme"
                                    value={formData.pseudonyme}
                                    onChange={handleChange}
                                />
                                {errors.pseudonyme && <p className="error">{errors.pseudonyme}</p>}
                            </div>
                        </div>

                        <div className="name_title_title">
                            <div className="name_title_name_text_div">
                                <label htmlFor="title">Titre de la scène</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="email_hard_duration_div">
                        <div className="email_div">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && <p className="error">{errors.email}</p>}
                        </div>

                        <div className="selections">
                            <select
                                name="difficulties"
                                value={formData.difficulties}
                                onChange={handleChange}
                            >
                                <option disabled hidden>Difficultés</option>
                                <option value="facile">facile</option>
                                <option value="intermédiaire">intermédiaire</option>
                                <option value="difficile">difficile</option>
                            </select>

                            <select
                                name="duration"
                                value={formData.duration}
                                onChange={handleChange}
                            >
                                <option disabled hidden>Durée</option>
                                <option value="15">15 minutes ou moins</option>
                                <option value="30">30 minutes ou moins</option>
                                <option value="45">45 minutes ou moins</option>
                                <option value="60">60 minutes ou moins</option>
                            </select>
                        </div>
                    </div>

                    <div className="description_gameplay_contact_div">
                        <div className="under_div_scene">
                            <label htmlFor="description">
                                Description de la scène{" "}
                                <span>( Vous pouvez ici poser votre question )</span>
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                placeholder="Votre description ici..."
                                value={formData.description}
                                onChange={handleChange}
                            />
                            {errors.description && <p className="error">{errors.description}</p>}
                        </div>

                        <div className="under_div_scene">
                            <label htmlFor="explication">Description du gameplay</label>
                            <textarea
                                id="explication"
                                name="explication"
                                placeholder="Votre explication du gameplay ici..."
                                value={formData.explication}
                                onChange={handleChange}
                            />
                            {errors.explication && <p className="error">{errors.explication}</p>}
                        </div>
                    </div>

                    <div className="button_contact">
                        <button type="submit">Envoyer</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Contact;



