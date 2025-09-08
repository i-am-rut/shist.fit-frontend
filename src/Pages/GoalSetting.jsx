import { FaBalanceScale } from "react-icons/fa"
import { FiMoon } from "react-icons/fi"
import { IoFootsteps } from "react-icons/io5"
import { LuApple } from "react-icons/lu"

const GoalSetting = () => {
  return (
    <div className="max-w-7xl mx-auto text-white px-4 mt-6">
      <div className="bg-black p-4 border border-gray-700 rounded-lg">
        <h2 className="text-2xl font-bold">Set Your Health Goals</h2>
        <p className="text-gray-400">Customize your health and fitness targets</p>
        <form className="grid gap-4 sm:grid-cols-2 mt-6 p-4 rounded-lg border border-gray-700"> 
          <div>
            <div className="mt-6">
              <div className="flex gap-4">
                <FaBalanceScale className="text-2xl font-bold" />
                <h3 className="text-xl font-medium">Weight Goal</h3>
              </div>
              <div className="flex flex-col items-start justify-center gap-2 mt-4">
                <label htmlFor="goal-setting-weight">Target Weight (Kg)</label>
                <input className="px-4 py-2 border border-gray-600 block rounded-lg w-full" min={30} max={250} id="goal-setting-weight" type="number" placeholder="70" />
                <p className="text-gray-400 text-sm">Your current weight: 66 Kg</p>
              </div>
            </div>
            <div className="mt-6">
              <div className="flex gap-4">
                <FiMoon className="text-2xl font-bold" />
                <h3 className="text-xl font-medium">Sleep Goal</h3>
              </div>
              <div className="flex flex-col items-start justify-center gap-2 mt-4">
                <label htmlFor="goal-setting-weight">Daily Sleep Target (hours)</label>
                <input className="px-4 py-2 border border-gray-600 block rounded-lg w-full" min={2} max={20} id="goal-setting-weight" type="number" placeholder="7" />
              </div>
            </div>
          </div>
          <div>
            <div className="mt-6">
              <div className="flex gap-4">
                <IoFootsteps className="text-2xl font-bold" />
                <h3 className="text-xl font-medium">Activity Goal</h3>
              </div>
              <div className="flex flex-col items-start justify-center gap-2 mt-4">
                <label htmlFor="goal-setting-weight">Daily Steps Target</label>
                <input className="px-4 py-2 border border-gray-600 block rounded-lg w-full" min={500} max={300000} id="goal-setting-weight" type="number" placeholder="10000" />
              </div>
            </div>
            <div className="mt-6">
              <div className="flex gap-4">
                <LuApple className="text-2xl font-bold" />
                <h3 className="text-xl font-medium">Neutrition Goals</h3>
              </div>
              <div className="flex flex-col items-start justify-center gap-2 mt-4">
                <label htmlFor="goal-setting-weight">Daily Target Calories (Kcal)</label>
                <input className="px-4 py-2 border border-gray-600 block rounded-lg w-full" min={800} max={15000} id="goal-setting-weight" type="number" placeholder="2000" />
              </div>
              <div className="flex flex-col items-start justify-center gap-2 mt-4">
                <label htmlFor="goal-setting-weight">Daily Water Target (glasses)</label>
                <input className="px-4 py-2 border border-gray-600 block rounded-lg w-full" min={4} max={24} id="goal-setting-weight" type="number" placeholder="8" />
                <p className="text-gray-400 text-sm">1 glass = 250ml. 4 glasses = 1 Liter</p>
              </div>
            </div>
          </div>
          <button className="bg-white px-4 py-2 text-black font-medium rounded-lg w-40">Save Goals</button>
        </form>
      </div>
      
    </div>
  )
}

export default GoalSetting
