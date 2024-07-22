import React, { useCallback, useReducer } from 'react'
import Login from './Login';
const ini=0;
const reducer=(state,action)=>{
    switch(action){
        case "inc":
            return state+1;
            case "dec":
            return state-1;
    }
}

const Hooks = () => {
    const[co,dispatch]=useReducer(reducer,ini);
    const le=useCallback(()=>{
        console.log("reg is...")
    },[co])
  return (
   <>
   {co}
    <button onClick={()=>dispatch("inc")}>Inc</button>
    <button onClick={()=>dispatch("dec")}>Dec</button>
    <Login le={le}/>
   </>
  )
}

export default Hooks
