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
import Patient from '../Patient';

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
  handleSubmit(event, docName, docAdd, docNum) {
    event.preventDefault();
    firebase.database().ref('docOffice').on('value', (data) => {
      console.log(' data from handle submit ', data.toJSON())
      .then((data) => {
        this.setState({
          isLoaded: true,
          items: data
        })
      })
    })
  }

  componentWillMount(event) {
    //query data users
      firebase.database().ref('docOffice').on('value', (data) => {
        console.log(' data from componentWillMount in App.js', data.toJSON())
      })

    //.set data function
      // let doctorListRef = firebase.database().ref('docOffice');
      // let newDoctorRef = doctorListRef.push();
      // newDoctorRef.set({
      //   'doc':{
      //     "name":"Allen Brown MD",
      //     "pic":"https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fi.huffpost.com%2Fgen%2F997993%2Fimages%2Fo-DOCTOR-WHITE-COAT-facebook.jpg&f=1&nofb=1",
      //     "siteAdd":'114-09 Harlem River Dr. New York, NY 11219',
      //     'phone':'1-800-666-1234'
      //   },
      //     'patient': {
      //       "name":"Jona Smith",
      //       "BloodP":"120/60",
      //       'image':'url.com',
      //       "rVisit":"foot cut"
        
      //   }
      // })
  
  // let path = newDoctorRef.toString();
  // console.log('path to message = ', path)
  //path will be something like
  //'https://sample-app.firebaseio.com/message_list/-IKo28nwJLH0Nc5XeFmj'



  // function writeUserData(userId, name, email, imageUrl) {
  //   firebase.database().ref('doctors/' + userId).set({
  //     username: name,
  //     email: email,
  //     profile_picture : imageUrl
  //   });
  // }
  // writeUserData(20,'test','sombody@somewhere.com','http://something_somewhere.com')
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
          <Route exact path={ROUTES.HOME} component={HomePage} handleSubmit={this.handleSubmit} items={this.state.items}/>
          <Route exact path={ROUTES.ACCOUNT} component={AccountPage} />
          <Route exact path={ROUTES.ADMIN} component={AdminPage} />
          <Route 
              exact path='/Patient/:myLink'
              render={props => (
                <Patient handleChangeName={this.handleChangeName} 
                handleChangeSiteAdd={this.handleChangeSiteAdd}
                handleChangePhoneNumber={this.handleChangePhoneNumber} 
                {...props}
                props={this.state.props}
                docName={this.state.docName}
                docAdd={this.state.docAdd}
                docNum={this.state.docNum} 
                items={this.state.items}/>)} />
        </div>
      </Router>
    )
  }
}

export default withAuthentication(App);