import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

//styles
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

//import * as serviceWorker from './serviceWorker';

//pages
import App from './views/App.js';
import Employes from './views/Employes.js';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/index" render={(props) => <App {...props} />} />
      <Route path="/show-employes" render={(props) => <Employes {...props} />} />
      
    </Switch>
    {/*<Redirect to="/index" />*/}
  </BrowserRouter>,
  document.getElementById("root")
);
