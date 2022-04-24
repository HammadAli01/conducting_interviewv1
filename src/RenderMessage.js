import React from 'react';

export default function RenderMessage(props) {

    console.log("message got is ",props.message);
    const {member,text} = props.message;
    const {currentMember} = props.PreviousProps;
    console.log("member is",member,"currentmember is:",currentMember);
    const messageFromMe = member.id === currentMember.id;
    const className = messageFromMe ?
      "Messages-message currentMember" : "Messages-message";
    if(messageFromMe==false)
    {
    //  var x= document.getElementById("inputField");
    //  x.disabled=true;
      console.log("member id",member.id,"current member id:",currentMember.id);
    } 

  return (
    <li className={className}>
    <span
      className="avatar"
      style={{backgroundColor: member.color}}
    />
    <div className="Message-content">
      <div className="username">
        {member.username}
      </div>
      <div className="text">{text}</div>
      {messageFromMe?(console.log("Candidate message")):(
       
      props.message.options.map((option)=>(
      <div><button onClick={console.log("option text is:",option.optionText)}>{option.optionText}</button>
      </div>)))}
    </div>
  </li>
  )
}
