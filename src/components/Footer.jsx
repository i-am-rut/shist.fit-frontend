import { FaRegCopyright } from 'react-icons/fa6'
import { IoMdPulse } from 'react-icons/io'

const Footer = () => {
  return (
    <footer className={`bg-black text-white flex items-center justify-between p-4 lg:px-24`}>
        <div className="flex gap-2 items-center">
            <IoMdPulse className="text-2xl" />
            <h1 className="font-bold text-2xl">Shist</h1>
        </div>
        <div className="flex gap-2 items-center text-gray-500 font-medium">
            <FaRegCopyright /> {new Date(Date.now()).getFullYear()} Shist. All rights reserved.
        </div>
    </footer>
  )
}

export default Footer
