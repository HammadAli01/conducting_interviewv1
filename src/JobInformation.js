import React,{useState} from 'react'
import Accordion from 'react-bootstrap/Accordion'
import './JobInformation.css';
export default function JobInformation(props) {
  const [interviewDetail,setInterviewDetail]=useState(props.interviewData);
  console.log("data got in jobinfomration is",interviewDetail);
  return (
    <div className='wrapper'>
      
      <Accordion >
      <Accordion.Item eventKey="0">
    <Accordion.Header > Job Title</Accordion.Header>
    <Accordion.Body>
     {interviewDetail.position} 
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="1">
    <Accordion.Header className='selfheader'>Description</Accordion.Header>
    <Accordion.Body>
    {interviewDetail.jobDescription}
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="3">
    <Accordion.Header >Duration </Accordion.Header>
    <Accordion.Body>
    The duration for the interview is {interviewDetail.duration}
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="4">
    <Accordion.Header >Timings </Accordion.Header>
    <Accordion.Body>
      The start date for the Interview is {interviewDetail.startDate}
      <br/> The end date for the Interview is {interviewDetail.endDate}   </Accordion.Body>
  </Accordion.Item>
</Accordion>

    </div>
  )
}
