import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// import { withRouter } from "react-router";
// useRef

//COMPONENTES
import login from './components/login';
import Home  from './components/Home'
let params = new URLSearchParams(window.location.search);
let user  = params.get('user')
console.log(user)


function App() {
  
  return (
    <Router>
      <h1>Hola {user}!!</h1>

    <Switch>

    <Route exact path = "/Home"   component = {Home} />
    <Route exact path = "/login"  component = {login}/>


    </Switch>

    </Router>
  );
}

export default App;
