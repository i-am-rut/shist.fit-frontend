import { FaArrowLeft } from "react-icons/fa6";
import { IoMdPulse } from "react-icons/io";
import Footer from "../components/Footer";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";
import { notifyError, notifySuccess } from "../utils/toasts";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../utils/slices/userSlice";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const from = location.state?.from
    const reason = location.state?.reason
    const user = useSelector(state => state.user.user)
    if(user) {
        return <Navigate to='/dashboard' /> 
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/login`, {email, password}, {withCredentials:true})
                dispatch(setUser(res.data.user))
                notifySuccess(res.data.message)
                navigate(from || '/dashboard')
            // if(res.data?.user?.isEmailVerified) {
            //     dispatch(setUser(res.data.user))
            //     notifySuccess(res.data.message)
            //     navigate(from || '/dashboard')
            // }else{
            //     navigate('/verifyemail', {state: {email}})
            // }
        } catch (err) {
            if(err.response?.data?.message || err.response?.data?.error) {
                notifyError('Failed to Login', err.response?.data?.message || err.response?.data?.error)
            } else {
                console.error(err.response)
                notifyError('Failed to Login', 'Try again after some time.')
            }
        }
    }
    console.log(reason)

    return (
        <div>
            <div className="bg-[#18181a] min-h-[100vh]">
                <Link to='/' className="text-gray-400 font-medium flex gap-2 items-center p-4 cursor-pointer">
                    <FaArrowLeft /> Back to home
                </Link>
                <div className="flex flex-col justify-center items-center p-2">
                    <div className="flex gap-2 text-white py-8 font-bold text-2xl text-center items-center">
                        <IoMdPulse />
                        <h1>Shist</h1>
                    </div>
                    <div className="sm:w-[500px] flex flex-col gap-4 bg-black text-white px-4 py-8 mb-8  rounded-lg">
                        {reason === 'auth_required' ? <p className="text-red-600 font-bold text-xl text-center">You must login first!</p> : null}
                        {reason === 'logout' ? <p className="text-green-600 font-bold text-xl text-center">You have been logged out successfully!</p> : null}
                        {reason === 'deactivate' ? <p className="text-green-600 font-bold text-xl text-center">Your account has been successfully deactivated.</p> : null}
                        <h2 className="text-2xl font-bold">Log in</h2>
                        <p className="text-gray-400">Enter your email and password to access your account</p>
                        <form className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="signup-email-input">Email:</label>
                                <input 
                                    name="email" 
                                    value={email} 
                                    className="p-2 rounded-lg border-2 border-gray-600" 
                                    required 
                                    id="signup-email-input" 
                                    type="email" 
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="name@example.com" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="signup-password-input">Password:</label>
                                <input 
                                    name="password" 
                                    value={password} 
                                    className="p-2 rounded-lg border-2 border-gray-600" 
                                    required 
                                    id="signup-password-input" 
                                    type='password'
                                    onChange={e => setPassword(e.target.value)} 
                                    placeholder="********" />
                                {/* <Link className="text-gray-400 self-end cursor-pointer" to='/forgotpassword'>Forgot password?</Link> */}
                            </div>
                            <button 
                                className="py-2 bg-white w-[100%] text-black font-medium rounded-lg cursor-pointer"
                                onClick={e => handleLogin(e)}    
                            >Log in</button>
                        </form>
                        <div className="flex gap-2 justify-center">
                            <p className="text-gray-400">Don't have an account?</p>
                            <Link className='font-medium cursor-pointer' to='/signup' state={{from: from}} replace={true} >Sign up</Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Login