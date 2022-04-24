import React,{useState,useEffect,useRef} from 'react';

export default function Input(props) {
    const [text,setText]=useState('');
    
    const onChange=(e)=> {
        setText(e.target.value);
      }
      const onSubmit=(e)=> {
        e.preventDefault();
        
        props.onSendMessage(1,text);
       
       
        setText('');
      }
    
  return (
  <div className="Input">
  <form onSubmit={e => onSubmit(e)}>
    <input
      onChange={e => onChange(e)}
      value={text}
      type="text"
      placeholder="Enter your message and press ENTER"
      autoFocus={false}
    />
    <button type="submit" disabled={!text} >Send</button>
  </form>
</div>
)
}
