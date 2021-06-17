import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './scenes/Login/views/'
import Cadastro from './scenes/Usuarios/views';
import Home from './scenes/Home/views'
import Noticias from './scenes/Noticias/views';

function App() {
  return (
    <Router>      
      <Switch>
        <Route path="/register">
          <Cadastro/>
        </Route>

        <Route path="/home">
          <Home/>
        </Route>

        <Route path="/noticias">
          <Noticias/>
        </Route>

        <Route path="/">
          <Login/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
