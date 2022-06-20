import React,{useState,useRef} from 'react'
import Accordion from 'react-bootstrap/Accordion'
import './JobInformation.css';
import axios from 'axios';
import Countdown from 'react-countdown';
export default function JobInformation(props) {
  const [interviewDetail,setInterviewDetail]=useState(props.interviewData);
  const is_completed=useRef(false);
  //console.log("data got in jobinfomration is",interviewDetail);
  const Completionist = () => <span className='finish-timer'>Interview Time has been finished</span>;

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a complete state
      props.setTimeFinished(true);
      is_completed.current=true;
      sendResponses();
      return<span className='finish-timer'>Interview Time has been finished</span>
    } else {
      // Render a countdown
      return (<>
        {(is_completed.current==false)?(<span className='interview-counter'>
        {hours}:{minutes}:{seconds}
      </span>):(<span className='finish-timer'>Interview Time has been finished</span>)}
      </>
      );
    }
  };
  const sendResponses=async()=>{
    console.log("DATA SENDING BY JOB INFORMATION CALLED");
    //  console.log("get local is",JSON.parse(window.localStorage.getItem("interviewid")),window.localStorage.getItem("useremail"))
    //  const interviewId=window.localStorage.getItem("interviewid");
    //  const userId=window.localStorage.getItem("useremail"),user_name=window.localStorage.getItem("candidatename");
    const is_Stored=JSON.parse(window.localStorage.getItem("store_Interview"));
    if(is_Stored==0){
      
      window.localStorage.setItem("store_Interview",JSON.stringify(1));
    const result={
      interview_id:props.interviewId,
      condidate_email:props.userEmail,
      name:props.candidateName,
      response_list:JSON.parse(window.localStorage.getItem("candidate_responses"))
    }
    console.log("Data send to api",result);
       const response = await axios.post(`${process.env.REACT_APP_API_KEY}/store/interview/result`,result
    ).catch((err) => 
       {
         console.log("Error: ", err);
       });
       if (response)  {
          console.log("reponse by post question is",response);
     }
    console.log("data to SEND by jobinfomration is ",result);}
    else{
      console.log("DATA ALREADY SENDED by jobinformation",is_Stored);
    }
  
   }
  return (
    <div className='wrapper'>
      <h3 className='description-header'>Job description</h3>
    <div className='interview-description-area'>
      
    {interviewDetail.jobDescription}
  </div>
<div className='intervew-timer'>
  <h3 className='timer-header'>Timer</h3>
  <Countdown date={Date.now() + parseInt(interviewDetail.duration)} renderer={renderer} />
</div>

    </div>
  )
}
