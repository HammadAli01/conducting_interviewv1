
import './Chat.css'
import botimg from "./botimage.jpg"
import Messages from "./Messages";
import GoogleLogin from "react-google-login";
import React,{useState,useEffect,useRef} from 'react';
import { BiDotsVerticalRounded } from "react-icons/bi";
import { Modal,Button } from 'react-bootstrap';
import canidateimg from './profile.jpg';
import axios from 'axios';
export default function Chat(props) {
  
    const [showMenu,setShowMenu]=useState(false);
    const [modalShow, setModalShow] = useState(true);
    const [count,setCount]=useState(false);
    const [count2,setCount2]=useState(false);
    const [candidateName,setCandidatename]=useState("candidate");
    const [candidateImageURL,setcandidateImageURL]=useState(canidateimg);
    const response1negGoogle=(response)=>{
      alert("Login unsuccessful. Kindly try again");
    }
    
    useEffect(()=>{
      setShowMenu(!showMenu);
     // console.log("show menu is ",showMenu);
    },[count]);
   
    
    const MyVerticallyCenteredModal=(props)=> {
      return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter" className='interivew-instruction-modal-title'>
              Welcome to rAIcruit
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Instructions</h4>
            <p className='interview-instruction'>
            <ul>
  <li>Questions has multiple options beneath it, canidate have to click you selected option it will be submitted as your answer</li>
  <li>Questions having no options are to be answered in the field</li>
  <li>Incase of question having option canidate wont be able to write in input field</li>
  <li>Incase of leaving the interview will end and you wont be able to give it again</li>
  <li>Kindly login with google to start your interview</li>
  
 
</ul>
            </p>
            
          </Modal.Body>
          <Modal.Footer>
         
          <GoogleLogin
                 className='loginbutton'
                  clientId="1069438428430-b3jg29j7u57shhphc1rduthvbg7m7tck.apps.googleusercontent.com"
                  buttonText="Start"
                  onSuccess={responseGoogle}
                  onFailure={response1negGoogle}
                  cookiePolicy={'single_host_origin'}
              /> 
          </Modal.Footer>
        </Modal>
      );
    }
    const responses=useRef([]);
    const next_target=useRef();
    const rules=useRef(props.interview_rules);
     const questions=props.interview_questions;
     console.log("got rules are",rules,"got questions are",questions);
     questions.forEach((question)=>{
      question.member= {
        id:1,
        color: "blue",
        username: "olaf",
        image:botimg ,
      }
     });
     const [Allmessages,setAllMessages]= useState([questions[0]]);
     let member= {
       id:2,
       username: candidateName,
       color: "rgb(101, 224, 52)",
       image:candidateImageURL,
     }
     const onDeleteMessage=(msgText)=>{
      const messages = [...Allmessages];
      messages.map((msg)=>{
        if(msg.text!==msgText){
          console.log("other text found");
        }
        else{
          console.log("msg to be deleted found",msg.text);
msg.options=[];
        }
      });
     // console.log("delete called",messages);
     // setAllMessages(messages.filter(msg=>(msg.text!==msgText)));
     setAllMessages(messages);
     }
     const setNextQuestion=(current_questionId,option_Selected)=>{
       let mytemp=false;
       rules.current.map((rule)=>{
      if(rule.source_id==current_questionId)
      { //console.log("RUle,optionselected",rule.option_content,option_Selected) ;
         if(rule.option_content==option_Selected)
        { 
          next_target.current=rule.target_id;
          mytemp=true;
          console.log("first set");
          //return false;
        }
        
      }
      if(mytemp==false){
      if(rule.source_id==current_questionId ){
        questions.map((question)=>{
          if(current_questionId==question.id){
          if(question.options.length==0)
          {
            console.log(question.options.length,"again selected");
            next_target.current=rule.target_id;
            //return false;
          }}
        })
        }
          
      }
      else{
      //  return false;
      }


       });
     }
    const onSendMessage = (index,source_Id,message) => {
       let temp_response=[...responses.current];
       temp_response.push({question_id:source_Id,response:message});
       responses.current=temp_response;
       window.localStorage.setItem("hasResponse",true);
       //window.localStorage.setItem("Allresponses", responses.current);
       
      console.log("responses are",responses.current);
       const messages = [...Allmessages];
       messages.push({
         text: message,
         member: member
       });
       //console.log("meesage got is:",message,"updated messages list is:",messages);
       setAllMessages(messages);
       
       setNextQuestion(source_Id,message);
       questions.map((question)=>{
        if(question.id==next_target.current)
        {
          messages.push(question);
          console.log("question Pushed is ",question);
        } 
      });
       setAllMessages(messages);
       rules.current.every((rule)=>{
        if(rule.source_id==source_Id)
        {
          if(rule.target_id==next_target.current)
          {
            if(rule.option_content==message)
            {
              //ruletobedeleted.current=rules.indexOf(rule);
              rules.current.splice(rules.current.indexOf(rule),1);
              return false;
            }
            else{return true;}
          }
          else{return true;}
        }
        else{return true;}
        }); //rules.splice(ruletobedeleted.current);
        console.log("updates rules are",rules.current);
     }
     
     
     
     const responseGoogle = (response) => {
      
   setCandidatename(response.profileObj.name);
   setcandidateImageURL(response.profileObj.imageUrl);
  //  candidateImageURL.current=response.profileObj.imageUrl;
  //  candidateName.current=response.profileObj.name;
   console.log(candidateImageURL);
   setModalShow(false);
   setCount2(!count2);
   
     }
     const sendResponses=async()=>{
      //  console.log("get local is",JSON.parse(window.localStorage.getItem("interviewid")),window.localStorage.getItem("useremail"))
      //  const interviewId=window.localStorage.getItem("interviewid");
      //  const userId=window.localStorage.getItem("useremail"),user_name=window.localStorage.getItem("candidatename");
      const result={
        interview_id:props.interviewId,
        email:props.userEmail,
        name:candidateName,
        response_list:responses.current
      }
      console.log("data to api is",result);
       const response = await axios.post('https://raicruittest.herokuapp.com/store/interview/result',result
      ).catch((err) => 
         {
           console.log("Error: ", err);
         });
         if (response)  {
            console.log("reponse by post question is",response);
       }
     }
     const showAlert=()=>{
      
       let leaveMessage1="You wont be able to give interview again and questions answered yet will be considered only. Click Ok to leave and cancel to continue interview";
       let res=window.confirm(leaveMessage1);
       if (res == true) {
        console.log("You pressed OK!");
       sendResponses();
        //window.close();

      } else {
        console.log("You canceled!");
      }
     }
     useEffect(()=>{
      member= {
        id:2,
        username: candidateName,
        color: "rgb(101, 224, 52)",
        image:candidateImageURL,
      }
      console.log("member",member,"cdimg",candidateImageURL);
      
      window.localStorage.setItem("candidatename",candidateName);
    },[count2]);
     return (
       <div className="chat">
          <MyVerticallyCenteredModal
        show={modalShow}
        backdrop="static"
        keyboard={false}
      />
         <header className="chat-header">
              {/* <GoogleLogin
              className='loginbutton'
                clientId="1069438428430-b3jg29j7u57shhphc1rduthvbg7m7tck.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />  */}
            <BiDotsVerticalRounded className='menuicon' 
            onClick={(e)=>{setCount(!count)}}
            ></BiDotsVerticalRounded>
         </header>
        {!showMenu ?(<div  className="leavemenu">
          <button className='leavebutton' onClick={()=>{showAlert(); setCount(!count)}}>Leave</button>
          {/* <button className='leavebutton' onClick={()=>{setCount(!count)}}>Leave 2</button>
          <button className='leavebutton' onClick={()=>{setCount(!count)}}>Leave 3</button> */}
          </div>):(null)
         }<section >
         
           <Messages messages={Allmessages}
           onSendMessage={onSendMessage}
           currentMember={member} 
           onDeleteMessage={onDeleteMessage}
           />
          
            </section>
         
       </div>
     );
   }
   //http://localhost:5000/interview?interviewid=123&userid=522
   /*  make a start and ending var with msgs etc like questions in useeffect with empty dependency set start to allquestions
   then in checknextquestion check if the current q id is 0 then get next question index 0 as questions are in order
   if not in order then in rules check if sourceid==0 then get target id simply and push it as next question 
   for end question check if targetid ==-1 then push ending question text we made then in msgs check if message id==-1 
   set inputfieldstatus.current to false thats it 
import './Chat.css'
import botimg from "./botimage.jpg"
import Messages from "./Messages";
import GoogleLogin from "react-google-login";
import React,{useState,useEffect,useRef} from 'react';
import { BiDotsVerticalRounded } from "react-icons/bi";
import { Modal,Button } from 'react-bootstrap';
import canidateimg from './profile.jpg';
export default function Chat(props) {
  
    const [showMenu,setShowMenu]=useState(false);
    const [modalShow, setModalShow] = useState(true);
    const [count,setCount]=useState(false);
    const [count2,setCount2]=useState(false);
    const [candidateName,setCandidatename]=useState("candidate");
    const [candidateImageURL,setcandidateImageURL]=useState(canidateimg);
    const response1negGoogle=(response)=>{
      alert("Login unsuccessful. Kindly try again");
    }
    
    useEffect(()=>{
      setShowMenu(!showMenu);
     // console.log("show menu is ",showMenu);
    },[count]);
   
    
    const MyVerticallyCenteredModal=(props)=> {
      return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter" className='interivew-instruction-modal-title'>
              Welcome to rAIcruit
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Instructions</h4>
            <p className='interview-instruction'>
            <ul>
  <li>Questions has multiple options beneath it, canidate have to click you selected option it will be submitted as your answer</li>
  <li>Questions having no options are to be answered in the field</li>
  <li>Incase of question having option canidate wont be able to write in input field</li>
  <li>Incase of leaving the interview will end and you wont be able to give it again</li>
  <li>Kindly login with google to start your interview</li>
  
 
</ul>
            </p>
            
          </Modal.Body>
          <Modal.Footer>
         
          <GoogleLogin
                 className='loginbutton'
                  clientId="1069438428430-b3jg29j7u57shhphc1rduthvbg7m7tck.apps.googleusercontent.com"
                  buttonText="Login"
                  onSuccess={responseGoogle}
                  onFailure={response1negGoogle}
                  cookiePolicy={'single_host_origin'}
              /> 
          </Modal.Footer>
        </Modal>
      );
    }
    const responses=useRef([]);
    const next_target=useRef();
    const rules=useRef();
     const questions=props.interview_questions;
     questions.forEach((question)=>{
      question.member= {
        id:1,
        color: "blue",
        username: "olaf",
        image:botimg ,
      }
     });
     const [Allmessages,setAllMessages]= useState([questions[0]]);
     let member= {
       id:2,
       username: candidateName,
       color: "rgb(101, 224, 52)",
       image:candidateImageURL,
     }
     const onDeleteMessage=(msgText)=>{
      const messages = [...Allmessages];
      messages.map((msg)=>{
        if(msg.text!==msgText){
          console.log("other text found");
        }
        else{
          console.log("msg to be deleted found",msg.text);
msg.options=[];
        }
      });
     // console.log("delete called",messages);
     // setAllMessages(messages.filter(msg=>(msg.text!==msgText)));
     setAllMessages(messages);
     }
     const setNextQuestion=(current_questionId,option_Selected)=>{
       
       rules.current.map((rule)=>{
      if(rule.source_id==current_questionId)
      { //console.log("RUle,optionselected",rule.option_content,option_Selected) ;
         if(rule.option_content==option_Selected)
        { 
          next_target.current=rule.target_id;
          //return false;
        }
        
      }
      if(rule.source_id==current_questionId ){
        questions.map((question)=>{
          if(current_questionId==question.id){
          if(question.options.length==0)
          {
            next_target.current=rule.target_id;
            //return false;
          }}
        })
        
          
      }
      else{
      //  return false;
      }


       });
     }
    const onSendMessage = (index,source_Id,message) => {
       let temp_response=[...responses.current];
       temp_response.push({source:source_Id,option:message});
       responses.current=temp_response;
      console.log("responses are",responses.current);
       const messages = [...Allmessages];
       messages.push({
         text: message,
         member: member
       });
       //console.log("meesage got is:",message,"updated messages list is:",messages);
       setAllMessages(messages);
       
       setNextQuestion(source_Id,message);
       questions.map((question)=>{
        if(question.id==next_target.current)
        {
          messages.push(question);
          console.log("question Pushed is ",question);
        } 
      });
       setAllMessages(messages);
       rules.current.every((rule)=>{
        if(rule.source_id==source_Id)
        {
          if(rule.target_id==next_target.current)
          {
            if(rule.option_content==message)
            {
              //ruletobedeleted.current=rules.indexOf(rule);
              rules.current.splice(rules.current.indexOf(rule),1);
              return false;
            }
            else{return true;}
          }
          else{return true;}
        }
        else{return true;}
        }); //rules.splice(ruletobedeleted.current);
        console.log("updates rules are",rules.current);
     }
     
     
     
     const responseGoogle = (response) => {
      
   setCandidatename(response.profileObj.name);
   setcandidateImageURL(response.profileObj.imageUrl);
  //  candidateImageURL.current=response.profileObj.imageUrl;
  //  candidateName.current=response.profileObj.name;
   console.log(candidateImageURL);
   setModalShow(false);
   setCount2(!count2);
   
     }
     const showAlert=()=>{
       let leaveMessage1="You wont be able to give interview again and questions answered yet will be considered only. Click Ok to leave and cancel to continue interview";
       let res=window.confirm(leaveMessage1);
       if (res == true) {
        console.log("You pressed OK!");
        window.close();
      } else {
        console.log("You canceled!");
      }
     }
     useEffect(()=>{
      member= {
        id:2,
        username: candidateName,
        color: "rgb(101, 224, 52)",
        image:candidateImageURL,
      }
      console.log("member",member,"cdimg",candidateImageURL);
    },[count2]);
     return (
       <div className="chat">
          <MyVerticallyCenteredModal
        show={modalShow}
        backdrop="static"
        keyboard={false}
      />
         <header className="chat-header">
              {/* <GoogleLogin
              className='loginbutton'
                clientId="1069438428430-b3jg29j7u57shhphc1rduthvbg7m7tck.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />  
            <BiDotsVerticalRounded className='menuicon' 
            onClick={()=>{setCount(!count)}}
            ></BiDotsVerticalRounded>
         </header>
        {!showMenu ?(<div  className="leavemenu">
          <button className='leavebutton' onClick={()=>{showAlert(); setCount(!count)}}>Leave</button>
          {/* <button className='leavebutton' onClick={()=>{setCount(!count)}}>Leave 2</button>
          <button className='leavebutton' onClick={()=>{setCount(!count)}}>Leave 3</button> 
          </div>):(null)
         }<section >
         
           <Messages messages={Allmessages}
           onSendMessage={onSendMessage}
           currentMember={member} 
           onDeleteMessage={onDeleteMessage}
           />
          
            </section>
         
       </div>
     );
   }
   //http://localhost:5000/interview?interviewid=123&userid=522 */