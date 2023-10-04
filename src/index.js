import React from 'react';
import ReactDOM from 'react-dom/client';
import Footer from './Components/Footer';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import About from './Components/About';
import Scene from './Components/Scene';
import Form from './Components/Form';
import Header from './Components/Header';
import Contact from './Components/Contact';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
        <Router>
          <Header />
            <Routes>
              <Route exact path='/' Component={LandingPage}></Route>
              <Route exact path='/about' Component={About}></Route>
              <Route exact path='/scene' Component={Scene}></Route>
              <Route exact path='/form' Component={Form}></Route>
              <Route exact path='/contact' Component={Contact}></Route>
            </Routes>
           
        </Router>
        
    </React.StrictMode>
);

const footer = ReactDOM.createRoot(document.getElementById('footer_kasa'));
footer.render(
  <Footer />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
