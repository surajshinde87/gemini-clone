import { createContext, useState } from "react";
import run from "../config/gemini";


export const Context = createContext()

const ContextProvider = (props) =>{
    const [input, setInput] = useState("");
    const [recentPrompts, setRecentPrompts] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index, nextWord)=>{
setTimeout(function(){
setResultData(prev=>prev+nextWord)
},75*index)
    }
    
    const newChat = () =>{
        setLoading(false)
        setShowResult(false)
    }
      

    const onSent = async (prompt) => {
          console.log(prompt);
          

        setResultData("")
        setLoading(true)
        setShowResult(true)
        let response;
        if(prompt !== undefined){
            response = await run(prompt)
            setRecentPrompts(prompt)
        }else{
          
            setPrevPrompts(prev=>[...prev, input])
          
            setRecentPrompts(input)
            response = await run(input) 
        }
        
       let resArray = response.split("**");
       let newResponse = "";
       for(let i = 0;  i < resArray.length; i++){
        if(i === 0 || i%2 !== 1){
            newResponse += resArray[i]
        }else{
            newResponse += "<b>" + resArray[i] + "</b>";
        }
       }
     let newResponse2 =  newResponse.split("*").join("</br>")

        let newResArr = newResponse2.split(" ");
        for (let i = 0; i < newResArr.length; i++) {
           const nextWord = newResArr[i]
           delayPara(i, nextWord+" ")
        }
       setLoading(false) 
       setInput("")
    }

    const contextValue = {
       prevPrompts,
       setPrevPrompts,
       onSent,
       setRecentPrompts,
       recentPrompts,
       loading,
       resultData,
       showResult,
       input,
       setInput,
       newChat

    }
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider