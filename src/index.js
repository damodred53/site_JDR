import React from 'react';
import ReactDOM from 'react-dom/client';
import Footer from './Components/Footer';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import About from './Components/About';
import Header from './Components/Header';
import Contact from './Components/Contact';
import SceneCard from './Components/SceneCard';
import Error from './Components/Error';
import EditForm from "./Components/EditForm";
import AddScene from './Components/AddScene';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Admin from "./Components/Admin";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
        <Router>
          <Header />
          
            <Routes>
              <Route path='/' Component={LandingPage}></Route>
              <Route path='/about' Component={About}></Route>
              <Route path='/contact' Component={Contact}></Route>
              <Route path='/SceneCard/:id' Component={SceneCard}></Route>
              <Route path='/*' Component={Error}></Route>
              <Route path='/edit/form/:id' Component={EditForm}></Route>
              <Route path='/newscene' Component={AddScene}></Route>
              <Route path='/authentification' Component={Admin}></Route>
            </Routes>
        </Router>
        <ToastContainer 
        hideProgressBar={true}
        closeOnClick
        rtl={false}
        autoClose={2000}
        />
        
    </React.StrictMode>
);


/* Deuxième rendu permettant le maintient du footer en bas de la page */

const footer = ReactDOM.createRoot(document.getElementById('footer_kasa'));
footer.render(
  <Footer />
);




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
