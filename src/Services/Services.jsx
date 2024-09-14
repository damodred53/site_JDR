
export const verifyForm = (formData) => {

    let hasError = {};

    if (formData.pseudonyme.trim() === "") {
        hasError.name = true;
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
    /*else if (formData.difficulty.trim() !== "") {
        hasError = false;
    }
    else if (formData.duration.trim() !== "") {
        hasError = false;
    }*/


    return hasError;
}






