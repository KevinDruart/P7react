import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, } from 'react-router-dom';
import Index from './pages/Index/Index';
import Error404 from './pages/erreur404/Error404';


import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './pages/home/Home';

import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';

import LoginContext from './contextes/LoginContext';
import PrivateRoute from './components/Route/privateRoute/PrivateRoute';


const App = () => {


  const haveToken = localStorage.getItem("authToken") !== null;
  const localUserId = localStorage.getItem("authId");

  const [isAuthentificated, setIsAuthentificated] = useState(haveToken);
  const [userId, setUserId] = useState(localUserId);

  const contextValue = {
    isAuthentificated,
    setIsAuthentificated,
    userId,
    setUserId
  }

  return (
    <div className="App">
      <LoginContext.Provider value={contextValue}>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/" exact component={Index} />
            <PrivateRoute path="/home" exact>
              {isAuthentificated ? <Home /> : <Login />}
            </PrivateRoute>

            <Route component={Error404} />
          </Switch>
        </BrowserRouter>
        <Footer />
      </LoginContext.Provider>
    </div>
  );
}


export default App;
