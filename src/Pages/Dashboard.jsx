import Container from "../components/Container"
import { LuApple, LuCalendarDays, LuDroplets } from "react-icons/lu"
import ProgressBar from "../components/ProgressBar"
import { GoGoal } from "react-icons/go"
import { BsGraphUpArrow } from "react-icons/bs"
import { CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    day: 'Mon',
    weight: 71.45,
  },
  {
    day: 'Tue',
    weight: 71.4,
  },
  {
    day: 'Wed',
    weight: 71.35,
  },
  {
    day: 'Thu',
    weight: 71.3,
  },
  {
    day: 'Fri',
    weight: 71.25,
  },
  {
    day: 'Sat',
    weight: 71.2,
  },
  {
    day: 'Sun',
    weight: 71.15,
  },
]

const macroData = [
  {name: 'Fats', amount: 30},
  {name: 'Carbs', amount: 45},
  {name: 'Proteins', amount: 25}
]

const COLORS = ['#309898', '#F4631E', '#CB0404'];


const Dashboard = () => {
  return (
    <div className="max-w-6xl mx-auto mt-8 text-white px-4">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Container>
          <div className="flex items-center justify-between">
            <p className="">Today's Calories</p>
            <LuApple className="font-bold text-2xl mr-4" />
          </div>
          <h2 className="text-2xl font-extrabold mt-4">1847</h2>
          <p className="text-gray-400 text-sm">353 remaining</p>
          <ProgressBar progress={87} />
        </Container>
        <Container>
          <div className="flex items-center justify-between">
            <p>Water Intake</p>
            <LuDroplets className="font-bold text-2xl mr-4" />
          </div>
          <h2 className="text-2xl font-extrabold mt-4">7</h2>
          <p className="text-gray-400 text-sm">glasses (1 to go)</p>
          <ProgressBar progress={87} />
        </Container>
        <Container>
          <div className="flex items-center justify-between">
            <p>Weight Goal</p>
            <GoGoal className="font-bold text-2xl mr-4" />
          </div>
          <h2 className="text-2xl font-extrabold mt-4">71.1</h2>
          <p className="text-gray-400 text-sm">- 0.4 Kg This Week</p>
          <div className="text-green-600 flex font-medium items-center gap-2 mt-2"><BsGraphUpArrow /> On Track</div>
        </Container>
        <Container>
          <div className="flex items-center justify-between">
            <p>Streak</p>
            <LuCalendarDays className="font-bold text-2xl mr-4" />
          </div>
          <h2 className="text-2xl font-extrabold mt-4">12</h2>
          <p className="text-gray-400 text-sm">Days of Logging Food</p>
          <div className="px-3 py-1 bg-gray-700 rounded-2xl mt-2 inline-block font-medium">🔥 Hot Streak! </div>
        </Container>
      </div>
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <Container> 
          <h2 className="text-2xl font-extrabold">Weight Progress</h2>
          <p className="text-gray-400 text-sm">Your Weight Over the Past Week</p>           
          <div style={{width: "100%", height: 300}} className="my-6">
            <ResponsiveContainer>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 5" />
                <XAxis dataKey="day" />
                <YAxis domain={['dataMin - 15', 'dataMax + 15']} />
                <Tooltip className='rounded-lg bg-black text-white' />
                <Legend />
                <ReferenceLine 
                  y={62} 
                  label={{
                    value: 'Target Weight (62 Kg)',
                    position: 'bottom',
                    fill: '#82ca9d',
                    fontSize: 12,
                    fontWeight: 'bold'
                  }}
                  stroke="#82ca9d" />
                <Line type="monotone" stroke="#8884d8" dataKey="weight" />
              </LineChart>
              <p className="text-center">(Kg)</p>
            </ResponsiveContainer>
          </div>
        </Container>
        <Container>
          <h2 className="text-2xl font-extrabold">Macroneutrient Breakdown</h2>
          <p className="text-gray-400 text-sm">Today's Macro Distribution</p>
          <div style={{width: "100%", height: 300}} className="mb-6 mt-0">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  dataKey="amount"
                  data={macroData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={100}
                  fill="#82ca9d"
                  label
                >
                  {macroData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
                <div 
                    style={{height: "3rem"}}
                    className=" mt-0 flex gap-4 justify-center items-center">
                        <div style={{backgroundColor: '#F4631E'}} className="h-4 w-4 rounded-2xl"></div>
                        <p>Carbs</p>
                        <div style={{backgroundColor: '#CB0404'}} className="h-4 w-4 rounded-2xl"></div>
                        <p>Proteins</p>
                        <div style={{backgroundColor: '#309898'}} className="h-4 w-4 rounded-2xl"></div>
                        <p>Fats</p>
                </div>
            </ResponsiveContainer>
          </div>
        </Container>
      </div>
      <div className="mt-6">
        <Container>
          <h2 className="text-2xl font-extrabold">Recent Meals</h2>
          <div className="grid gap-4 mt-4">
            <Container>
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-xl">Breakfast</h3>
                <h3 className="font-bold text-xl">420 cal</h3>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-gray-400 text-sm">Oatmeal with berries, Greek yogurt</p>
                <p className="text-gray-400 text-sm">8:30 AM</p>
              </div>
            </Container>
            <Container>
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-xl">Lunch</h3>
                <h3 className="font-bold text-xl">580 cal</h3>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-gray-400 text-sm">Grilled chicken salad, olive oil dressing</p>
                <p className="text-gray-400 text-sm">12:45 PM</p>
              </div>
            </Container>
            <Container>
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-xl">Snack</h3>
                <h3 className="font-bold text-xl">180 cal</h3>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-gray-400 text-sm">Apple with almond butter</p>
                <p className="text-gray-400 text-sm">3:20 PM</p>
              </div>
            </Container>
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Dashboard
