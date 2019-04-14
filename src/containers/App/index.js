import React, { Component } from 'react';
import css from './App.module.scss';
import {Route, Switch} from 'react-router-dom';
import SplashPage from '../../pages/SplashPage/';
import Missing from '../../pages/Missing';
import Recipe from '../../pages/Recipe';
class App extends Component {
  render() {
    return (
      <div className={css.Container}>
        <Switch>
          <Route exact path="/" component={SplashPage}/>
          <Route path="/recipe/:id" component={Recipe}/>
          <Route path="/" component={Missing} />
        </Switch>
      </div>
    );
  }
}

export default App;
