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


const Dashboard = () => {
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const weight = useSelector(state => state.weight)
  const water = useSelector(state => state.water)
  const goals = useSelector(state => state.goals)
  const user = useSelector(state => state.user.user)
  const food = useSelector(state => state.food)
  
  const [showAddGlass, setShowAddGlass] = useState(false)
  const [glasses, setGlasses] = useState(1)
  const [weightInput, setWeightInput] = useState('')
  const [showAddWeight, setShowAddWeight] = useState(false)
  
  const COLORS = ['#309898', '#F4631E', '#CB0404'];

  useEffect(() => {
    const getGoals = async() => {
      try {
        dispatch(setGoalsLoading(true))
        const res = await api.get('/goals', {withCredentials: true})
        if(res.data?.length === 0) {
          navigate('/goals/goal-settings')
          notifyWarning('Set your health goals!')
        }else {
          const {weight, water, sleep, steps, calorie} = res.data[0]
          dispatch(setGoals({weight, water, sleep, steps, calorie}))
        }
      } catch (err) {
        console.error(err)
        dispatch(setGoalsError(err.response?.data?.message || "Failed to load goals"))
      } finally {
        dispatch(setGoalsLoading(false))
      }
    }
    getGoals()
  }, [dispatch, navigate])


  useEffect(() => {
    const fetchDashboardData = async () => {
      dispatch(setWeightLoading(true))
      dispatch(setWaterLoading(true))
      dispatch(setFoodLoading(true))
  
      try {
        
        const [wCurrent, wPast7, wToday, fCalories, fMacros, fRecent] = 
        await Promise.allSettled([
          api.get('/weight', {withCredentials: true}),
          api.get('/weight/past-7', {withCredentials: true}),
          api.get('/water/today', {withCredentials: true}),
          api.get('/food/calories', {withCredentials: true}),
          api.get('/food/macros', {withCredentials: true}),
          api.get('/food/recent-meals', {withCredentials: true})
        ])
        dispatch(setCurrentWeight(wCurrent.value?.data))
        dispatch(setPast7DaysWeight(wPast7.value?.data))
        dispatch(setTodayWater(wToday.value?.data))
        dispatch(setTodayCalories(fCalories.value?.data))
        dispatch(setTodayMacros(fMacros.value?.data))
        dispatch(setRecentMeals(fRecent.value?.data?.recentMeals))

      } catch (err) {
        console.log(err, "Here")
        const message = err.response?.data?.message || err.message || "Failed to fetch dashboard data"
        notifyError(message)
      }finally {
        dispatch(setWeightLoading(false))
        dispatch(setWaterLoading(false))
        dispatch(setFoodLoading(false))
      }
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
  const handleAddWeightClick = async() => {
    try {
      const res = await api.post('/weight', {weight: weightInput}, {withCredentials: true})
      dispatch(setCurrentWeight(res.data?.entry))
      notifySuccess("Weight logged successfully!")
      setWeightInput('')
      const resPast7 = await api.get('/weight/past-7', {withCredentials: true})
      dispatch(setPast7DaysWeight(resPast7.data))
    }catch(err) {
      console.log(err)
      notifyError(err.response?.data?.message || err.response?.data?.error)
    }
    setShowAddWeight(false)
  }

  const renderLoading = (text) => (
    <p className="text-gray-400 text-sm italic">{text}...</p>
  )

  const renderNoData = (text) => (
    <p className="text-gray-400 text-sm italic text-center pt-32 font-bold">{text}</p>
  )

   const macroData = food.todayMacros ? [
        { name: "Fats", amount: food.todayMacros?.totals?.fats || 0 },
        { name: "Carbs", amount: food.todayMacros?.totals?.carbs || 0 },
        { name: "Proteins", amount: food.todayMacros?.totals?.protein || 0 },
    ] : []

    const weightData = weight.past7Days?.length ? weight.past7Days.map((day) => ({
        date: day.date,
        weight: day.weight,
      })) : []


  return (
    <div className="max-w-7xl mx-auto mt-8 text-white px-4">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Container>
          <div className="flex items-center justify-between">
            <p>Today's Calories</p>
            <LuApple className="font-bold text-2xl mr-4" />
          </div>
          {food.loading ? (
            renderLoading('Loading calories')
          ) : (
            <>
              <h2 className="text-2xl font-extrabold mt-4">{food.todayCalories?.totalCalories || 0}Kcal</h2>
              {goals.data?.calorie && food.todayCalories?.totalCalories ? (
                <p className="text-gray-400 text-sm">
                  {goals.data?.calorie > food.todayCalories?.totalCalories ? `${goals.data?.calorie - food.todayCalories?.totalCalories} to goal` : `${food.todayCalories?.totalCalories - goals.data?.calorie} excess calories`}
                </p>) : null}
              {food.todayCalories?.totalCalories ? 
                <ProgressBar progress={Math.min(100, (food.todayCalories?.totalCalories / goals.data?.calorie) * 100)} /> 
                : (<button className="px-4 py-2 bg-white text-black font-bold z-0 rounded-md cursor-pointer mt-4" onClick={() => navigate('/dashboard/foodlog')} >Add Food</button>
              )}
            </>
          )}
        </Container>
        <Container>
          <div className="flex items-center justify-between">
            <p>Water Intake</p>
            <LuDroplets className="font-bold text-2xl mr-4" />
          </div>
          {water.loading ? (
            renderLoading('Loading water data')
          ) : (
            <>
              <h2 className="text-2xl font-extrabold mt-4">{water.today?.glasses || 0}</h2>
              <p className="text-gray-400 text-sm">
                 glasses{" "}
                 {goals.data?.water && water.today?.glasses
                   ? `(${Math.abs(goals.data.water - water.today.glasses)} ${
                       goals.data.water > water.today.glasses
                         ? "to goal"
                         : "over goal"
                     })`
                   : ""}
               </p>
            </>
          )}
          
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
            </div>
            ) : (
            <button 
              className="px-4 py-2 bg-white text-black font-bold z-0 rounded-md cursor-pointer mt-4"
              onClick={() => setShowAddGlass(true)}>
                Add +
            </button>)}
        </Container>
        <Container>
          <div className="flex items-center justify-between">
            <p>Weight</p>
            <GoGoal className="font-bold text-2xl mr-4" />
          </div>
          {weight.loading ? (
            renderLoading('Loading weight data')
          ) : (
            <>
              <h2 className="text-2xl font-extrabold mt-4">
                 {weight.error && weight.error.includes("404")
                   ? "Start adding weight"
                   : weight.current?.weight || '--'} Kg
               </h2>
               {goals.data?.weight && weight.current?.weight ? (
                 <p className="text-gray-400 text-sm">
                   {(goals.data.weight - weight.current.weight).toFixed(1)} Kg to goal
                 </p>
               ) : null}
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
                  </div>
                  ) : (
                  <button 
                    className="px-4 py-2 bg-white text-black font-bold z-0 rounded-md cursor-pointer mt-4"
                    onClick={() => setShowAddWeight(true)}>Add +</button>
                )}
            </>
          )}
        </Container>
        <Container>
          <div className="flex items-center justify-between">
            <p>Streak</p>
            <LuCalendarDays className="font-bold text-2xl mr-4" />
          </div>
          <h2 className="text-2xl font-extrabold mt-4">{user?.streak || 0}</h2>
          <p className="text-gray-400 text-sm">Days of Logging Food</p>
          {user?.streak >= 10 ? (
            <div className="px-3 py-1 bg-gray-700 rounded-2xl mt-2 inline-block font-medium">
              🔥 Hot Streak! 
            </div>
            ) : user?.streak > 0 ? 
            <div className="px-3 py-1 bg-gray-700 rounded-2xl mt-2 inline-block font-medium">
              🔥 Let's Go! 
            </div> : <div className="px-3 py-1 bg-gray-700 rounded-2xl mt-2 inline-block font-medium">
              Start your Streak! 
            </div>}
        </Container>
      </div>
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <Container> 
          <h2 className="text-2xl font-extrabold">Weight Progress</h2>
          <p className="text-gray-400 text-sm">Your Weight Over the Past seven days</p>           
          <div style={{width: "100%", height: '300px'}} className="mb-6">
            {weightData.length ?
              (<ResponsiveContainer>
                <LineChart data={weightData}>
                  <CartesianGrid strokeDasharray="3 5" />
                  <XAxis dataKey="date" stroke="#ffffff"  />
                  <YAxis
                      stroke="#ffffff" 
                      domain={['dataMin - 15', 'dataMax + 15']} />
                  <Tooltip />
                  <Legend />
                  {goals.data?.weight && 
                  <ReferenceLine 
                    y={goals.data.weight} 
                    label={{
                      value: `Target weight (${goals.data.weight}Kg)`,
                      position: 'bottom',
                      fontSize: 12,
                      fontWeight: 'bold'
                    }}
                    stroke="#82ca9d" />
                  }
                  <Line type="monotone" stroke="#8884d8" dataKey="weight" />
                </LineChart>
                <p className="text-center">(Kg)</p>
              </ResponsiveContainer>
              ) : (
                renderNoData("No weight data available")
            )}
          </div>
        </Container>
        <Container>
          <h2 className="text-2xl font-extrabold">Macroneutrient Breakdown</h2>
          <p className="text-gray-400 text-sm">Today's Macro Distribution</p>
          <div style={{width: "100%", height: '300px'}} className="mb-6 mt-0">
            {macroData.length ? 
              (<ResponsiveContainer>
                <PieChart>
                  <Pie
                    dataKey="amount"
                    data={macroData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={100}
                    label
                  >
                    {macroData.map((_, i) => (
                      <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
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
              ) : (
                renderNoData('No macros logged today.')
            )}
          </div>
        </Container>
      </div>
      <div className="mt-6">
        <Container>
          <h2 className="text-2xl font-extrabold">Recent Meals</h2>
          {food.loading ? (
            renderLoading("Loading meals.")
          ) : food?.recentMeals?.length ? (
            <div className="grid gap-4 mt-4">
              {food?.recentMeals?.map(meal => (
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
          ) : (
            <div className="flex flex-col gap-4 items-center justify-center">
              <p>No foods to display, log food to view recent meals.</p>
              <button
                 className="px-4 py-2 bg-white text-black font-bold rounded-md"
                 onClick={() => navigate("/dashboard/foodlog")}
              >
                Log Meals
              </button>
            </div>
           )}
        </Container>
      </div>
    </div>
  )
}

export default Dashboard
