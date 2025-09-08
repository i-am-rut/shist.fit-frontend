import { NavLink, Outlet } from "react-router"

const Goals = () => {
    return (
        <div className="bg-[#18181c] text-white mt-8 px-2 sm:px-8 lg:px-12">
            <div>
                <h1 className="sm:text-lg md:text-2xl lg:text-3xl font-bold self-start">Health Goals</h1>
            </div>
            <div className="px-2 py-2 mt-6 text-gray-400 bg-black w-full grid grid-cols-2 items-center justify-center rounded-lg text-center">
                <NavLink className={({ isActive }) => `${isActive ? 'bg-[#18181c] py-2  rounded-lg font-bold text-white border border-gray-400' : ''} `} to='.' end >Overview</NavLink>
                <NavLink className={({ isActive }) => `${isActive ? 'bg-[#18181c] py-2  rounded-lg font-bold text-white border border-gray-400' : ''} `} to='goal-settings' >Goal Settings</NavLink>
            </div>
            <Outlet />
        </div>
    )
}

export default Goals