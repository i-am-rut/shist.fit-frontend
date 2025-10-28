import Container from "../components/Container"
import { LuApple, LuCalendarDays, LuDroplets } from "react-icons/lu"
import ProgressBar from "../components/ProgressBar"
import { GoGoal } from "react-icons/go"
import { BsGraphUpArrow } from "react-icons/bs"
import { CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useDispatch, useSelector } from "react-redux"
import { setCurrentWeight, setPast7DaysWeight, setWeightError, setWeightLoading } from "../utils/slices/weightSlice"
import { setPast7DaysWater, setTodayWater, setWaterError, setWaterLoading } from "../utils/slices/waterSlice"
import { setGoals, setGoalsError, setGoalsLoading } from "../utils/slices/goalsSlice"
import api from "../utils/api"
import { useEffect, useState } from "react"
import { notifyError, notifySuccess, notifyWarning } from "../utils/toasts"
import { useNavigate } from "react-router"
import { setFoodError, setFoodLoading, setRecentMeals, setTodayCalories, setTodayMacros } from "../utils/slices/foodSlice"

const data = [
  {
    date: 'Mon',
    weight: 71.45,
  },
  {
    date: 'Tue',
    weight: 71.4,
  },
  {
    date: 'Wed',
    weight: 71.35,
  },
  {
    date: 'Thu',
    weight: 71.3,
  },
  {
    date: 'Fri',
    weight: 71.25,
  },
  {
    date: 'Sat',
    weight: 71.2,
  },
  {
    date: 'Sun',
    weight: 71.15,
  },
]

const macroData = [
  {name: 'Fats', amount: 10},
  {name: 'Carbs', amount: 10},
  {name: 'Proteins', amount: 10}
]

const COLORS = ['#309898', '#F4631E', '#CB0404'];


const Dashboard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const weight = useSelector(state => state.weight)
  const water = useSelector(state => state.water)
  const goals = useSelector(state => state.goals)
  const user = useSelector(state => state.user.user)
  const food = useSelector(state => state.food)

  const getGoals = async() => {
    try {
      const res = await api.get('/goals', {}, {withCredentials:true})
      if(res.data?.length === 0) {
        navigate('/goals/goal-settings')
        notifyWarning('Set your health goals!')
      }
      const {weight, water, sleep, steps, calorie} = res.data[0]
      dispatch(setGoals({weight, water, sleep, steps, calorie}))
    } catch (err) {
      console.error(err)
    }
  }

  if(!goals.data) {
    getGoals()
  }

  const [showAddGlass, setShowAddGlass] = useState(false)
  const [glasses, setGlasses] = useState(1)
  const [weightInput, setWeightInput] = useState(0)
  const [showAddWeight, setShowAddWeight] = useState(false)




  
  useEffect(() => {
    const fetchDashboardData = async () => {
      dispatch(setWeightLoading(true))
      dispatch(setWaterLoading(true))
      dispatch(setFoodLoading(true))
  
      const results = await Promise.allSettled([
        api.get('/weight'),
        api.get('/weight/past-7'),
        api.get('/water/today'),
        api.get('/food/calories'),
        api.get('/food/macros'),
        api.get('/food/recent-meals')
      ])
  
      results.forEach((res, i) => {
        if(res.status === 'fulfilled') {
          const data = res.value.data
  
          switch(i) {
            case 0: 
              dispatch(setCurrentWeight(data))
              break;
            case 1:
              dispatch(setPast7DaysWeight(data))
              break;
            case 2:
              dispatch(setTodayWater(data))
              break;
            case 3:
              dispatch(setTodayCalories(data))
              break;
            case 4: 
              dispatch(setTodayMacros(data))
              break;
            case 5:
              dispatch(setRecentMeals(data.recentMeals))
            default:
              break;
          }
        } else {
          const errorMsg = res.reason?.message || 'Failed to load data'
          switch (i) {
            case 0:
            case 1:
              dispatch(setWeightError(errorMsg))
              break;
            case 2:
              dispatch(setWaterError(errorMsg))
              break;
            case 3:
            case 4:
            case 5:
              dispatch(setFoodError(errorMsg))
              break;
            default:
              break;
          }
        }
      })
      dispatch(setWeightLoading(false))
      dispatch(setWaterLoading(false))
      dispatch(setFoodLoading(false))
    }
    fetchDashboardData()
  }, [dispatch])

  const handleAddGlassesClick = async() => {
    try {
      const res = await api.post('/water', {glasses}, {withCredentials:true})
      dispatch(setTodayWater(res.data?.entry))
      notifySuccess('Water glasses added successfully!')
      setGlasses(1)
    } catch (err) {
      notifyError(err.response?.data?.message || err.response?.data?.error, '')
    }
    setShowAddGlass(false)
  }
  const handleAddWeightClick = () => {
    try {
      const res = api.post('/weight', {weight: weightInput}, {withCredentials: true})
      dispatch(setCurrentWeight(res.data?.entry))
      notifySuccess("Weight logged successfully!")
    }catch(err) {
      console.log(err)
      notifyError(err.response?.data?.message || err.response?.data?.error)
    }
    setShowAddWeight(false)
  }

  return (
    <div className="max-w-7xl mx-auto mt-8 text-white px-4">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Container>
          <div className="flex items-center justify-between">
            <p className="">Today's Calories</p>
            <LuApple className="font-bold text-2xl mr-4" />
          </div>
          <h2 className="text-2xl font-extrabold mt-4">{food.todayCalories?.totalCalories || 0}</h2>
          {goals.data?.calorie && food.todayCalories?.totalCalories ? <p className="text-gray-400 text-sm">{goals.data?.calorie > food.todayCalories?.totalCalories ? `${goals.data?.calorie - food.todayCalories?.totalCalories} to goal` : `${food.todayCalories?.totalCalories - goals.data?.calorie} excess calories`}</p>:null}
          {(food.todayCalories?.totalCalories === 0 || !food.todayCalories) ? <button className="px-4 py-2 bg-white text-black font-bold z-0 rounded-md cursor-pointer mt-4" onClick={() => navigate('/dashboard/foodlog')} >Add Food</button> : <ProgressBar progress={Math.floor((food.todayCalories?.totalCalories / goals.data?.calorie) * 100) > 100 ? 100 : Math.floor((food.todayCalories?.totalCalories / goals.data?.calorie) * 100)} />}
        </Container>
        <Container>
          <div className="flex items-center justify-between">
            <p>Water Intake</p>
            <LuDroplets className="font-bold text-2xl mr-4" />
          </div>
          <h2 className="text-2xl font-extrabold mt-4">{water.today?.glasses ? water.today.glasses : 0}</h2>
          <p className="text-gray-400 text-sm">glasses {goals.data?.water && water.today?.glasses ? <span>{goals.data?.water - water.today?.glasses > 0 ? `(${goals.data?.water - water.today?.glasses} to goal)` : `(${water.today?.glasses - goals.data?.water} more than goal)`}</span> : null}</p>
          {showAddGlass ? 
            (<div className="flex gap-x-4 items-center mt-4">
            <button 
              disabled={glasses < 1}
              onClick={() => setGlasses(prev => prev - 1)}
              className="px-4 py-2 bg-gray-600 text-black font-bold z-0 rounded-md cursor-pointer">-</button>
            <p className="px-4 py-2 bg-white text-black rounded-xs">{glasses}</p>
            <button 
              onClick={() => setGlasses(prev => prev + 1)}
              className="px-4 py-2 bg-gray-600 text-black font-bold z-0 rounded-md cursor-pointer">+</button>
            <button 
              className="px-4 py-2 bg-white text-black font-bold z-0 rounded-md cursor-pointer"
              onClick={handleAddGlassesClick}>Add</button>
          </div>) : (<button 
              className="px-4 py-2 bg-white text-black font-bold z-0 rounded-md cursor-pointer mt-4"
              onClick={() => setShowAddGlass(true)}>Add +</button>)}
        </Container>
        <Container>
          <div className="flex items-center justify-between">
            <p>Weight</p>
            <GoGoal className="font-bold text-2xl mr-4" />
          </div>
          <h2 className="text-2xl font-extrabold mt-4">{weight.error && weight.error.split(' ').includes('404') ? '- -' : weight.current?.weight}</h2>
          <p className="text-gray-400 text-sm">- 0.4 Kg This Week</p>
          {/* <div className="text-green-600 flex font-medium items-center gap-2 mt-2"><BsGraphUpArrow /> On Track</div> */}
          {showAddWeight? (
            <div className="flex gap-4 mt-4">
              <input 
                className="px-4 py-2 border border-gray-400 rounded-sm"
                value={weightInput} 
                onChange={e => setWeightInput(e.target.value)} 
                type="number" 
                min={5} 
                max={350} 
                placeholder="Enter weight" />
              <button 
                className="px-4 py-2 bg-white text-black font-bold z-0 rounded-md cursor-pointer"
                onClick={handleAddWeightClick}
              >Add</button>
            </div>) : <button 
              className="px-4 py-2 bg-white text-black font-bold z-0 rounded-md cursor-pointer mt-4"
              onClick={() => setShowAddWeight(true)}>Add +</button>
          }
        </Container>
        <Container>
          <div className="flex items-center justify-between">
            <p>Streak</p>
            <LuCalendarDays className="font-bold text-2xl mr-4" />
          </div>
          <h2 className="text-2xl font-extrabold mt-4">{user.streak? user.streak : 0}</h2>
          <p className="text-gray-400 text-sm">Days of Logging Food</p>
          {user.streak && user.streak >= 10 ? <div className="px-3 py-1 bg-gray-700 rounded-2xl mt-2 inline-block font-medium">🔥 Hot Streak! </div> : user.streak === 0 ? <div className="px-3 py-1 bg-gray-700 rounded-2xl mt-2 inline-block font-medium">Start your Streak! </div>: user.streak > 0 && user.streak < 10? <div className="px-3 py-1 bg-gray-700 rounded-2xl mt-2 inline-block font-medium">🔥 Let's Go! </div>: null}
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
                <XAxis dataKey="date" stroke="#ffffff"  />
                <YAxis
                    stroke="#ffffff" 
                    domain={['dataMin - 15', 'dataMax + 15']} />
                <Tooltip className='rounded-lg bg-black text-white' />
                <Legend />
                <ReferenceLine 
                  y={goals.data?.weight} 
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
            {food.recentMeals.length === 0 ? (<div className="flex flex-col gap-4 items-center justify-center">
                <h2>No foods to display, log food to view recent meals</h2>
                <button 
                  className="px-4 py-2 bg-white text-black font-bold rounded-md cursor-pointer"
                  onClick={() => navigate('/foodlog')}>Log meals</button>
                </div>) : food.recentMeals.map(meal => (
                  <Container key={meal._id}>
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-xl">{meal.mealType}</h3>
                      <h3 className="font-bold text-xl">{meal.calories} cal</h3>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-gray-400 text-sm">{meal.food}</p>
                      <p className="text-gray-400 text-sm">{meal.time}</p>
                    </div>
                  </Container>
                ))}
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Dashboard
