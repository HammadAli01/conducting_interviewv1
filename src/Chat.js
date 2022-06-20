
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
    
    
    const no_QuestionsAllowed=useRef(false);
    let rule_Found=useRef(false);
    var today = new Date();
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
       username: props.candidateName,
       color: "rgb(101, 224, 52)",
       image:props.candidateImageURL,
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
      let checkQuestions=JSON.parse( window.localStorage.getItem("current_interview_questions"));
      console.log("checkrules",checkQuestions);
      rule_Found.current=false;
      let temp=false;
       let mytemp=false;
       rules.current.map((rule)=>{
      if(rule.source_id==current_questionId)
      { //console.log("RUle,optionselected",rule.option_content,option_Selected) ;
         if(rule.option_content==option_Selected)
        { 
          console.log("rule option is ",rule);
          next_target.current=rule.target_id;
          mytemp=true;
          temp=true;
          rule_Found.current=true;
          console.log("first set,target rule is ",next_target.current);
          //return false;
        }
      
        }
      if(mytemp==false){
        if(rule_Found.current==false){
          console.log("here in open ended");
      if(rule.source_id==current_questionId ){
        checkQuestions.map((question)=>{
          if(current_questionId==question.id){
          if(question.options.length==0)
          {
            console.log(question.options.length,"again selected",rule_Found.current);
            next_target.current=rule.target_id;
            rule_Found.current=true;
            mytemp=true;temp=true;
            // if(next_target.current==(-12)){
            //   alert("last found");
            // }
            //return false;
          }}
        })
        }
      }
      }
      else{
      //  return false;
      }

       });
      
         if(temp==false){
        next_target.current= -1;
         no_QuestionsAllowed.current=true;
        console.log("RULE NOT FOUND",next_target.current);
        sendResponses();
       }else(console.log("Rule Found",option_Selected,next_target.current));
       if(next_target.current== (-1)){
        no_QuestionsAllowed.current=true;
        console.log("RULES ENDED CALLING -1",next_target.current);
        sendResponses();
       }else{}
     }
    
     
    const onSendMessage = (index,source_Id,message) => {
      if(no_QuestionsAllowed.current==false){
        
      const messages = [...Allmessages];
      if(source_Id!==(-11)){
        const msg_time = today.getHours() + ":" + today.getMinutes() ;
       let temp_response=[...responses.current];
       temp_response.push({question_id:source_Id,response:message,response_time:msg_time});
       responses.current=temp_response;
       //window.localStorage.setItem("hasResponse",true);
       window.localStorage.setItem("candidate_responses",JSON.stringify(responses.current));
       messages.push({
        text: message,
        member: member
      });
      }else{
        const botUser={
          id:1,
          color: "blue",
          username: "olaf",
          image:botimg ,
        };
        messages.push({
          id:-11,
          text: message.stem,
options:message.options,
          member: botUser
        });
      }
       //window.localStorage.setItem("Allresponses", responses.current);
       
      console.log("responses are",responses.current);
       
      
       //console.log("meesage got is:",message,"updated messages list is:",messages);
       setAllMessages(messages);
       console.log("ALL MESSAGES ARE:",messages);
       if(source_Id!==(-11)){
         if(next_target.current==(-1)){
           no_QuestionsAllowed.current=true;
          console.log("Input by -1 disabled");
          }else{}
         setNextQuestion(source_Id,message);
        // if(next_target.current!==(-1)){
          let checkQuestions=JSON.parse( window.localStorage.getItem("current_interview_questions"));
          checkQuestions.forEach((question)=>{
            question.member= {
              id:1,
              color: "blue",
              username: "olaf",
              image:botimg ,
            }
           });
          checkQuestions.map((question)=>{
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
      // }
      //   else{
         
      //     sendByeMessage();
      //     no_QuestionsAllowed.current=true;
          
      //   }
       }
       else{console.log("Time finished,after next rule finding");}
    
    }else{
      console.log("No more respponses will be accepted");
    }
     }
     const sendByeMessage=()=>{
      const botUser={
                  id:1,
                  color: "blue",
                  username: "olaf",
                  image:botimg ,
                };
       const bye_Msg={
        
          id:-11,
          stem: "3Thank you for your time. The interview has been finished. It was great to interview you. Goodbye till next time, Olaf",
          options:[],
         
       
        }
        // const messages=[...Allmessages];
        // messages.push(bye_Msg);
        // setAllMessages(messages);
     onSendMessage(1,-11,bye_Msg);
    
    //interview ended
     }
     useEffect(()=>{
      if(no_QuestionsAllowed.current==false){if(props.time_finished==true){
        sendByeMessage();
        console.log("time finished",no_QuestionsAllowed.current);
         no_QuestionsAllowed.current=true;
        
             }else{console.log("Time not finished");}}
     },[props.time_finished]);
    
     
     
     const responseGoogle = (response) => {
      
   //setCandidatename(response.profileObj.name);
   //setcandidateImageURL(response.profileObj.imageUrl);
  
   //console.log(candidateImageURL);
   setModalShow(false);
   setCount2(!count2);
   
     }
     const sendResponses=async()=>{
      console.log("DATA SENDING BY chat CALLED");
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
        response_list:responses.current
      }
      console.log("Data send to api",result);
        const response = await axios.post(`${process.env.REACT_APP_API_KEY}/store/interview/result`,result
      ).catch((err) => 
         {
           console.log("Error: ", err);
         });
         if (response)  {
            console.log("reponse by post question is",response);
      //  }
      console.log("data to SEND by bye bye is is",result);}
      else{
        console.log("DATA ALREADY SENDED");
      }
    }
     }
     const showAlert=()=>{
      
       let leaveMessage1="You wont be able to give interview again and questions answered yet will be considered only. Click Ok to leave and cancel to continue interview";
       let res=window.confirm(leaveMessage1);
       if (res == true) {
        console.log("You pressed OK!");
       sendResponses();
       window.location.href = "http://localhost:3000/home";
        //window.close();

      } else {
        console.log("You canceled!");
      }
     }
     useEffect(()=>{
      // member= {
      //   id:2,
      //   username: candidateName,
      //   color: "rgb(101, 224, 52)",
      //   image:candidateImageURL,
      // }
      // console.log("member",member,"cdimg",candidateImageURL);
      
      window.localStorage.setItem("candidatename",props.candidateName);
    },[count2]);
     return (
       <div className="chat">
          {/* <MyVerticallyCenteredModal
        show={modalShow}
        backdrop="static"
        keyboard={false}
      /> */}
         <header className="chat-header">
              
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
  //  //http://localhost:5000/interview?interviewid=123&userid=522
  //    make a start and ending var with msgs etc like questions in useeffect with empty dependency set start to allquestions
  //  then in checknextquestion check if the current q id is 0 then get next question index 0 as questions are in order
  //  if not in order then in rules check if sourceid==0 then get target id simply and push it as next question 
  //  for end question check if targetid ==-1 then push ending question text we made then in msgs check if message id==-1 
  //  set inputfieldstatus.current to false thats it 

  //  //http://localhost:5000/interview?interviewid=123&userid=522 