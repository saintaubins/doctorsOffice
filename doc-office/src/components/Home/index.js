import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { withAuthorization } from '../Session';
import firebase from 'firebase';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      doctors: [],
      docName: '',
      docAdd: '',
      docNum: '',
      docPic: '',
      docId:'',
      falsy: null,
      docState:''
    };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangePic = this.handleChangePic.bind(this);
    this.handleChangeSiteAdd = this.handleChangeSiteAdd.bind(this);
    this.handleChangePhoneNumber = this.handleChangePhoneNumber.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
  }

  handleCreate(event){
    event.preventDefault();
    let doctorListRef = firebase.database().ref('docOffice');
      let newDoctorRef = doctorListRef.push();
      newDoctorRef.set({
        'doc':{
          "name":"Allen Brown MD",
          "pic":"https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fi.huffpost.com%2Fgen%2F997993%2Fimages%2Fo-DOCTOR-WHITE-COAT-facebook.jpg&f=1&nofb=1",
          "siteAdd":'114-09 Harlem River Dr. New York, NY 11219',
          'phone':'1-800-666-1234'
        },
          'patient': {
            "name":"Jona Smith",
            "BloodP":"120/60",
            'image':'url.com',
            "rVisit":"foot cut"
        
        }
      })
      .then(() => console.log('Data Written Successfully'))
      .catch((error) => console.log('Firebase Error ', error))
  }

  handleRead = (event) => {
    firebase.database().ref('docOffice').on('value', (data) => {
      console.log(' data from handleRead ', data.toJSON())
    })
  }

  handleUpdate = (event) => {
    event.preventDefault();
    firebase.database().ref('docOffice/'+ this.state.docId).update({
      'doc':{
        "name":this.state.docName,
        "pic":this.state.docPic,
        "siteAdd":this.state.docAdd,
        'phone':this.state.docNum
      }
    })
      .then(() => console.log('Data Written Successfully'))
      .catch((error) => console.log('Firebase Error ', error))
  }

  handleDelete = (event) => {
    event.preventDefault();
    firebase.database().ref('docOffice/'+ this.state.docId).remove();
  }

  handleDocSate = (event) => {
    event.preventDefault();
    console.log('docState active')
  }
  
  handleId = (event) => {
    this.setState({docId: event.target.value});
    console.log('handleId ='+`${this.state.docId}`)
  }
  handleChangeName(event) {
    this.setState({docName: event.target.value});
    console.log('docName ='+`${this.state.docName}`)
    
  }
  handleChangePic(event) {
    this.setState({docPic: event.target.value});
    console.log('docPic ='+`${this.state.docPic}`)
    
  }
  handleChangeSiteAdd(event) {
    this.setState({docAdd: event.target.value});
    console.log('docAdd ='+this.state.docAdd)
   
  }
  handleChangePhoneNumber(event) {
    this.setState({docNum: event.target.value});
    console.log('docNum ='+this.state.docNum)
    
  }

  componentDidMount() {
    this.setState({ loading: true });
    //fetching data
    this.props.firebase.docOffices().on('value', snapshot => {
      const doctorsObject = snapshot.val();
      console.log('this.props.firebase.docOffice index.js in Home', doctorsObject)
      const doctorsList = Object.keys(doctorsObject).map(key => ({
        ...doctorsObject[key],
        uid: key,
      })); 
      this.setState({
        doctors: doctorsList,
        loading: false,
      }); console.log('this.state.doctors from Home directory = ', this.state.doctors)
    }); 
  }
   
  componentWillUnmount() {
    this.props.firebase.docOffices().off();
  }
  render() {
    const { doctors, loading } = this.state;

    return (
      <div>
          <div style={{ textAlign: 'center'}}>
            <h1> List Of Doctor's </h1>
            {loading && <div>Loading ...</div>}
            <form>
              <input 
                style={{margin: '1%', borderRadius:'5px'}}
                type='text'
                placeholder = 'Name'
                name='docname'
                value={this.state.docName}
                onChange={this.handleChangeName}
              />
              <input
                style={{margin: '1%', borderRadius:'5px'}} 
                type='text'
                placeholder = 'Site Add'
                name='siteAdd'
                value={this.state.docAdd}
                onChange={this.handleChangeSiteAdd}
              />
              <input
                style={{margin: '1%', borderRadius:'5px'}} 
                type='text'
                placeholder = 'Photo url'
                name='docPic'
                value={this.state.docPic}
                onChange={this.handleChangePic}
              />
              <input
                style={{margin: '1%', borderRadius:'5px'}} 
                type='text'
                placeholder='Phone Number'
                name='phoneNumber'
                value={this.state.docNum}
                onChange={this.handleChangePhoneNumber}
              />
              <input
                style={{margin: '1%', borderRadius:'5px'}} 
                type='text'
                placeholder='Doctor Id'
                name='docId'
                value={this.state.docId}
                onChange={this.handleId}
              />
              <button onClick={this.handleCreate} style={{margin: '1%', borderRadius:'4px'}}>
                 Create
              </button>
              <button onClick={this.handleRead} style={{margin: '1%', borderRadius:'4px'}}>
                 Read
              </button>
              <button onClick={this.handleUpdate} style={{margin: '1%', borderRadius:'4px'}}>
                 Update
              </button>
              <button onClick={this.handleDelete} style={{margin: '1%', borderRadius:'4px'}}>
                 Delete
              </button>
            </form>
             
          </div>
        <DoctorList doctors={doctors} />
      </div>
    )
  }
}

const DoctorList = ({ doctors }) => (
  <div>
    <ol className='docList'>
      {doctors.map((doctor, index) => (
        <li style={{
          display:'block',
          margin: '5%', 
          width:'55%', 
          backgroundColor:'rgba(189, 182, 182, 0.5)', 
          boxShadow: '10px 10px 10px rgb(201, 201, 154)',
          borderRadius:'15px',
          padding:'3%',
          textAlign:'center'
        }} key={doctor.uid}>
            <Link to={'/Patient/'+ doctor.patient.name}>
              <strong> Doctor's Name: </strong> {doctor.doc.name}{<br></br>}
              {/* <strong>Doctor's Index: </strong> {doctor.index} */}
              <img src={doctor.doc.pic}
              style={{
                width:'60%',
                borderRadius:'10px',
                boxShadow: '5px 5px 5px rgb(201, 201, 154)',
                margin:'5%'    
              }}></img>{<br></br>}
              <strong> Site Add: </strong> {doctor.doc.siteAdd} {<br></br>}
              <strong> Phone: </strong> {doctor.doc.phone} {<br></br>}
              <strong> ID: </strong> {doctor.uid}
            </Link>
        </li>
      ))}
    </ol>
  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);