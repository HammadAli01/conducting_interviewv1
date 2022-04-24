import React,{useRef,useState} from 'react'
import './Allinterviews.css'

import { Dropdown,DropdownButton,Button } from 'react-bootstrap';
//import { AiOutlineDelete } from "react-icons/ai";
//AiOutlineDelete  

export default function Allinterviews() {
    const [jobTitle,setJobtitle]=useState("Interview Order");
    const [jobType,setJobtype]=useState("Job Type");
    const [gOrder,setGOrder]=useState("Generation Order");
    const [interviews,setInterviews]=useState([{
        title:"AThis is the default title1",generationDate:"02/11/2017",startDate:"12/04/2021",endDate:"12/06/2021",location:"Islamabad",type:"Full Time",position:"Management",
        jobDescription:"Lorem ipsum dolor sit amet, isis consectetur adipiscing elit, sed do eiusmod tempor ..."   },{
        title:"BThis is the default title2",generationDate:"03/05/2022",startDate:"12/04/2021",endDate:"12/06/2021",location:"Islamabad",type:"Part Time",position:"Management",
        jobDescription:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor " 
    },{
        title:"Z",generationDate:"01/01/2011",startDate:"01/01/2011",endDate:"12/06/2021",location:"Islamabad",type:"Full Time",position:"Management",
        jobDescription:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor " 
    },{
        title:"AThis is the default title1",generationDate:"02/11/2017",startDate:"12/04/2021",endDate:"12/06/2021",location:"Islamabad",type:"Full Time",position:"Management",
        jobDescription:"Lorem ipsum dolor sit amet, isis consectetur adipiscing elit, sed do eiusmod tempor ..."   },{
        title:"BThis is the default title2",generationDate:"24/02/2022",startDate:"12/04/2021",endDate:"12/06/2021",location:"Islamabad",type:"Part Time",position:"Management",
        jobDescription:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor " 
    },{
        title:"CThis is the default title3",generationDate:"25/02/2022",startDate:"12/04/2021",endDate:"12/06/2021",location:"Islamabad",type:"Full Time",position:"Management",
        jobDescription:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor " 
    },{
        title:"AThis is the default title1",generationDate:"02/11/2017",startDate:"12/04/2021",endDate:"12/06/2021",location:"Islamabad",type:"Full Time",position:"Management",
        jobDescription:"Lorem ipsum dolor sit amet, isis consectetur adipiscing elit, sed do eiusmod tempor ..."   },{
        title:"BThis is the default title2",generationDate:"24/02/2022",startDate:"12/04/2021",endDate:"12/06/2021",location:"Islamabad",type:"Part Time",position:"Management",
        jobDescription:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor " 
    },{
        title:"This is the default title3",generationDate:"25/02/2022",startDate:"12/04/2021",endDate:"12/06/2021",location:"Islamabad",type:"Full Time",position:"Management",
        jobDescription:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor " 
    },{
        title:"This is the default title1",generationDate:"02/11/2017",startDate:"12/04/2021",endDate:"12/06/2021",location:"Islamabad",type:"Full Time",position:"Management",
        jobDescription:"Lorem ipsum dolor sit amet, isis consectetur adipiscing elit, sed do eiusmod tempor ..."   },{
        title:"This is the default title2",generationDate:"24/02/2022",startDate:"12/04/2021",endDate:"12/06/2021",location:"Islamabad",type:"Part Time",position:"Management",
        jobDescription:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor " 
    },{
        title:"This is the default title3",generationDate:"25/02/2022",startDate:"12/04/2021",endDate:"12/06/2021",location:"Islamabad",type:"Full Time",position:"Management",
        jobDescription:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor " 
    },{
        title:"ZThis is the default title1",generationDate:"02/11/2017",startDate:"12/04/2021",endDate:"12/06/2021",location:"Islamabad",type:"Full Time",position:"Management",
        jobDescription:"Lorem ipsum dolor sit amet, isis consectetur adipiscing elit, sed do eiusmod tempor ..."   },{
        title:"DDDThis is the default title2",generationDate:"24/02/2022",startDate:"12/04/2021",endDate:"12/06/2021",location:"Islamabad",type:"Part Time",position:"Management",
        jobDescription:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor " 
    },{
        title:"BBBThis is the default title3",generationDate:"25/02/2022",startDate:"12/04/2021",endDate:"12/06/2021",location:"Islamabad",type:"Full Time",position:"Management",
        jobDescription:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor " 
    },{
        title:"AAAThis is the default title1",generationDate:"02/11/2017",startDate:"12/04/2021",endDate:"12/06/2021",location:"Islamabad",type:"Full Time",position:"Management",
        jobDescription:"Lorem ipsum dolor sit amet, isis consectetur adipiscing elit, sed do eiusmod tempor ..."   },{
        title:"XThis is the default title2",generationDate:"24/02/2022",startDate:"12/04/2021",endDate:"12/06/2021",location:"Islamabad",type:"Part Time",position:"Management",
        jobDescription:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor " 
    },{
        title:"ZThis is the default title3",generationDate:"25/02/2022",startDate:"12/04/2021",endDate:"12/06/2021",location:"Islamabad",type:"Full Time",position:"Management",
        jobDescription:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor " 
    }]);
   
  const Sortinterviews=(e)=>{
      e.preventDefault();
      let tempInterviews=[...interviews];
      //title sorting
      if(jobTitle!=="Select Order")
      {
          if(jobTitle=="Ascending")
          {
            tempInterviews=tempInterviews.sort((a, b) => {
            if (a.title < b.title)
                return -1;
            if (a.title > b.title)
                return 1;
            return 0;
        });
      }
      else if(jobTitle=="Descending"){
        tempInterviews=tempInterviews.sort((a, b) => {
            if (a.title > b.title)
                return -1;
            if (a.title < b.title)
                return 1;
            return 0;
        });
      }}
//type sorting
if(jobType!=="Select Type")
{if(jobType=="Full Time"){
    
    tempInterviews=tempInterviews.sort((a, b) => {
        
        if(a.type=="Full Time"){
            if(b.type=="Part Time"){return -1}
        }
        if(a.type=="Part Time"){
            if(b.type=="Full Time"){return 1}
        }
        return 0;
    });
  }
  else if(jobType=="Part Time"){
    tempInterviews=tempInterviews.sort((a, b) => {
        if(a.type=="Full Time"){
            if(b.type=="Part Time"){return 1}
        }
        if(a.type=="Part Time"){
            if(b.type=="Full Time"){return -1}
        }
        return 0;
    });
  }}
  //generated date sorting
  if(gOrder!=="Order By")
  {
      if(gOrder=="New First")
      {
        tempInterviews=tempInterviews.sort((a, b) => {
        if (a.generationDate < b.generationDate)
            return 1;
        if (a.generationDate > b.generationDate)
            return -1;
        return 0;
    });
  }
  else if(gOrder=="Old First"){
    tempInterviews=tempInterviews.sort((a, b) => {
        if (a.generationDate > b.generationDate)
            return 1;
        if (a.generationDate < b.generationDate)
            return -1;
        return 0;
    });
  }}
      setInterviews(tempInterviews);
      console.log("temp are",tempInterviews);
      console.log(interviews);
  }
  return (
    <div className='parentcontainer'>
        <div className='sortcontainer'>
     
        </div>
        <div className='tablecontainer'>
            <div className='sort'>
            <h2 className='sorttitle'>Sorting</h2>
            <div className='Asorter'>
        
        <DropdownButton id="dropdown-basic-button" title={jobTitle} onSelect={(e)=>{setJobtitle(e)}}>
        <Dropdown.Item eventKey="Ascending">Ascending</Dropdown.Item>
        <Dropdown.Item eventKey="Descending">Descending</Dropdown.Item>
        </DropdownButton>
        </div> 
        <div className='Asorter'>
        
        <DropdownButton id="dropdown-basic-button" title={jobType} onSelect={(e)=>{setJobtype(e)}}>
        <Dropdown.Item eventKey="Full Time">Full Time</Dropdown.Item>
        <Dropdown.Item eventKey="Part Time">Part Time</Dropdown.Item>
        </DropdownButton>
        </div>
        
        <div className='Asorter'>
       
        <DropdownButton id="dropdown-basic-button" title={gOrder} onSelect={(e)=>{setGOrder(e)}}>
        <Dropdown.Item eventKey="New First">New First</Dropdown.Item>
        <Dropdown.Item eventKey="Old First">Old First</Dropdown.Item>
        </DropdownButton></div>
        
            <Button className='sortbutton' onClick={(e)=>Sortinterviews(e)}>sort</Button>
            </div>
            <h2 className='tabletitle'>Interviews</h2>
            <div className='table'>
            <table className='interviews'>
          <thead>
            <tr>
              <th>S/No</th>
              <th>Interview title</th>
              <th> Generated</th>
              <th>Start </th>
              <th>End</th>
              <th>Type</th>
              
            </tr>
          </thead>
         
          <tbody>
         
          {interviews.map((interview,index) => {
           const { title, generationDate, startDate, endDate,type } = interview ;
        //    count.current=count.current+1;
        //    console.log("ct",count.current);
           return (
              <tr key={index+1}>
                <td>{index+1}</td>
                 <td>{title.slice(0,25)+"..."}</td>
                 <td>{generationDate}</td>
                 <td>{startDate}</td>
                 <td>{endDate}</td> 
                 <td>{type}</td>
                 
              </tr>
           )
        })}
          </tbody>
        </table>
        </div>
        </div>
    </div>
  )
}
