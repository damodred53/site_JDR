import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';



const Admin = () => {

    let userData = {};
    let userLogin = {};
    const navigate = useNavigate();

    const URL = process.env.REACT_APP_URL_SERVER;
    console.log(URL);

     const postUserData = async () => {
        console.log(userData);

            await fetch(`${URL}/api/auth`, {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(userData)
            }).then(() => console.log(userData));
    };

    const handleSignUp =  (e) => {
        e.preventDefault();

        userData.userName =  e.target[0].value
        userData.passWord =  e.target[1].value

        postUserData();
    }

    const postLoginData = async () => {

        const response = await fetch(`${URL}/api/login`, {
            method: 'POST',
            headers: {"Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem("tokenUser")},
            body: JSON.stringify(userLogin)
    })
    
        if(response.ok) {
           const responseData =await response.json()

            
           if (responseData.token) {
            let token = responseData.token

            localStorage.setItem("tokenUser", token);
           }
           navigate('/');
        } 
        else if (response.status === 401) {
            toast.error("Identifiant incorrect, veuillez réessayer")
        }
    }
    

    const handleLogin = async (e) => {
        e.preventDefault();

        userLogin.userName =  e.target[0].value
        userLogin.passWord =  e.target[1].value

        postLoginData();
    }


    return (
        
            <div className="main_authentification">
                
                <section className="main_connection">

                    <h1 className="title_connection">Connexion</h1>
                    <form className="form_authentification" onSubmit={handleLogin}>
                        
                            
                            <div className="under_div">
                                <label htmlFor="emailLogin">Email</label>
                                <input type="text" placeholder="Votre adresse email..." id="emailLogin" name="emailLogin" required></input>
                            </div>

                            <div className="under_div">
                                <label htmlFor="passLogin">Mot de passe</label>
                                <input type="password" placeholder="Votre mot de passe..." id="passLogin" name="passLogin" required></input>
                            </div>

                            <button className="button_authentification">Connexion</button>
                    </form>
                    
                </section>

                <div className="vertical_bar"></div>

                <section className="main_signing_up">

                <h1 className="title_connection">Inscription</h1>
                    
                    <form className="form_authentification" onSubmit={handleSignUp}>
                        
                            
                            <div className="under_div">
                                <label htmlFor="emailSuscribe">Email</label>
                                <input type="text" placeholder="Votre adresse email..." id="emailSuscribe" name="emailSuscribe" ></input>
                            </div>

                            <div className="under_div">
                                <label htmlFor="passSuscribe">Mot de passe</label>
                                <input type="password" placeholder="Votre mot de passe..." id="passSuscribe" name="passSuscribe" ></input>
                            </div>

                            <button className="button_authentification" value="submit" type="submit">Inscription</button>
                    </form>
                    

                </section>

            </div>
    )
}

export default Admin;