import React from "react";



const Admin = () => {


    return (
        
            <div className="main_authentification">
                
                <section className="main_connection">

                    <h1 className="title_connection">Connexion</h1>
                    <form className="form_authentification">
                        
                            
                            <div className="under_div">
                                <label>Email</label>
                                <input type="text" placeholder="Votre adresse email..."></input>
                            </div>

                            <div className="under_div">
                                <label>Mot de passe</label>
                                <input type="text" placeholder="Votre mot de passe..."></input>
                            </div>

                        
                    </form>
                    <button className="button_authentification">Connexion</button>
                </section>

                <div className="vertical_bar"></div>

                <section className="main_signing_up">

                <h1 className="title_connection">Inscription</h1>
                    
                    <form className="form_authentification">
                        
                            
                            <div className="under_div">
                                <label>Email</label>
                                <input type="text" placeholder="Votre adresse email..."></input>
                            </div>

                            <div className="under_div">
                                <label>Mot de passe</label>
                                <input type="text" placeholder="Votre mot de passe..."></input>
                            </div>

                        
                    </form>
                    <button className="button_authentification">Inscription</button>

                </section>

            </div>
    )
}

export default Admin;