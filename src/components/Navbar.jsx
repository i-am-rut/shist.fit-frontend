import { useEffect, useRef, useState } from "react"
import { CgProfile } from "react-icons/cg"
import { IoMdPulse } from "react-icons/io"
import { MdClose, MdFeedback, MdMenu } from "react-icons/md"
import { PiGearBold } from "react-icons/pi"
import { TbLogout } from "react-icons/tb"
import { Link, NavLink } from "react-router"

const Navbar = () => {
  const user = true
  const [showMenu, setShowMenu] = useState(false)
  const [showDrawer, setShowDrawer] = useState(false)
  const profileMenuRef = useRef(null)
  const drawerRef = useRef(null)

  useEffect(() => {
  const handleClickOutside = (e) => {
    if (profileMenuRef.current && !profileMenuRef.current.contains(e.target)) {
      setShowMenu(false)
    }
    if (drawerRef.current && !drawerRef.current.contains(e.target)) {
      setShowDrawer(false)
    }
  }

  document.addEventListener('mousedown', handleClickOutside)

  return () => {
    document.removeEventListener('mousedown', handleClickOutside)
  }
}, [])


  return (
    <header className={`bg-black text-white flex items-center justify-between p-4 lg:px-24 border-b-2 border-gray-500`}>
      <div className="flex gap-2 items-center">
        <IoMdPulse className="text-2xl" />
        <h1 className="font-bold text-2xl">Shist</h1>
      </div>
      {user ? <div className="hidden sm:flex gap-4 text-gray-400">
        <NavLink className={({ isActive }) => `${isActive ? ' text-white font-bold' : ''}`} to='/dashboard'>Dashboard</NavLink>
        <NavLink className={({ isActive }) => `${isActive ? ' text-white font-bold' : ''}`} to='/goals'>Goals</NavLink>
        <NavLink className={({ isActive }) => `${isActive ? ' text-white font-bold' : ''}`} to='/profile'>Profile</NavLink>
      </div> : <div className="flex gap-2">
        <Link className={`bg-black border-2 font-medium border-gray-600 py-2 px-4 rounded-lg`} to='/login' >Log in</Link>
        <Link className="bg-white text-gray-900 font-medium border-2 border-gray-600 py-2 px-4 rounded-lg" to='/signup' >Sign up</Link>
      </div>}
      
      <div className="flex gap-5">
        <div className="sm:hidden flex items-center gap-4">
          <MdMenu onClick={() => setShowDrawer(true)} className="text-4xl py-0.5 px-1 cursor-pointer  border-3 border-white  rounded-md" />
        </div>
        <div className="relative" ref={profileMenuRef}>
          <CgProfile onClick={() => setShowMenu(prev => !prev)} className="text-white font-medium text-4xl cursor-pointer" />
          {showMenu? <div className="max-w-2xs min-w-52 absolute top-10 right-0 p-4 border-2 border-gray-600 rounded-lg bg-black">
            <Link to='/profile' onClick={() => setShowMenu(false)} className="py-2">
              <p className="font-bold">John</p>
              <p className="text-sm text-gray-400">name@example.com{'itha ... lawaw lagal'}</p>
            </Link>
            <hr className="mt-2 text-gray-600" />
            <div className="flex flex-col justify-center gap-2 py-4 border-b-2 border-gray-600">
              <Link to='/settings' onClick={() => setShowMenu(false)} className="flex gap-2 items-center">
                <PiGearBold className="font-bold text-xl" />
                <p className="font-medium">Settings</p>
              </Link>
              <Link to='/feedback' onClick={() => setShowMenu(false)} className="flex gap-2 items-center">
                <MdFeedback className="font-bold text-xl" />
                <p className="font-medium">Feedback</p>
              </Link>
            </div>
            <div className="py-2">
              <button className="flex gap-2 font-bold items-center cursor-pointer"><TbLogout className="text-xl" /> Logout</button>
            </div>
          </div> : null}
        </div>
        {showDrawer && (
          <div className="fixed text-white top-0 bottom-0 left-24 right-0 z-40 flex sm:hidden bg-black opacity-90">
            <div className="w-60 bg-black p-6 h-full transform transition-transform duration-1000 ease-in-out" ref={drawerRef}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Menu</h2>
                <MdClose className="text-2xl cursor-pointer" onClick={() => setShowDrawer(false)} />
              </div>
              <nav className="flex flex-col gap-4 text-gray-300">
                <NavLink to="/dashboard" onClick={() => setShowDrawer(false)} className={({ isActive }) => isActive ? 'text-white font-bold' : ''}>Dashboard</NavLink>
                <NavLink to="/goals" onClick={() => setShowDrawer(false)} className={({ isActive }) => isActive ? 'text-white font-bold' : ''}>Goals</NavLink>
                <NavLink to="/profile" onClick={() => setShowDrawer(false)} className={({ isActive }) => isActive ? 'text-white font-bold' : ''}>Profile</NavLink>
              </nav>
            </div>
            <div className="flex-1" onClick={() => setShowDrawer(false)}></div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar
