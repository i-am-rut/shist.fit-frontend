import { CiForkAndKnife } from 'react-icons/ci'
import { FaBalanceScale } from 'react-icons/fa'
import { FaRegHeart } from 'react-icons/fa6'
import { FiBarChart2 } from 'react-icons/fi'
import { GoGoal, GoGraph } from 'react-icons/go'
import { LuApple } from 'react-icons/lu'
import { useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router'

const HomePage = () => {
  const user = useSelector(state => state.user.user)
  if(user) {
    return <Navigate to='/dashboard' /> 
  }
  
  return (
    <div>
      <div className='bg-black text-white flex flex-col justify-center items-center gap-4 py-16 px-4'>
        <h1 className='text-3xl md:text-5xl lg:text-6xl font-bold text-center'>Track Your Health Journey</h1>
        <p className='text-gray-400 max-w-2xl text-center px-2 lg:p-4 md:text-xl lg:text-2xl'>Monitor your neutrition, track your progress, and achieve your health goals with our comprehensive health tracking platform</p>
        <div className='grid sm:grid-cols-2 gap-2'>
          <Link className='bg-white text-black text-center font-medium px-4 py-2  rounded-lg' to='signup'>Get started</Link>
          <Link className='font-medium px-4 py-2 text-center rounded-lg border-2 border-gray-500' to='login'>Log in</Link>
        </div>
      </div>
      <div className='bg-[#18181a] text-white flex flex-col justify-center items-center py-12 sm:px-8 px-2'>
        <h2 className='lg:text-3xl sm:text-2xl text-xl font-bold pb-8'>Everything You Need to Say Healthy</h2>
        <div className='grid sm:grid-cols-3 gap-4'>
          <div className='bg-black p-4 text-center flex flex-col items-center justify-center gap-4'>
              <LuApple style={{fontWeight: "bolder", fontSize: "72px", backgroundColor: "#18181a", padding: "20px", borderRadius: "50%"}} />
            <h3 className='text-xl font-bold'>Food Tracking</h3>
            <p className='pb-4 text-gray-400'>Log your meals, track calories, and monitor your macronutrient intake with our comprehensive food database.</p>
          </div>
          <div className='bg-black p-4 text-center flex flex-col items-center justify-center gap-4'>
            <FaBalanceScale style={{fontWeight: "bolder", fontSize: "72px", backgroundColor: "#18181a", padding: "20px", borderRadius: "50%"}} />
            <h3 className='text-xl font-bold'>Weight Management</h3>
            <p className='pb-4 text-gray-400'>Log your meals, track calories, and monitor your macronutrient intake with our comprehensive food database.</p>
          </div>
          <div className='bg-black p-4 text-center flex flex-col items-center justify-center gap-4'>
            <GoGoal style={{fontWeight: "bolder", fontSize: "72px", backgroundColor: "#18181a", padding: "20px", borderRadius: "50%"}} />
            <h3 className='text-xl font-bold'>Goal Setting</h3>
            <p className='pb-4 text-gray-400'>Log your meals, track calories, and monitor your macronutrient intake with our comprehensive food database.</p>
          </div>
        </div>
      </div>
      <div className='grid gap-8 grid-cols-1 sm:grid-cols-2 bg-black text-white p-4 px-2 sm:px-8'>
        <div className='flex flex-col items-start justify-center gap-4'>
          <h2 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold'>Comprehensive Dashboard</h2>
          <p className='max-w-xl text-gray-400'>Get a complete overview of your health metrics in one place. Track calories, water intake, weight progress, and more with our intuitive dashboard.</p>
          <div className='flex gap-2 items-center'>
            <FiBarChart2 style={{fontWeight: "bolder", fontSize: "24px"}}/> 
            <p className='font-medium'>Visualize your progress with interactive charts</p>
          </div>
          <div className='flex gap-2 items-center'>
            <FaRegHeart style={{fontWeight: "bolder", fontSize: "24px"}} /> 
            <p className='font-medium'>Monitor vital health metrics</p>
          </div>
          <div className='flex gap-2 items-center'>
            <CiForkAndKnife style={{fontWeight: "bolder", fontSize: "24px"}} /> 
            <p className='font-medium'>Log meals and track neutrition</p>
          </div>
          <div className='flex gap-2 items-center'>
            <GoGraph style={{fontWeight: "bolder", fontSize: "24px"}} /> 
            <p className='font-medium'>Set and track personal goals</p>
          </div>
        </div>
        <div>
          <img  className='rounded-lg border-3 border-gray-400' src='https://raw.githubusercontent.com/i-am-rut/Images/refs/heads/main/Screenshot%202025-09-07%20150414.png' alt='dashboard' />
        </div>
      </div>
      <div className='bg-[#fafafa] text-black flex flex-col items-center justify-center gap-8 py-12'>
        <h2 className='sm:text-2xl md:text-4xl lg:text-4xl font-bold'>Start Your Health Journey Today</h2>
        <p className='max-w-2xl text-center md:text-xl lg:text-2xl font-normal text-gray-600'>Join hundreds of users who have transformed their health with <b>Shist.</b></p>
        <Link className='px-4 py-2 text-white bg-black font-medium rounded-lg ' to='/signup'>Sign up for free</Link>
      </div>
    </div>
  )
}

export default HomePage