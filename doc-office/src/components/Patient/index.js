import React, { Component } from 'react';
import { withAuthorization } from '../Session';
import firebase from 'firebase';

class Patient extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            patients: [],
            patName:'',
            bloodP:'',
            patPic:'',
            rVisit:'',
            item: [],
            docId: '',
            patNum:'',
            index: 0,
            groupId: 0
        };
        this.handleChangePatName = this.handleChangePatName.bind(this);
        this.handleChangeBloodP = this.handleChangeBloodP.bind(this);
        this.handleChangePatPic = this.handleChangePatPic.bind(this);
        this.handleChangeReasonVisit = this.handleChangeReasonVisit.bind(this);

    }  
    //didn't have to bind this way
    submitHandler = (event) => {
        event.preventDefault();
        let falsy = this.state.falsy;
        if (falsy) {
          alert('this field cant be blank');
        } 
        console.log('falsy = ', falsy)
      }
    handleRead = () => {
    firebase.database().ref('docOffice').on('value', (data) => {
        console.log(' data from handleRead ', data.toJSON())
    })
    }
    handleUpdate = (event) => {
        event.preventDefault();
        firebase.database().ref('docOffice/'+ this.state.docId).update({
          'patient':{
            "name":this.state.patName,
            "image":this.state.patPic,
            "BloodP":this.state.bloodP,
            'phone':this.state.patNum,
            'rVisit':this.state.rVisit
          }
        })
        .then(() => console.log('Data Written Successfully'))
        .catch((error) => console.log('Firebase Error ', error))
    }
    handleCreate = (event) => {
        event.preventDefault();
        let patListRef = firebase.database().ref('docOffice/'+this.state.docId+'/');
        let newPatRef = patListRef.push();
          newPatRef.set({
              'patient': {
                "name":this.state.patName,
                "BloodP":this.state.bloodP,
                'image':this.state.patPic,
                'phone':this.state.patNum,
                "rVisit":this.state.rVisit
            }
          })
            .then(() => console.log('Data Written Successfully'))
            .catch((error) => console.log('Firebase Error ', error))
    }
    // handleDelete = (event) => {
    //     event.preventDefault();
    //     firebase.database().ref('docOffice/'+ this.state.docId).remove();
    // }
    handledocId = (event) => {
    this.setState({docId: event.target.value});
    console.log('docId ='+`${this.state.docId}`)
    }
    handlegroupId = (event) => {
        this.setState({groupId: event.target.value});
        console.log('groupId ='+`${this.state.groupId}`)
        }
    handlePatNum = (event) => {
        this.setState({patNum: event.target.value});
        console.log('patNum ='+`${this.state.patNum}`)
    }    
    handleChangePatName(e){
        this.setState({patName: e.target.value});
        console.log('patName ='+`${this.state.patName}`)
    }
    handleChangeBloodP(e){
        this.setState({bloodP: e.target.value});
        console.log('bloodP ='+`${this.state.bloodP}`)
    }
    handleChangePatPic(e){
        this.setState({patPic: e.target.value});
        console.log('patPic ='+`${this.state.patPic}`)
    }
    handleChangeReasonVisit(e){
        this.setState({rVisit: e.target.value});
        console.log('rVisit ='+`${this.state.rVisit}`)
    }
    componentDidMount() {
        this.setState({ loading: true });
        //fetching data
        this.props.firebase.docOffices().on('value', snapshot => {
        const patsObject = snapshot.val();
        console.log('this.props.firebase.docOffice index.js in Patients', patsObject)
        const patsList = Object.keys(patsObject).map(key => ({
        ...patsObject[key],
        uid: key,
        })); 
        this.setState({
        patients: patsList,
        loading: false,
        }); 
        console.log('this.state.patients from Patients directory = ', this.state.patients)
    }); 

    }
    componentWillUnmount() {
        //this.props.firebase.docOffices().off();
    }
    render() {
        const link = this.props.match.params.myLink;
        // console.log('this.props from patients = ',this.props)
        // console.log('this.state.patients = ',this.state.patients)
        let patItem = this.state.patients.find(item => link === item.patient.name)
        // this.setState({
        //     items: this.state.item
        // })
        
        // console.log('patItem = ', patItem)
        // console.log('this.state.patients[0] = ',this.state.patients[0])
        console.log('this.props.match.params.myLink =',this.props.match.params.myLink)
        let pMap = this.state.patients.map( item => Object.values(item))
        console.log('pMap = ', pMap)
        let patientFilter = [];
        //for(let i=0; i <=pMap.length; i++){
            //console.log('i =', i)
            if(pMap[this.state.groupId]) {
                let myFilter = pMap[this.state.groupId].filter((item, index) => item.hasOwnProperty('patient'))
                console.log('myFilter = ', myFilter)
                patientFilter = myFilter.map(item => item.patient)
                console.log('patientFilter',patientFilter)
            //} 
        }

        
        // if (!item) {
        //     return <div>Loading...</div>;
        // } else {
            console.log('link = ', link)
        return (
            <div style={{textAlign:'center'}}>
                <h1>This Doctor's Patient's</h1>
                <div>
                    <form>
                        <input 
                            style={{margin: '1%', borderRadius:'5px'}}
                            type='text'
                            placeholder = 'Doc Id'
                            name='docId'
                            value={this.state.docId}
                            onChange={this.handledocId}
                        />
                        <input 
                            style={{margin: '1%', borderRadius:'5px'}}
                            type='text'
                            placeholder = 'Group Id'
                            name='groupId'
                            value={this.state.groupId}
                            onChange={this.handlegroupId}
                        />
                        <input 
                            style={{margin: '1%', borderRadius:'5px'}}
                            type='text'
                            placeholder = 'Name'
                            name='patname'
                            value={this.state.patName}
                            onChange={this.handleChangePatName}
                        />
                        <input 
                            style={{margin: '1%', borderRadius:'5px'}}
                            type='text'
                            placeholder = 'BloodPressure'
                            name='bloodP'
                            value={this.state.bloodP}
                            onChange={this.handleChangeBloodP}
                        />
                        <input
                            style={{margin: '1%', borderRadius:'5px'}} 
                            type='text'
                            placeholder = 'Photo url'
                            name='patPic'
                            value={this.state.patPic}
                            onChange={this.handleChangePatPic}
                        />
                        <input
                            style={{margin: '1%', borderRadius:'5px'}} 
                            type='text'
                            placeholder = 'Phone Number'
                            name='patNum'
                            value={this.state.patNum}
                            onChange={this.handlePatNum}
                        />
                        <input
                            style={{margin: '1%', borderRadius:'5px'}} 
                            type='text'
                            placeholder = 'Reason Visit'
                            name='rVisit'
                            value={this.state.rVisit}
                            onChange={this.handleChangeReasonVisit}
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
                <div className='docList'>
                {patientFilter.map(patients => (
                    <div style={{
                        display:'block',
                        margin: '5%', 
                        width:'55%', 
                        backgroundColor:'rgba(189, 182, 182, 0.5)', 
                        boxShadow: '10px 10px 10px rgb(201, 201, 154)',
                        borderRadius:'15px',
                        padding:'3%',
                        textAlign:'center'
                    }} key={patients.uid}>
                        
                        <h2>{patients.name}</h2>
                        <img src={patients.image}
                            style={{
                                width:'60%',
                                borderRadius:'10px',
                                boxShadow: '5px 5px 5px rgb(201, 201, 154)',
                                margin:'5%'    
                              }}></img>{<br></br>}
                        <strong>BloodPressure: </strong>{patients.BloodP}{<br></br>}
                        <strong>Phone number: </strong>{patients.phone}{<br></br>}
                        <strong>Reason to Visit: </strong>{patients.rVisit}
                    </div>
                ))}
                
                </div>
            </div>
        )
    }
}
const condition = authUser => !!authUser;

export default withAuthorization(condition)(Patient);
