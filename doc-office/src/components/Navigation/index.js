import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './nav.css';
import HomePage from '../Home';
import AdminPage from '../Admin'; 
import Landing from '../Landing';
import AccountPage from '../Account';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';

import { AuthUserContext } from '../Session';

class Navigation extends Component {
  render() {
    return (
      <div style={{ backgroundColor: 'rgb(201, 201, 154)', borderRadius: '6px'}}>
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
      <div>
        {/* <Router> */}
          <div>
            <ul>
              <li>
                <Link to={ROUTES.LANDING}>Landing</Link>
              </li>
              <li>
                <Link to={ROUTES.HOME}>Sart</Link>
              </li>
              <li>
                <Link to={ROUTES.ACCOUNT}>User Account</Link>
              </li>
              <li>
                <Link to={ROUTES.ADMIN}>Admin Your Account</Link>
              </li>
              <li>
                <SignOutButton />
              </li>
            </ul>
          </div>
          <main>
            {/* <Route exact path={ROUTES.LANDING} component={Landing} />
             <Route exact path={ROUTES.HOME} render={props => (
              <HomePage 
                {...props} handleSubmit= {this.props.handleSubmit} items={this.props.items}
              /> )} />
            <Route exact path={ROUTES.ACCOUNT} componemt={AccountPage}/> 
            <Route exact path={ROUTES.ADMIN} component={AdminPage}/>  */}
          </main>
        {/* </Router> */}
      </div>
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