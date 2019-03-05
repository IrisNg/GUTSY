import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';

import './App.css';

class App extends React.Component {
   render() {
      return (
         <Router history={history}>
            <div>
               <Switch>
                  <Route path="/" exact />
               </Switch>
            </div>
         </Router>
      );
   }
}

export default App;
