import { FaHeartPulse } from "react-icons/fa6"
import ProgressBar from "../components/ProgressBar"
import Container from "../components/Container"
import { FaBalanceScale } from "react-icons/fa"
import { GiNightSleep } from "react-icons/gi"
import { IoFootstepsSharp } from "react-icons/io5"
import { NavLink, Outlet } from "react-router"

const HealthMetrics = () => {
  return (
    <div className="my-8 max-w-6xl mx-auto text-white">
      <div>
        <h2 className="font-bold text-2xl">Health Metrics</h2>
        <p className="text-gray-400">Track Your Health and Wellness Data</p>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Container>
          <div className="flex justify-between items-center">
            <h3 className=" font-normal">Current Weight</h3>
            <FaBalanceScale className="text-2xl mr-4" />
          </div>
          <div className="flex flex-col gap-2 items-start pt-2">
            <h2 className="text-3xl font-bold">71.4 Kg</h2>
            <p className="text-xs text-gray-400">-0 Kg from start</p>
            <button className="px-3 py-2 font-semibold bg-black text-white rounded-lg">+ Log Weight</button>
          </div>
        </Container>
        <Container>
          <div className="flex justify-between items-center">
            <h3 className=" font-normal">Heart Rate</h3>
            <FaHeartPulse className="text-2xl mr-4" />
          </div>
          <div className="flex flex-col gap-2 items-start pt-2">
            <h2 className="text-3xl font-bold">72 BPM</h2>
            <p className="text-xs text-gray-400">Resting Heart Rate</p>
            <p className="px-3 py-2 font-semibold bg-white text-black rounded-xl">Excellent</p>
          </div>
        </Container>
        <Container>
          <div className="flex justify-between items-center">
            <h3 className=" font-normal">Sleep</h3>
            <GiNightSleep className="text-2xl mr-4" />
          </div>
          <div className="flex flex-col gap-2 items-start pt-2">
            <h2 className="text-3xl font-bold">7 h</h2>
            <p className="text-xs text-gray-400">Last Night (Out of 8 h)</p>
            <ProgressBar progress={87} />
          </div>
        </Container>
        <Container>
          <div className="flex justify-between items-center">
            <h3 className=" font-normal">Steps</h3>
            <IoFootstepsSharp className="text-2xl mr-4" />
          </div>
          <div className="flex flex-col gap-2 items-start pt-2">
            <h2 className="text-3xl font-bold">8547</h2>
            <p className="text-xs text-gray-400">1453 to Goal</p>
            <ProgressBar progress={87} />
          </div>
        </Container>
      </div>
      <div className="mt-6 w-full grid grid-cols-4 text-center bg-black rounded-lg px-2 py-2 border border-gray-400">
        <NavLink className={({ isActive }) => `rounded-lg py-1 ${isActive ? "bg-[#18181c] border border-gray-400 font-medium" : ""}`} to='.' end >Weight</NavLink>
        <NavLink className={({ isActive }) => `rounded-lg py-1 ${isActive ? "bg-[#18181c] border border-gray-400 font-medium" : ""}`} to='sleep' >Sleep</NavLink>
        <NavLink className={({ isActive }) => `rounded-lg py-1 ${isActive ? "bg-[#18181c] border border-gray-400 font-medium" : ""}`} to='hydration' >Hydration</NavLink>
        <NavLink className={({ isActive }) => `rounded-lg py-1 ${isActive ? "bg-[#18181c] border border-gray-400 font-medium" : ""}`} to='activity' >Activity</NavLink>
      </div>
      <Outlet />
    </div>
  )
}

export default HealthMetrics
