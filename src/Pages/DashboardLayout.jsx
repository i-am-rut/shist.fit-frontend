import { NavLink, Outlet } from "react-router"


const DashboardLayout = () => {
    return (
        <div className="mt-8">
            <div className="mt-4 mx-4 grid grid-cols-3 justify-between text-center bg-black py-2 px-2 rounded-lg border border-gray-400">
                <NavLink className={({ isActive }) =>
                    `text-gray-400 rounded-lg py-2 ${isActive ? 'bg-[#18181c] text-white font-bold border border-gray-400' : ''}`
                } to='.' >Dashboard</NavLink>
                <NavLink className={({ isActive }) =>
                    `text-gray-400 rounded-lg py-2 ${isActive ? 'bg-[#18181c] text-white font-bold border border-gray-400' : ''}`
                } to='food-logger' >Food Log</NavLink>
                <NavLink className={({ isActive }) =>
                    `text-gray-400 rounded-lg py-2 ${isActive ? 'bg-[#18181c] text-white font-bold border border-gray-400' : ''}`
                } to='health-metrics' >Health Metrics</NavLink>
            </div> 
            <Outlet />   
        </div>
    )
}

export default DashboardLayout