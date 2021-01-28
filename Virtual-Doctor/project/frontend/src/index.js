import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import SignIn from './components/signIn';
import AdminPortal from './components/portal/adminPortal/adminPortal.js'
import DoctorPortal from './components/portal/doctorPortal/doctorPortal.js'
import PatientPortal from './components/portal/patientPortal/patientPortal.js'


import { createBrowserHistory } from "history";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import store from './redux/store.js';

const hist = createBrowserHistory();

ReactDOM.render(
    <Provider store = {store}>
      <Router history={hist}>
        <Switch>
          <Route path="/signIn" component={SignIn} />
          <Route path="/admin" component={AdminPortal} />
          <Route path="/doctor" component={DoctorPortal} />
          <Route path="/patient" component={PatientPortal} />
          <Redirect from="/" to="/signIn" />
        </Switch>
      </Router>
    </Provider>,
    document.getElementById("root")
  );


//ReactDOM.render(<SignIn />, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
