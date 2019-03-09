import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';

import NavigationBar from './NavigationBar/NavigationBar';
import Footer from './Footer';
import GoogleOAuth from './GoogleOAuth/GoogleOAuth';
import Homepage from './Homepage/Homepage';
import ShopCreate from './ShopCreate/ShopCreate';
import CategoryShow from './CategoryShow/CategoryShow';

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
               </Switch>
               <Footer />
               <GoogleOAuth />
            </div>
         </Router>
      );
   }
}

export default App;
