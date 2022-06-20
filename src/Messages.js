import React,{useState,useRef,useEffect} from 'react';
import { useScroll } from 'react-scroll-hooks';
import './Chat.css';
export default function Messages(props) {
   // console.log("props are:",props);
    let omsg;
    const dummy = useRef();
    const containerRef = useRef();
    //msgs
    const messages=props.messages;
    const inputfiledstatus=useRef(true);
    const count=useRef(true);
    const scrollSpeed = 50;
    var today = new Date();
    let today_Date=(today.getMonth()+1)+"/"+(today.getDay()-2)+"/"+today.getFullYear();
    const { scrollToElement, scrollToY } = useScroll({ scrollSpeed, containerRef });
     useEffect(() => {
      console.log("count in useEffect is",count.current);
       scrollToElement(dummy);
     },[count.current]);
    const RenderMessage=(message)=>{
      const msg_time = today.getHours() + ":" + today.getMinutes() ;
      const {member,text} = message;
      const {currentMember} = props; 
      console.log("message got is ",message);
      omsg=message;
      const messageFromMe = member.id === currentMember.id;
      const className = messageFromMe ?
        "Messages-message currentMember" : "Messages-message";
        
      if(messageFromMe==false)
      {
        //style={{backgroundColor: member.color}}
       // console.log("member id",member.id,"current member id:",currentMember.id);
      } 
      // const contentClass=messageFromMe ?
      // "Message-content currentMember" : "Message-content";
      return (
        <li className={className} >
     <div className='msgtime'>
            <img className= "avatar" src={member.image} alt="uimg"/>

           <h6 className='currentmsgtime'>{msg_time}</h6></div>
        
          <div className="Message-content">
            <div className="username">
              {member.username}
            </div>
           
            <div className="text bubble-bottom-left">{text}</div>
            {/* { messageFromMe?(console.log("Candidate message1")):(omsg.options.length!==0?(inputfiledstatus.current=true):(inputfiledstatus.current=false))} */}

            {/* { omsg.id==(-11)?(console.log("OLELA-11")):(inputfiledstatus.current=true)} */}
            { messageFromMe?(console.log("Candidate message1")):(omsg.options.length!==0?(disableInputField()):(ableInputField(omsg)))}
            {/* { omsg.id==(-1)?(endingMessage()):(console.log("OLELA-2"))} */}
          {<p className='hided-p'>{count.current=count.current+1}</p>}
            {
              messageFromMe?(console.log("Candidate message")):(
               
                message.options.map((option)=>(
                <div ><button  className='optionbutton' id={`${option.optionText}.optionbutton`} onClick={()=>{
                  props.onDeleteMessage(text);//send message.id with onsendmsg
                  props.onSendMessage(1,message.id,option.optionText);
                 scroller();
                 }} >{option.optionText}</button>
                
                </div>
                
                ))
            
               
                )
            
                
      }
           
          </div> 
          
        </li>
        
    );
    
}
const endingMessage=()=>{
  console.log("ENDING CALLED");
 
  inputfiledstatus.current=true;
}
const ableInputField=(myMessage)=>{
  console.log("ABLE INPUT FIELD CALLED");
 if(myMessage.id==(-11)||myMessage.id==(-1)||myMessage.id==(-12)){
  inputfiledstatus.current=true;
 }else{
  inputfiledstatus.current=false;
 }
  
}
  


const disableInputField=()=>{
  inputfiledstatus.current=true;
  console.log("DISABLE INPUT FIELD CALLED");
}
const scroller=()=>{
  

   //var targetElement = document. getElementById("scrollerspan");
  // targetElement.scrollIntoView({ behavior: 'smooth'});
//  if(targetElement!==null){
 //targetElement.scrollIntoView({ behavior: 'smooth' });
  //{dummy.current!==undefined?(scroller()):(console.log("i m undefined"))}
    //var mainElement = document. getElementById("mymain");
  //  mainElement.scrollIntoView({behavior: 'smooth', block: 'end'});
  //  let bot=mainElement.scrollHeight;
 // mainElement.style.paddingBottom=155+"px";
//    mainElement.scroll({
//  top: mainElement.scrollTop,//scroll to the bottom of the element.
//  behavior: 'smooth' //auto, smooth, initial, inherit.
//  }); 
scrollToElement(dummy);

 //
 //dummy.current.scrollIntoView({behavior: 'smooth'});
 //}
 
}
const [text,setText]=useState('');
    
    const onChange=(e)=> {
        setText(e.target.value);
      }
      const onSubmit=(e)=> {
        e.preventDefault();
        //send omsg.id with onsedn msg also
        props.onSendMessage(1,omsg.id,text);
       
        //console.log("count is ",count.current);
      //  props.SendResponse(count.current,text);
        
        setText('');
       scroller(); 
       // dummy.current.scrollIntoView({ behavior: 'smooth' });
       //  console.log("dummy currect is ",dummy.current);
      }
     
     const checkInput=()=>{
      // console.log("omsg options are:",omsg.options.length);
       if(omsg.options.length!==0)
       {
       
        let x=document.getElementById("inputField");
        x.disabled=true;
       // console.log("updated x is:",x);
       }
       else{
        // console.log("nomatchong");
        }
     }
     const Input=()=>{
       
      return (
        <div className="Input">
        <form onSubmit={e => onSubmit(e)}>
          <input
            id="inputField"
            disabled={false}
            onChange={e => onChange(e)}
            value={text}
            type="text"
            placeholder="Enter your message and press ENTER"
            autoFocus={true}
            onClick={checkInput}
          />
          <button onClick={()=>{}}>Send</button>
        </form>
      </div>
      )
     }
     
  return (
    <>
   
        <main id="mymain" ref={containerRef} style={{ position: 'relative', overflow: 'scroll' }}>
        <div className="conversationstart">
          
           <span className='timespan'>{today_Date}</span>
                </div>
        {messages.map(m =>RenderMessage(m))
       
        }
     
        
       
        <div ref={dummy}  className='scrollspan' id="scrollerspan">scrollspan</div>
        </main>
       
        
        <form onSubmit={e => onSubmit(e)}>
            <input
                onChange={e => onChange(e)}
                value={text}
                id="inputField"
                type="text"
                placeholder="Enter your message "
                autoFocus={false}
                disabled={inputfiledstatus.current}
                className='chatinput'
            />
           
            <button type="submit" disabled={!text} className='sendbutton'>
  <div class="svg-wrapper-1">
    <div class="svg-wrapper">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
        <path fill="none" d="M0 0h24v24H0z"></path>
        <path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
      </svg>
    </div>
  </div>
  <span>Send</span>
</button>
            </form>
         
    </>
  
  )
}
//current date and time 