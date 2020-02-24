import React, { Component } from 'react';
import { withAuthorization } from '../Session';

class Patient extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            patients: [],
            patName:'',
            bloodP:'',
            patPic:'',
            rVisit:''
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
        console.log('this.state.doctors from Home directory = ', this.state.patients)
    }); 

    }
    componentWillUnmount() {
        this.props.firebase.docOffices().off();
    }
    render() {

        const link = this.props.match.params.myLink;
        console.log('this.props from patients = ',this.props)
        console.log('this.state.patients = ',this.state.patients)
        let item = this.state.patients.find(item => link === item.patient.name)
        console.log('item.patient.name = ', item)
        // if (!item) {
        //     return <div>Loading...</div>;
        // } else {
            console.log('link = ', link)
        return (
            <div style={{textAlign:'center'}}>
                <h1>Patient Page</h1>
                <div>
                    <form>
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
                            placeholder = 'Reason Visit'
                            name='rVisit'
                            value={this.state.rVisit}
                            onChange={this.handleChangeReasonVisit}
                        />
                        <input 
                            style={{margin:'1%', borderRadius:'3px', border:'1px solid black'}}
                            value='Create'
                            type='submit'
                        />
                        <input 
                            style={{margin:'1%', borderRadius:'3px', border:'1px solid black'}}
                            value='Read'
                            type='submit'
                        />
                        <input 
                            style={{margin:'1%', borderRadius:'3px', border:'1px solid black'}}
                            value='Update'
                            type='submit'
                        />
                        <input 
                            style={{margin:'1%', borderRadius:'3px', border:'1px solid black'}}
                            value='Delete'
                            type='submit'
                        />
                    </form>
                </div>
                <div style={{
                    display:'block',
                    margin: '2%', 
                    width:'25%', 
                    backgroundColor:'rgba(189, 182, 182, 0.5)', 
                    boxShadow: '10px 10px 10px rgb(201, 201, 154)',
                    borderRadius:'15px',
                    padding:'1.5%',
                    textAlign:'center'
                }}>
                    <h2>{link}</h2>
                </div>
            </div>
        )
    }
}
const condition = authUser => !!authUser;
export default withAuthorization(condition)(Patient);
