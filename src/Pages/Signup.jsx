import { FaArrowLeft } from "react-icons/fa6";
import { IoMdPulse } from "react-icons/io";
import Footer from "../components/Footer";
import { Link, Navigate, useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";
import { notifyError, notifySuccess } from "../utils/toasts";
import { useSelector } from "react-redux";

const SignUp = () => {
    const user = useSelector(state => state.user.user)
    if(user) {
        return <Navigate to='/dashboard' /> 
    }

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        rePassword: ''
    })
    const [email, setEmail] = useState(null)
    const navigate = useNavigate()
    
    const handleSignUp = async(e) => {
        e.preventDefault()
        const { email, password, rePassword} = formData
        const name = formData.name[0].toUpperCase() + formData.name.substring(1)
        try {
            const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/register`, {name, email, password, rePassword})
            setEmail(res.data?.email)
            notifySuccess('User registered successfully.', '')
            navigate('/login')
            // navigate('/verifyemail', {state: {email}})
            setEmail(null)
        } catch (err) {
            if(err.response?.data?.message || err.response?.data?.error) {
                notifyError('Failed to register', err.response?.data?.message || err.response?.data?.error)
            } else {
                console.error(err.response)
                notifyError('Failed to register', 'Try again after some time.')
            }
        }
    }


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
                        <h2 className="text-2xl font-bold">Create an account</h2>
                        <p className="text-gray-400">Enter your information to create a Shist account</p>
                        <form className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="signup-name-input">Full Name:</label>
                                <input 
                                    className="p-2 rounded-lg border-2 border-gray-600" 
                                    required id="signup-name-input" 
                                    type="text" 
                                    name='name'
                                    value={formData.name}
                                    onChange={e => setFormData(prev => ({...prev, name: e.target.value}))}
                                    placeholder="Rohan Sharma" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="signup-email-input">Email:</label>
                                <input 
                                    className="p-2 rounded-lg border-2 border-gray-600" 
                                    required 
                                    id="signup-email-input" 
                                    type="email" 
                                    name="email"
                                    value={formData.email}
                                    onChange={e => setFormData(prev => ({...prev, email: e.target.value}))}
                                    placeholder="name@example.com" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="signup-password-input">Password:</label>
                                <input 
                                    className="p-2 rounded-lg border-2 border-gray-600" 
                                    required 
                                    id="signup-password-input" 
                                    type='password'
                                    name="password"
                                    autoComplete='new-password'
                                    value={formData.password}
                                    onChange={e => setFormData(prev => ({...prev, password: e.target.value}))} 
                                    placeholder="********" />
                                <small className="text-gray-400">Password must be atleast 8 characters long and must contain atleast 1 uppercase, lowercase letters, number and special characters.</small>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="signup-confirm-password-input">Confirm Password:</label>
                                <input 
                                    className="p-2 rounded-lg border-2 border-gray-600" 
                                    required 
                                    id="signup-confirm-password-input" 
                                    type='password' 
                                    name="rePassword"
                                    autoComplete="new-password"
                                    value={formData.rePassword}
                                    onChange={e => setFormData(prev => ({...prev, rePassword: e.target.value}))}
                                    placeholder="********" />
                            </div>
                            <p className="text-gray-400">All fields are mandatory.</p>
                            <button 
                                className="py-2 bg-white w-[100%] text-black font-medium rounded-lg cursor-pointer"
                                onClick={e => handleSignUp(e)}    
                            >Create account</button>
                        </form>
                        <div className="flex gap-2 justify-center">
                            <p className="text-gray-400">Already have an account?</p>
                            <Link className='font-medium cursor-pointer' to='/login' >Log in</Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default SignUp