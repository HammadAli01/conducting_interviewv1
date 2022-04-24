import React from 'react'
import './Sidebar.css';
import userimg from './profile.jpg';
import { BsHouseFill } from "react-icons/bs";

export default function Sidebar(props) {
    
  return (
    <div className={props.sidebarclass}>
<div className='sidebar-header'>
  <img src={userimg}></img><div className='user-info'>
      <span className="user-name">Hammad Ali</span>
      <span className="user-role">Recruiter</span>
      </div>
   </div>
   
<div className='sidebaritems'>
  <ul>
    <li class="sidebar-item">
      <BsHouseFill className="page-icon"></BsHouseFill>
      <span>Home</span>
    </li>
    <li class="sidebar-item">
    <BsHouseFill className="page-icon"></BsHouseFill>
      <span>Make Interview</span>
    </li>
    <li class="sidebar-item">
    <BsHouseFill className="page-icon"></BsHouseFill>
      <span>Results</span>
    </li>
    <li class="sidebar-item">
    <BsHouseFill className="page-icon"></BsHouseFill>
      <span>Profile Settings</span>
    </li>
    <li class="sidebar-item">
      <BsHouseFill className="page-icon"></BsHouseFill>
      <span>Home</span>
    </li>
  </ul>
</div>
    </div>
  )
}
