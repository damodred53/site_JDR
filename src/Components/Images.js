
import PlanteImage from "../assets/plante.avif";
import Fleur from "../assets/fleur.webp";
import Image from "../assets/image_1.jpg";

const images = {
    "../assets/plante.avif": PlanteImage,
    "../assets/fleur.webp" : Fleur
};

export const getImageSrc = (imageUrl) => {
    return images[imageUrl] || Image; 
};