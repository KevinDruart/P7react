import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, } from 'react-router-dom'
import Index from './pages/Index/Index';
import Error404 from './pages/erreur404/Error404';


import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './pages/home/Home';

import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';


function App() {

  const userOnline = JSON.parse(localStorage.getItem("user"));

  const [user, setUser] = useState([]);
console.log(user);

  useEffect(() => {
      setUser(userOnline);
  }, [])
  
  

  if (user === null || user === undefined) {
    return (
      <>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route path="/" exact component={Index} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/login" exact component={Login} />
            <Route component={Error404} />
          </Switch>

        </BrowserRouter>
      </>
    );
  } else {

    return (
      <div className="App">

        <BrowserRouter>
          <Header />
          <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/" exact component={Index} />
            <Route path="/home" exact component={Home} />
            <Route component={Error404} />
          </Switch>

        </BrowserRouter>
        <Footer />


      </div>
    );
  }
}

export default App;
