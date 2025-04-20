import React from 'react';
import ReactDOM from 'react-dom/client';
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
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Admin from "./Components/Admin";

import "./main.scss";
import "./Components/style.scss";
import Footer from "./Components/Footer";
import MentionsLegales from './Components/MentionsLegales';
import ScrollToTop from "./Components/ScrollToTop";


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>

        <Router>
            <ScrollToTop />
            <Header />
            <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/SceneCard/:id' element={<SceneCard />} />
                <Route path='/*' element={<Error />} />
                <Route path='/edit/form/:id' element={<EditForm />} />
                <Route path='/newscene' element={<AddScene />} />
                <Route path='/authentification' element={<Admin />} />
                <Route path='/mentions_legales' element={<MentionsLegales />} />
            </Routes>

            <Footer />
        </Router>
        

        <ToastContainer
            hideProgressBar={true}
            closeOnClick
            rtl={false}
            autoClose={2000}
        />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
