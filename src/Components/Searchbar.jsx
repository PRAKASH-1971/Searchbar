import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import "../index.css"
import { useThrottle } from 'use-throttle'

const Searchbar = ({inputhandler,suggestions}) => {
const [inputText,setInputText] = useState("")
const [active,setActive] = useState(0)
const scrollRef = useRef()


    const handleInputTextChange = (e)=>{
 setInputText(e.target.value)
    }
const throttledText = useThrottle(inputText,1000);

useEffect(()=>{
   inputhandler(throttledText);
},[inputhandler,throttledText])


    /* making a call for evry single character */
// useEffect(()=>{
//     inputhandler(inputText)
// },[inputText,inputhandler]);   

const handleactiveSuggestion=(e)=>{
   console.log(e.keyCode);
   switch(e.keyCode){
       /* 38 = up arrow  */
       case 38:
        if(active === 1){
            scrollRef.current.scrollTop = suggestions.length * 38.667;
            setActive(suggestions.length);
        }else if(active <= suggestions.length-3){
            scrollRef.current.scrollTop -= 38.667
         }
        setActive((prev)=> prev - 1);
        break;

        /* 40 = down arrow */
        case 40:
            if(active === suggestions.length){
                scrollRef.current.scrollTop = 0;
                setActive(0);
            }else if(active >= 4){
                scrollRef.current.scrollTop += 38.667    
            }
            setActive((prev)=>prev + 1)
            break;

       default:
        return;
   }
};


console.log(active)
  return (
    <div onKeyUp={handleactiveSuggestion}>
        <h1>Search-Bar Component</h1>
        <input value={inputText} onChange={handleInputTextChange} />
        {suggestions.length > 0 && (
       <SearchBarWrapper ref={scrollRef} active={active} limit={5}>
         {suggestions.map((item,index)=>{
            return (
                <div key={index}
                 onMouseOver={()=>{setActive(index+1);}}
                >{item}</div>)
                })}
        </SearchBarWrapper>
         )}
    </div>
  )
}

export default Searchbar


const SearchBarWrapper = styled.div`
border:1px solid black;
   margin:auto;
   overflow:auto;
   max-height:${({limit}) => `${limit * 38.667}px`};  /* multiplying limit * height of div to see only 5 results */

   & * {
   text-align:left;
   padding:10px;
   }
   
   & :nth-child(${({active})=> active}){
    background: rgba(0,0,0,0.08);
    cursor: pointer;
   }
`;