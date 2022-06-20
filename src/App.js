
import './App.css';
import Chat from './Chat';
import ConductInterview from './ConductInterview';
import Jobinformation from './JobInformation'
import React,{useState,useEffect} from 'react';
import loadingImage from './gif1.gif';
import canidateimg from './DSC.png';
import GoogleLogin from "react-google-login";
import Mainnavbar from './Mainnavbar';
import axios from "axios";
//import Allinterviews from './Allinterviews'
//import SendEmail from './SendEmail';
function App() {
  
  const [chatUrl,setChatUrl]=useState(window.location.href);
  const [candidateData,setCandidateData]=useState({interview_id:'',candidate_email:''});
  const [candidateName,setCandidatename]=useState("candidate");
  const [candidateImageURL,setcandidateImageURL]=useState(canidateimg);
  const [start,setStart]=useState(false);
  const [is_conducted,setIsConducted]=useState(false);
 const [checkBoxState,setCheckBoxState]=useState(false);
  const [showpage,setshowpage]=useState(false);
  
  window.onload = () => {
    let params = (new URL(chatUrl)).searchParams;
    //console.log("chat url is",params.get('interviewid'));
    candidateData.interview_id=params.get('interviewid');
    candidateData.candidate_email=params.get('useremail');
    window.localStorage.setItem('interview_Id',candidateData.interview_id);
    window.localStorage.setItem('candidate_Email',candidateData.candidate_email);
    //setStart(true);
    

     checkData();
//window.localStorage.setItem("hasResponse",JSON.stringify(false));
    };
 

 const checkData=async()=>{
   console.log("candidateData",candidateData,"api is",`${process.env.REACT_APP_API_KEY}/check/applicant/email?interview_id=${candidateData.interview_id}&email=${candidateData.candidate_email}`);
   //api for checking interview and candidate
   const response = await axios.get(`${process.env.REACT_APP_API_KEY}/check/applicant/email?email=${candidateData.candidate_email}&interview_id=${candidateData.interview_id}`,
   ).catch((err) => 
      {
       alert("Server down issue found. Kindly try again");
      });
      if (response)  {
//checking result

        //if reponse.attribute==true save data to storage and other data in it too
        console.log("reponse by post title and id is",response);
        if(response.data.found==true){
          console.log("All good going to 2nd api");
          const response = await axios.get(`${process.env.REACT_APP_API_KEY}/check/interview/conducted?email=${candidateData.candidate_email}&interview_id=${candidateData.interview_id}`,
          ).catch((err) => 
             {
              alert("Server down issue found. Kindly try again");
             });
             if (response)  {
if(response.data==false){
  console.log("All good calling thrid api");
  setshowpage(true);
  setIsConducted(true);
  
}else{
  setshowpage(true);
  setIsConducted(false);
  
  console.log(" Your interview has already been conducted")
}
              
             }
          
     // setStart(true);
      }
      else{
        console.log("PAGE NOT FOUND");
        //call for not found page
      }
    //first ends below
    }
          
  }
  const responseGoogle = (response) => {
    console.log("Interview started in app js,succcessfull login");
    setCandidatename(response.profileObj.name);
    //image failed request check here
    setcandidateImageURL(response.profileObj.imageUrl);
    setStart(true);
    //console.log(candidateImageURL);
    
      }
      const response1negGoogle=(response)=>{
        console.log("Login unsuccessful. Kindly try again");
      }
 const handleCheckBoxClick=()=>{
  setCheckBoxState(!checkBoxState);
 }
  return (
        <div className="App"> 
       {showpage==true?(
        <>
      {start==true?(<ConductInterview candidateName={candidateName} candidateImageURL={candidateImageURL}/>):(
      <div>
         <Mainnavbar />{is_conducted==true?(
          <>
         <p className='interview-instruction'>
         <h4>Instructions</h4>
           
            <ul>
            <li>Read all the instruction carefully. All  instructions are important</li>
  <li>Each interview has a set of questions that you need to answer</li>
  <li>Not All questions are given options. You need to answer them according to your thinking</li>
  <li>In order to select the option as your answer click on the option</li>
  <li>In order to answer those questions that dont have options write in the input field</li>
  <li>After writing in the input field click on the send button</li>
  <li>Your interview has a given time</li>
  <li>No candidate will be able to answer questions after the time is ended</li>
  <li>Interview has a specific time after shown in the timer at start of interview</li>
  <li>You can leave the interview by clicking on the menu icon on chat header and clicking lleave button</li>
  <li>If the interview is completed the candidate won't be able to give answers </li>
  <li>You are allowed to give interview only once</li>
  <li>Kindly give interview with honesty</li>
  
  
 
</ul>
            </p>
      <input type="checkbox" onChange={handleCheckBoxClick} id="conducting-checkbox" className="conducting-checkbox"/><label for="conducting-checkbox" className='conducting-checkbox-label'>I have read the intructions carefully</label>
      {checkBoxState==true && <GoogleLogin
                 className='loginbutton'
                  clientId="1069438428430-b3jg29j7u57shhphc1rduthvbg7m7tck.apps.googleusercontent.com"
                  buttonText="Login With Google"
                  onSuccess={responseGoogle}
                  onFailure={response1negGoogle}
                  cookiePolicy={'single_host_origin'}
              /> }
              <div className='faq-area'>
              <h4>FAQ's</h4>
<div className='faq-question-answer'>
  <h6>Question: How to join the interview</h6>
  <p>Answer: You can join it by first reading the intruction and then clicking the checkmark after that you will login with you google account and your interview will start</p>
  <h6>Question: What is the duration of interview</h6>
  <p>Answer: When the interview will start there will be a timer at the bottom left corner showing the duration remaining</p>
  <h6>Question: Is it necessary to check intructions</h6>
  <p>Answer: Interview will start after all the instructions are read and the check label is checked</p>
  <h6>Question: How to login</h6>
  <p>Answer: After checking the label click on the login with google button to login to the system</p>
  <h6>Question: Can we join without login</h6>
  <p>Answer: No you cannot join wihtout login in with your google account first</p>
  <h6>Question: How to leave the interview</h6>
  <p>Answer: Click on the menu icon in chat header and click on leave after that if you want to leave click on ok of the alert</p>
  <h6>Question: what will happen if we leave the interview</h6>
  <p>Answer: If you leave the interview your answers will be stores in the system and are evaluated</p>
  
</div>
              

              </div>
              </>):(<div className='interview-conducted'>Your Interview has already been conducted</div>)}
      </div>)} </>):(<div className='conducting-1pageloading'><img src={loadingImage} className='conductingloadingImage'></img></div>)}
    </div> 
  );
}
export default App;
{/* <div className="App">
      <div className='jobinformation'>
        <Jobinformation/>
      </div>
      <div className='chatui'>
        <Chat/>
      </div>
     
    </div>
    
    window load get user id and interview id 
    send data {user_id: '' ,interview_id:''}
    getresponse {status: true,interviewdetail:interview details object/dictionary here,rules: {},questions:{}}
    when one response is got from candidate a var store in storage checked on leave and before send 
    after conduct page leave or timeout response is post to api

    window.localStorage.getItem('interview_id')
    window.localStorage.getItem('candidate_email') http://localhost:5000/interview?interviewid=123&useremail=522
    small found variable useremail intergiew id sent to api response got true 
     id:1,
      text: "Where are you from?",
      options:[{id:1,optionText:"Islamabad",Weightage:"50"}
      ,{
        id:2,optionText:"Rawalpindi",Weightage:"75"},{
          id:3,optionText:"Taxila",Weightage:"75"},{
            id:4,optionText:"Other",Weightage:"75"}]
      }
*/}