import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';

import NavigationBar from './NavigationBar/NavigationBar';
import Footer from './Footer';
import Homepage from './Homepage/Homepage';
import ShopCreate from './ShopCreate';

import './App.css';

class App extends React.Component {
   render() {
      return (
         <Router history={history}>
            <div>
               <NavigationBar />
               <Switch>
                  <Route path="/" exact component={Homepage} />
                  <Route path="/create-shop" component={ShopCreate} />
               </Switch>
               <Footer />
            </div>
         </Router>
      );
   }
}

export default App;
