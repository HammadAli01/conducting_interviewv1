import React,{useState,useEffect} from 'react';
import './Mainnavbar.css';
import { Navbar,Nav,Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import raiimage from './raicruittransparent.png';
export default function Mainnavbar(props) {
const handlehomeclick=()=>{
    window.location.href = "http://localhost:3000/home";
}
const handlesignin=()=>{
    window.location.href = "http://localhost:3000/signin";
}
const handlesignup=()=>{
    window.location.href = "http://localhost:3000/signup";
}
    return (
        <div className='conducting-mainnavbar'>
      
        <Navbar id="mynav">
    <Container >
        
    <Navbar.Brand href="#home">
      {/* <img src={sitelogo} className='sitelogo'></img> */}
      <img src={raiimage} className='sitelogo'></img>
      < h6 className="cruittext">r<h5>AI</h5>cruit</h6>
      </Navbar.Brand>
        <Nav >
      {/* <Nav.Link to="#signup"  id='navlink1'>Home</Nav.Link> to="http://localhost:3000/home"
        <Nav.Link href="#features" id='navlink2'>Features</Nav.Link> 
        <Nav.Link href="#pricing" id='navlink3'>Instructions</Nav.Link>
        <Nav.Link href="#pricing" id='navlink4'>Contact us</Nav.Link>  */}
        
        <div onClick={()=>{handlehomeclick()}}  id='navlink1' className='navbar-nav navbar-light nav-link .navbar-expand mynav'>Home</div>
        <div onClick={()=>{handlesignin()}}  id='navlink2' className='navbar-nav navbar-light nav-link .navbar-expand mynav'>Signup</div>
        <div onClick={()=>{handlesignup()}}  id='navlink3' className='navbar-nav navbar-light nav-link .navbar-expand mynav'>Signin</div>
        </Nav>
    </Container>
    </Navbar>
    
    </div>
    )
}
