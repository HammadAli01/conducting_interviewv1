import React,{useState,useEffect} from 'react';
import './Mainnavbar.css';
import { Navbar,Nav,Container } from 'react-bootstrap';
import { BsList } from "react-icons/bs";
import Sidebar from './Sidebar';
import userImg from './profile.jpg';
export default function Mainnavbar(props) {
const [sidebar,showSidebar]=useState(false);
const changesidebarstatus=()=>{
    showSidebar(!sidebar);
   
}

    return (
        <div>
            <Navbar >
            <Container >
                <BsList className='sidebarIcon' viewBox='0 0 20 13' onClick={changesidebarstatus}></BsList>
                <Navbar.Brand href="#home">rAIcruiter</Navbar.Brand>
                <Nav >
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#features">Features</Nav.Link>
                <Nav.Link href="#pricing">Instructions</Nav.Link>
                <Nav.Link href="#pricing">Contact us</Nav.Link>
                <img src={userImg} className='userImg'></img>
                </Nav>
               
            </Container>
            
            </Navbar>
            {sidebar==true ? <Sidebar sidebarclass='showsidebar'/>:<Sidebar sidebarclass='hidesidebar'/> }
        </div>
    )
}
