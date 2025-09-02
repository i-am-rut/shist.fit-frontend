import { IoMdPulse } from "react-icons/io"
import { Link } from "react-router"

const Navbar = () => {
  return (
    <header className={`bg-black text-white flex items-center justify-between p-4 lg:px-24 border-b-2 border-gray-500`}>
      <div className="flex gap-2 items-center">
        <IoMdPulse className="text-2xl" />
        <h1 className="font-bold text-2xl">Shist</h1>
      </div>
      <div className="flex gap-2">
        <Link className={`bg-black border-2 font-medium border-gray-600 py-2 px-4 rounded-lg`} to='/login' >Log in</Link>
        <Link className="bg-white text-gray-900 font-medium border-2 border-gray-600 py-2 px-4 rounded-lg" to='/signup' >Sign up</Link>
        <Link className='bg-white text-black text-center font-medium px-4 py-2  rounded-lg' to='feedback'>Feedback</Link>
      </div>
    </header>
  )
}

export default Navbar
