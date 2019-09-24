import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'


//COMPONENTES
import login from './components/login';
import Home  from './components/Home'


function App() {

    
  return (
<Router>
   <Switch>
      <Route exact path = "/Home"   component = {Home} />
      <Route exact path = "/login"  component = {login}/>
    </Switch>

</Router>

  );
}

export default App;
