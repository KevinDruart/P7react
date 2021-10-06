import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Index from './pages/Index/Index';
import Error404 from './pages/erreur404/Error404';
import Inscription from './pages/Inscription/Inscription';
import Login from './pages/login/Login';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';


function App() {
  return (
    <div className="App">
    
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" exact component={Index} />
          <Route path="/se-connecter" exact component={Login} />
          <Route path="/s-inscrire"  render={(props) => <Inscription {...props}/>} />
          <Route component={Error404} />
        </Switch>
      </BrowserRouter>
      <Footer />


    </div>
  );
}

export default App;
