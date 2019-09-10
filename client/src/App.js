import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// import { withRouter } from "react-router";
// useRef




//COMPONENTES
import Tester from './components/tester';
import SuccesFul from './components/SuccesRoute'
let params = new URLSearchParams(window.location.search);
let access_token = params.get('access_token')
let refresh_token = params.get('refresh_token')



function App() {
  
  return (
    <Router>
      <h1>HOLA DESDE APP</h1>

    <Switch>

    <Route exact path = "/secces" component = {SuccesFul} />
    <Route exact path = "/tester"  component = {Tester}/>


    </Switch>

    </Router>
  );
}

export default App;
