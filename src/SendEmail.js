import React,{useState,useEffect,useRef} from 'react';
import "./SendEmail.css";
import * as XLSX from "xlsx";
import { BsFillPersonFill,BsEnvelopeOpenFill,BsEnvelopeFill,BsMastodon } from "react-icons/bs";
import { Alert } from 'react-bootstrap';
//BsFileArrowUp
export default function SendEmail(props) {
const invalidEmails=useRef(0);
  const [emailData,setEmailData]=useState({receiverEmails:"",senderName:"",senderEmail:"",emailSubject:"",emailMessage:""});
  const candidates=useRef([]);
  const [senderEmailError,setSenderEmailError]=useState();
  const selected={id:1,title:"AThis is the default title1",generationDate:"02/11/2017",startDate:"12/04/2021",endDate:"12/06/2021",location:"Islamabad",type:"Full Time",position:"Management",jobDescription:"Lorem ipsum dolor sit amet, isis consectetur adipiscing elit, sed do eiusmod tempor ..."   };
  const [fileheader,setFileHeader]=useState("email");
  let isfileselected=false;
  const changeHandler=(e)=>{
      setEmailData({...emailData,[e.target.name]:e.target.value});
    };
const checkSenderEmailError=()=>{
   
  if(emailData.senderEmail=="")
  {
    setSenderEmailError("Required");
return false;
  }
  else{
    if(!/\S+@\S+\.\S+/.test(emailData.senderEmail)){ setSenderEmailError("Invalid email");
    return false; }
    else{
    return true;}
  }
}
const sendDataToAPI=(e,all_candidates,email_msg)=>{
  emailData.receiverEmails=all_candidates;
  emailData.emailMessage=email_msg;
  console.log("email data",emailData);
  e.target.reset();
}
  const sendmail=(e)=> {
    let emailmsg=emailData.emailMessage+" Click on this link to start Interview \n http://localhost:3000/ \n Interview Start date is "+selected.startDate+"\n Interview End date is "+selected.endDate;
          
    const res=checkSenderEmailError();
    e.preventDefault();
    if(res==true && (candidates.current.length > 0))
    {
      if(invalidEmails.current.length>=1)
      {
        let confirmres=window.confirm(invalidEmails.current+" Invalid emails found in the file you uploaded \n Would you like to proceed");
        if(confirmres)
        {
        //   emailData.receiverEmails=candidates.current;
        //  console.log("email data",emailData);
        //   e.target.reset();
          sendDataToAPI(e,candidates.current,emailmsg);
        }
        else{alert("upload file again");}
      }else
      {
        sendDataToAPI(e,candidates.current,emailmsg);
      }
      
      }
      else{
        if(res==false)
        {
          console.log("Kindly enter correct sender email");
        }
        else if(isfileselected==false){
          alert("No file uploaded\nKindly upload a xml file with candidates emails");
        }
        else if(isfileselected==true)
        {
          if(candidates.current.length <= 0){
          alert(candidates.current.length+" candidates emails found \n upload a xml file with candidates emails again");
        }
      }
}  }
  const readExcel = (file) => {
    isfileselected=true;
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];
        setFileHeader(ws.A1.h);

        const data = XLSX.utils.sheet_to_json(ws);
       
        resolve(data);
        
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
        //console.log(ws);
          for(var i=0;i<d.length;i++)
          { if(/\S+@\S+\.\S+/.test(d[i][fileheader])){   
            candidates.current[i]=d[i][fileheader];}
            else{
              invalidEmails.current=invalidEmails.current+1;
            }
          }
        });};
  return(
      <div className="sendemailparent">
        
          <form className='emailtemplateform' onSubmit={sendmail}>
                  <h2 className='formheader'>Email Details</h2>
                      <div className='fieldgroup'>
                      
                          <input className='emailinput' type="text" placeholder="sender Name"  name="senderName" onChange={(e)=>{changeHandler(e)}}/>
                          <i className="inputicon"><BsFillPersonFill/></i>
                      </div>
                      <div className='fieldgroup'>
                      
                          <input className='emailinput' type="email"  placeholder="sender Email Address" name="senderEmail" onChange={(e)=>{changeHandler(e)}}/>
                          <i className="inputicon"><BsEnvelopeOpenFill/></i>
                      {senderEmailError && <p className="emailerror">{senderEmailError}</p>}
                      </div>
                      <div className='fieldgroup'>
                      
                          <input className='emailinput' type="text"  placeholder="Subject" name="emailSubject" onChange={(e)=>{changeHandler(e)}}/>
                          <i className="inputicon"><BsEnvelopeFill/></i>
                      </div>
                      <div className='fieldgroup'>
                      
                          <textarea className='emailmessageinput' id="emailmsg"  placeholder="Your message" name="emailMessage" onChange={(e)=>{changeHandler(e)}}/>
                          <i className="inputiconmsg"><BsMastodon/></i>
                      </div>
                      <div >
                      <div className='fieldgroup'>
                      <i className="inputicon"></i>
                          <input className='fileinput' type="file" accept='.xlsx' placeholder="Upload File"  name="receiverEmail" 
                          onChange={(e) => {
                              const file = e.target.files[0];
                              readExcel(file);
                            }}
                          />
                          
                      </div>
                          <input type="submit"  value="Submit" className='emaildatasubmitbutton'></input>
                      </div>
                  
              </form>
          
      </div>
  )
}