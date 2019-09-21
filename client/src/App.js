import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// import { withRouter } from "react-router";
// useRef

//COMPONENTES
import login from './components/login';
import Home  from './components/Home'

//CONTEXT
import UserContext from './context/getUserSpoty'
import UserTracksContext from "./context/getUserTracks"
import UserArtists from './context/getArtist'

//GUARDAR EN LOCALSTORAGE
let params = new URLSearchParams(window.location.search);
let user  = params.get('user')
console.log(user)


function App() {
  
  return (
    <UserContext>
      <UserTracksContext>
        <UserArtists>

          <Router>
              <h1>Hola {user}!!</h1>




            <Switch>
              <Route exact path = "/Home"   component = {Home} />
              <Route exact path = "/login"  component = {login}/>
            </Switch>

          </Router>
        </UserArtists>
      </UserTracksContext>
    </UserContext>
  );
}

export default App;
