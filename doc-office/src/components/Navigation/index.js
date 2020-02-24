import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './nav.css';

import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';

import { AuthUserContext } from '../Session';

class Navigation extends Component {
  render() {
    return (
      <div style={{  
        width:'100%', 
        backgroundColor:'rgb(201, 201, 154)', 
        borderRadius: '6px'
        }}>
        <AuthUserContext.Consumer>
          {authUser =>
            authUser ? <NavigationAuth /> : <NavigationNonAuth />
          }
        </AuthUserContext.Consumer>
      </div>
    )
  }
};

class NavigationAuth extends Component {
  render() {
    return (
            <ul>
              <li>
                <Link to={ROUTES.LANDING}>Welcome</Link>
              </li>
              <li>
                <Link to={ROUTES.HOME}>List Of Doctor's</Link>
              </li>
              <li>
                <Link to={ROUTES.ACCOUNT}>Login Settings</Link>
              </li>
              <li>
                <Link to={ROUTES.ADMIN}>Admin Your Account</Link>
              </li>
              <li>
                <SignOutButton />
              </li>
            </ul>
    )
  }
};

class NavigationNonAuth extends Component {
  render() {
    return(
      <ul>
        <li>
          <Link to={ROUTES.LANDING}>Landing</Link>
        </li>
        <li>
          <Link to={ROUTES.SIGN_IN}>Sign In</Link>
        </li>
      </ul>
    )
  }
};

export default Navigation;