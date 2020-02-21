import React from 'react';
import '../Navigation/nav.css';
import landing from '../../images/cover.jpg'

const Landing = () => (
  <div>
    <h1>Welcome to Doctor's Office</h1>
    <br></br>
    <br></br>
    <img src={landing} className='landingBg'alt='Landing'/>

  </div>
);

export default Landing;