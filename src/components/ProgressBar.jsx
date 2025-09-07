import { useState } from "react"

const ProgressBar = ({progress}) => {
    const [show, setShow] = useState(false)

  return (
    <div 
        onMouseEnter={() => setShow(true)} 
        onMouseLeave={() => setShow(false)}
        className="w-full h-4  bg-gray-500 rounded-2xl mt-4 relative">
        {show ? <p className="px-2 py-1 bg-black text-white font-medium absolute border-2 border-gray-400 top-[-2.5rem] right-0 rounded-md">{progress}%</p> : null}
        <div style={{width: `${progress}%`}} className={`h-4 bg-white ${progress > 95 ? "rounded-2xl" : "rounded-l-2xl"}`}></div>
    </div>
  )
}

export default ProgressBar
