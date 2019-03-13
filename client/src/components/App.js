import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';

import NavigationBar from './NavigationBar/NavigationBar';
import Footer from './Footer/Footer';
import Homepage from './Homepage/Homepage';
import ShopCreate from './ShopCreate/ShopCreate';
import CategoryShow from './Show/CategoryShow';
import SearchShow from './Show/SearchShow';

import './App.css';

class App extends React.Component {
   render() {
      return (
         <Router history={history}>
            <div>
               <NavigationBar />
               <Switch>
                  <Route path="/" exact component={Homepage} />
                  <Route path="/create-shop" exact component={ShopCreate} />
                  <Route path="/category/:category" exact component={CategoryShow} />
                  <Route path="/search" exact component={SearchShow} />
               </Switch>
               <Footer />
            </div>
         </Router>
      );
   }
}

export default App;
