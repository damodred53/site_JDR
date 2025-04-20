import {toast} from 'react-toastify';

export const verifyForm = (formData) => {

    let hasError = {};

    if (formData.pseudonyme.trim() === "") {
        hasError.name = true;
    }
    if (formData.title.trim() === "") {
        hasError.title = true;
    }
    if (formData.email.trim() === "") {
        hasError.mail = true;
    }
    if (formData.description.trim() === "") {
        hasError.description = true;
    }
    if (formData.explication.trim() === "") {
        hasError.explication = true;
    }

    return hasError;
}

export const verifyResearch = (formData) => {

    let hasError = true;

    if (formData.name.trim() !== "")  {
        hasError = false;
    }
    
    return hasError;
}

/* Fonction permettant de proposer une idée de scène le formulaire se trouve dans Contact */
export const postData = async (formData) => {
    try {
        const URL = process.env.REACT_APP_URL_SERVER;
        const response = await fetch(`${URL}/api/send_email`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        const data = await response.json(); // Essaye de lire la réponse JSON  

        if (!response.ok) {
            toast.error(`Erreur serveur: ${response.status} - ${data.message || "Aucune info"}`);
            console.error(`Erreur serveur: ${response.status} - ${data.message || "Aucune info"}`);
            return null;
        }

        toast.success("Mail envoyé à l'administrateur avec succès");
        return data; // Retourne la réponse JSON  
    } catch (error) {
        toast.error("Erreur lors de l'envoi du mail");
        console.error("Erreur fetch:", error);
        return null;
    }
};





