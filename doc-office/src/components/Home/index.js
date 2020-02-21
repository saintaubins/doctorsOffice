import React, { Component } from 'react';

import { withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';


class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      doctors: []
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.docOffices().on('value', snapshot => {
      const doctorsObject = snapshot.val();
      console.log('this.props.firebase.docOffice', doctorsObject)

      const doctorsList = Object.keys(doctorsObject).map(key => ({
        ...doctorsObject[key],
        uid: key,
      }));

      this.setState({
        doctors: doctorsList,
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    // this.props.firebase.users().off();
  }
  render() {
    const { doctors, loading } = this.state;

    return (
      <div>
        <h1>Doctor's List's</h1>

        {loading && <div>Loading ...</div>}

        <DoctorList doctors={doctors} />
       
      </div>
    )
  }
}

const DoctorList = ({ doctors }) => (
  
  <ul >
    {doctors.map(doctor => (
      
      <a style={{display:'block'}} key={doctor.uid}>
          <strong> Doctor's Name: </strong> {doctor.name}{<br></br>}
          <strong> Img: </strong> {doctor.pic} {<br></br>}
          <strong> ID: </strong> {doctor.uid}
      </a>
      
      
    ))}
  </ul>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);