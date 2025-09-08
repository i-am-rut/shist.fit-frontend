import { LuApple, LuDroplets } from "react-icons/lu"
import Container from "../components/Container"
import ProgressBar from "../components/ProgressBar"
import { FaBalanceScale } from "react-icons/fa"
import { FiMoon } from "react-icons/fi"
import { IoFootsteps } from "react-icons/io5"

const GoalsOverview = () => {
  return (
    <div className="max-w-7xl text-white px-4 mx-auto mt-6">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Container>
          <div className="flex items-center justify-between">
            <p className="">Weight Goal</p>
            <FaBalanceScale className="text-2xl mr-4 text-gray-400" />
          </div>
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-extrabold ">66.2</h2>
            <p className="pr-3 font-medium">62</p>
          </div>
          <p className="text-gray-400 text-sm">4.2 Kg remaining</p>
          <ProgressBar progress={71}  />
          <div className="flex items-center justify-between text-sm mt-2 text-gray-400">
            <p>Current</p>
            <p>Goal</p>
          </div>
        </Container>
        <Container>
          <div className="flex items-center justify-between">
            <p className="">Calorie Goal</p>
            <LuApple className="font-bold text-2xl mr-4 text-gray-400" />
          </div>
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-extrabold ">1847</h2>
            <p className="pr-3 font-medium">2000</p>
          </div>
          <p className="text-gray-400 text-sm">353 remaining</p>
          <ProgressBar progress={87}  />
          <div className="flex items-center justify-between text-sm mt-2 text-gray-400">
            <p>Consumed</p>
            <p>Daily goal</p>
          </div>
        </Container>
        <Container>
          <div className="flex items-center justify-between">
            <p className="">Water Intake</p>
            <LuDroplets className="font-bold text-2xl mr-4 text-gray-400" />
          </div>
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-extrabold ">6.5</h2>
            <p className="pr-3 font-medium">8</p>
          </div>
          <p className="text-gray-400 text-sm">1.5 remaining</p>
          <ProgressBar progress={87}  />
          <div className="flex items-center justify-between text-sm mt-2 text-gray-400">
            <p>Consumed</p>
            <p>Daily goal</p>
          </div>
        </Container>
        <Container>
          <div className="flex items-center justify-between">
            <p className="">Sleep</p>
            <FiMoon className="font-bold text-2xl mr-4 text-gray-400" />
          </div>
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-extrabold ">8.0h</h2>
            <p className="pr-3 font-medium">8h</p>
          </div>
          <p className="text-gray-400 text-sm">0h remaining</p>
          <ProgressBar progress={100}  />
          <div className="flex items-center justify-between text-sm mt-2 text-gray-400">
            <p>Last Night</p>
            <p>Goal</p>
          </div>
        </Container>
        <Container>
          <div className="flex items-center justify-between">
            <p className="">Steps</p>
            <IoFootsteps className="font-bold text-2xl mr-4 text-gray-400" />
          </div>
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-extrabold ">8547</h2>
            <p className="pr-3 font-medium">10000</p>
          </div>
          <p className="text-gray-400 text-sm">1453 remaining</p>
          <ProgressBar progress={85}  />
          <div className="flex items-center justify-between text-sm mt-2 text-gray-400">
            <p>Today</p>
            <p>Daily goal</p>
          </div>
        </Container>
      </div>
      <div className="mt-6 bg-black p-4 border border-gray-400 rounded-lg">
        <h2 className="text-xl sm:text-2xl font-bold">Goal Progress</h2>
        <p className="text-gray-400">Your progress towards your health goals</p>
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Weight Loss</h3>
            <p>60%</p>
          </div>
          <ProgressBar progress={60} />
          <div className="flex items-center justify-between text-gray-400 text-sm mt-2">
            <p>Starting: 73</p>
            <p>Current: 66.2</p>
            <p>Goal: 62</p>
          </div>
        </div>
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Daily Calorie Target</h3>
            <p>84%</p>
          </div>
          <ProgressBar progress={84} />
          <div className="flex items-center justify-between text-gray-400 text-sm mt-2">
            <p>Consumed: 1847</p>
            <p>Goal: 2000</p>
          </div>
        </div>
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Water Intake</h3>
            <p>81%</p>
          </div>
          <ProgressBar progress={81} />
          <div className="flex items-center justify-between text-gray-400 text-sm mt-2">
            <p>Consumed: 6.5 glasses</p>
            <p>Goal: 8 glasses</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GoalsOverview
