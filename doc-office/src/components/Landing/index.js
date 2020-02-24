import React from 'react';
import '../Navigation/nav.css';
import landing from '../../images/cover1.jpg'

const Landing = () => (
  <div style={{ textAlign: 'center'}}>
    <h1>Welcome to Doctor's Office</h1>
    <br></br>
    <br></br>
    <img src={landing} className='landingBg'alt='Landing'/>

  </div>
);

export default Landing;