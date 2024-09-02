import React, { useContext } from 'react'
import { FaRegUserCircle, FaUser } from "react-icons/fa";
import { FaRegCompass } from "react-icons/fa";
import { FaRegLightbulb } from "react-icons/fa";
import { RiMessage3Line } from "react-icons/ri";
import { FaCode } from "react-icons/fa";
import { GrGallery } from "react-icons/gr";
import { IoMdMic } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import { Context } from '../../context/Context';
import { SiGooglegemini } from "react-icons/si";

const Main = () => {
  const {
    onSent,
    recentPrompts,
    loading,
    showResult,
    resultData,
    input,
    setInput} = useContext(Context)


  return (
    <div className=' flex-1 min-h-screen pb-8 relative'>
      <div className="sticky top-0 flex items-center justify-between text-3xl p-5 shadow-sm bg-slate-50">
        
        <p className='flex items-center'><span> <SiGooglegemini className='text-3xl text-pink-400'/></span>Gemini</p>
        <FaRegUserCircle/>
      </div>
      {/* Main Container */}
      <div className=" max-w-4xl m-auto">
        {!showResult 
        ?<>
              <div className="text-2xl font-semibold text-gray-500 px-2 lg:text-5xl lg:my-12 ">
          <p><span className='bg-gradient-to-r from-purple-700 via-pink-500 to-red-500 text-transparent bg-clip-text'>Hello, User</span></p>
          <p>How can I help you today?</p>
        </div>
        {/* Cards */}
        <div className="grid grid-cols-[repeat(auto-fill,_minmax(180px,_1fr))] gap-4 p-5">
          <div className="h-[70px] lg:h-[200px] p-4 bg-slate-50 rounded-lg relative cursor-pointer hover:bg-slate-300">
            <p className='lg:text-xl'>Suggest beautiful pices to see on an upcoming road trip</p>
            <FaRegCompass className='w-[35px] p-1 absolute text-2xl rounded-2xl bottom-2 right-2'/>
          </div>
          <div className="h-[70px] lg:h-[200px] p-4 bg-slate-50 rounded-lg relative cursor-pointer hover:bg-slate-300">
            <p className='lg:text-xl'>Briefly summarise this concept: urban planning</p>
            <FaRegLightbulb className='w-[35px] p-1 absolute text-2xl rounded-2xl bottom-2 right-2'/>
          </div>
          <div className="h-[70px] lg:h-[200px] p-4 bg-slate-50 rounded-lg relative cursor-pointer hover:bg-slate-300">
            <p className='lg:text-xl'>Brainstorm team bonding activities for our work retreat</p>
            <RiMessage3Line className='w-[35px] p-1 absolute text-2xl rounded-2xl bottom-2 right-2'/>
          </div>
          <div className="h-[70px] lg:h-[200px] p-4 bg-slate-50 rounded-lg relative cursor-pointer hover:bg-slate-300">
            <p className='lg:text-xl'>Improve the readability of the following code</p>
            <FaCode className='w-[35px] p-1 absolute text-2xl rounded-2xl bottom-2 right-2'/>
          </div>
        </div>
        </>
         :
         <div className='px-3 py-3 max-h-[70vh] overflow-y-scroll result' >
          <div className='flex items-center gap-4'>
            <FaRegUserCircle className=' text-xl'/>
            <p className='text-xl m-2 px-2'>{recentPrompts}</p>
          </div>
          <div className="data">
       <SiGooglegemini className='text-2xl text-pink-400'/>
       {loading 
       ?<div className='w-full mt-3 flex flex-col items-center gap-4'>
         <h1 className='text-xl font-semibold text-center'>Generating Response ...</h1>
      <div className="loader mx-auto">
       
      </div>
       </div>
       :
       <p className='mt-3' dangerouslySetInnerHTML={{__html:resultData}}></p>
      }
   
          </div>
          </div>
          
      }
  
       
       {/* Bottom */}
        <div className="absolute w-full bottom-0 max-w-4xl px-5 m-auto">
          <div className="flex items-center justify-between lg:gap-5 bg-slate-200 p-1 lg:py-2 lg:px-5 rounded-3xl relative">
            {/* User Inputs Prompts */}
            <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" className='flex-1 bg-transparent border-none outline-none p-2 lg:text-2xl ' placeholder='Enter a prompt here' />
            <div className="flex items-center lg:text-2xl gap-3 cursor-pointer">
              <GrGallery/>
              <IoMdMic/>
              <IoSend onClick={()=>{
                if (input !== "") {
                  onSent()
                }
              }}/>
            </div>
          </div>
          {/* Bottom Info */}
          <p className='m-auto text-center lg:text-xl'>Gemini may display inaccurate info, including about people, so double-check its responses.</p>
          <p className='text-center text-gray-400'>Developed By - Suraj Shinde</p>
        </div>
        
      </div>
    </div>
  )
}

export default Main
