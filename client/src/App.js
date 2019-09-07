import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// import { withRouter } from "react-router";
// useRef




//COMPONENTES
import Tester from './components/tester';
import SuccesFul from './components/SuccesRoute'


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
