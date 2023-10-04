import './App.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import About from './Components/About';
import Scene from './Components/Scene';
import Form from './Components/Form';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Contact from './Components/Contact';


function App() {
  return (

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

}


export default App; 

const Footer2 = () => {

  return (
  <Footer />
  )
}
export  {Footer2};
