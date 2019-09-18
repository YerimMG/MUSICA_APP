import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// import { withRouter } from "react-router";
// useRef




//COMPONENTES
import login from './components/login';
import Home from './components/Home'
let params = new URLSearchParams(window.location.search);
let access_token = params.get('access_token')
let refresh_token = params.get('refresh_token')



function App() {
  
  return (
    <Router>
      <h1>HOLA DESDE APP</h1>

    <Switch>

    <Route exact path = "/Home"   component = {Home} />
    <Route exact path = "/login"  component = {login}/>


    </Switch>

    </Router>
  );
}

export default App;
