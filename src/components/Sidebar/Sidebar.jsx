import React, { useContext, useState } from 'react'
import { MdMenu } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { RiMessage3Line } from "react-icons/ri";
import { FaQuestion } from "react-icons/fa6";
import { FaHistory } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { Context } from '../../context/Context';

const Sidebar = () => {

    const [extended, setExtended] = useState(false);
    const {onSent, prevPrompts, setRecentPrompts, newChat} = useContext(Context)

   const loadPrompt = async(prompt) => {
    setRecentPrompts(prompt)
      await onSent(prompt)
    }

  return (
    <div className={`${extended ? ' min-h-screen flex flex-col justify-between bg-[#f0f4f9] px-8 py-6 w-1/5 ' : ' min-h-screen flex flex-col justify-between bg-[#f0f4f9] px-8 py-6 w-1/12'} hidden sm:flex`}>
      <div className="top">
     <MdMenu onClick={()=>setExtended(prev=>!prev)} className='text-3xl block cursor-pointer' />
      <div onClick={()=>newChat()} className=" mt-3 inline-flex items-center gap-3 py-3 px-4 rounded-3xl text-sm text-gray-600 bg-[#e6eaf1] cursor-pointer">
     <FaPlus className='text-3xl' />
     {extended ? <h4>New Chat</h4> : null }
      </div>
      {extended 
      ?
      <div className="flex flex-col">
      <p className='text-xl mt-7 mb-5'>Recent</p>
      {/* Recent Prompts (History) */}
      {prevPrompts.map((item, index)=>{
  return(
    <div onClick={()=>loadPrompt(item)} key={index} className="recent-entry flex items-start gap-2 p-2 pr-5 rounded-3xl cursor-pointer  hover:bg-gray-300">
    <RiMessage3Line className='text-3xl' />
    <p>{item.slice(0,18)}</p>
</div>
  )
      })}
   
    </div> 
         :null
    }
     
      </div>

{/* Bottom */}
 <div>
    <div className="flex items-center mt-2 hover:bg-gray-300 px-2 py-2 rounded-3xl">
        <FaQuestion className='text-3xl' />
       {extended ? <p className='px-2'>Help</p> : null} 
    </div>
    <div className="flex items-center mt-2  hover:bg-gray-300 px-2 py-2 rounded-3xl">
        <FaHistory className='text-3xl' />
        {extended ? <p className='px-2'>Activity</p> : null}  
    </div>
    <div className="flex items-center mt-2 hover:bg-gray-300 px-2 py-2 rounded-3xl">
        <IoIosSettings className='text-3xl' />
        {extended ? <p className='px-2'>Setting</p> : null} 
    </div>
 </div>

    </div>
  )
}

export default Sidebar
