import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';

import NavigationBar from './NavigationBar/NavigationBar';
import Footer from './Footer/Footer';
import Homepage from './Homepage/Homepage';
import ShopCreate from './ShopForm/ShopCreate';
import ShopEdit from './ShopForm/ShopEdit';
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
                  <Route path="/category/:category" exact component={CategoryShow} />
                  <Route path="/search" exact component={SearchShow} />
                  <Route path="/shop/create" exact component={ShopCreate} />
                  <Route path="/shop/:id/edit" exact component={ShopEdit} />
               </Switch>
               <Footer />
            </div>
         </Router>
      );
   }
}

export default App;
