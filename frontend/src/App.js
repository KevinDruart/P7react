import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Index from './pages/Index';
import Error404 from './pages/Error404';
import Inscription from './pages/Inscription';
import Login from './pages/Login';
import Footer from './components/Footer/Footer';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Index} />
          <Route path="/se-connecter" exact component={Login} />
          <Route path="/s-inscrire" exact component={Inscription} />
          <Route component={Error404} />
        </Switch>
      </BrowserRouter>
      <Footer />


    </div>
  );
}

export default App;
