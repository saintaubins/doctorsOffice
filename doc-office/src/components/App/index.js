import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import firebase from 'firebase';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false
    };
    this.handleSubmit=this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    firebase.database().ref('users').on('value', (data) => {
      console.log(' data from handle submit ', data.toJSON())
      .then((data) => {
        this.setState({
          isLoaded: true,
          items: data
        })
      })
    })
  }

  componentWillMount() {
    
    //query data users
    firebase.database().ref('doctors').on('value', (data) => {
      console.log(' data from componentWillMount ', data.toJSON());
    })

    //.set data function

    // setTimeout(() => {
    //   console.log('Firebase loaded',firebase)
    //   firebase.database().ref('doctors/002').set(
    //     {
    //       name: 'OZ 2',
    //       age: 45
    //     }
    //   ).then(() => {
    //     console.log('INSERTED !');
    //   }).catch((error) => {
    //     console.log(error);
    //   });
    // }, 5000);

    //.update data function

    // firebase.database().ref('doctors/002').update({
    //   name: 'Doctor Oz'
    // });

    //.remove data function

    // firebase.database().ref('users/003/name').remove();

    
  }

  render() {
    return (
      <Router>
        <div>
          <Navigation />

          <hr />

          <Route exact path={ROUTES.LANDING} component={LandingPage} />
          <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route
            exact
            path={ROUTES.PASSWORD_FORGET}
            component={PasswordForgetPage}
          />
          <Route exact path={ROUTES.HOME} component={HomePage} />
          <Route exact path={ROUTES.ACCOUNT} component={AccountPage} />
          <Route exact path={ROUTES.ADMIN} component={AdminPage} />
        </div>
      </Router>
    )
  }
}

export default withAuthentication(App);