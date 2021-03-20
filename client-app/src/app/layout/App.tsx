import React, { useEffect, useState } from 'react';
import agent from '../api/agent';
import GetTogether from '../models/GetTogether';

function App() {

  const [meetings, setMeetings] = useState<GetTogether[]>([]);
 
  useEffect(()=>{  
    agent.GetTogethers.list.then(response=>{
      setMeetings(response);  
      console.log("ings:"+meetings);    
      
    });
  },[meetings]);



  return (
    <div>CareerDoor!!!</div>
  );
}


export default App;
