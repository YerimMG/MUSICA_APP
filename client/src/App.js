//este es el componente padre, aqui solo establesco rutas, y componentes 

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'


//COMPONENTES
import login from './views/login';
import Home  from './views/Home'


function App() {

    
  return (
<Router>
   <Switch>
      <Route exact path = "/Home"   component = {Home} />
      <Route exact path = ""  component = {login}/>
    </Switch>
</Router>

  );
}

export default App;
