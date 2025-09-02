import { FaArrowLeft } from "react-icons/fa6";
import { IoMdPulse } from "react-icons/io";
import Footer from "../components/Footer";
import { Link } from "react-router";

const Login = () => {
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
                        <h2 className="text-2xl font-bold">Log in</h2>
                        <p className="text-gray-400">Enter your email and password to access your account</p>
                        <form className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="signup-email-input">Email:</label>
                                <input className="p-2 rounded-lg border-2 border-gray-600" required id="signup-email-input" type="email" placeholder="name@example.com" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="signup-password-input">Password:</label>
                                <input className="p-2 rounded-lg border-2 border-gray-600" required id="signup-password-input" type={`password`} placeholder="********" />
                                <Link className="text-gray-400 self-end cursor-pointer" to='/forgotpassword'>Forgot password?</Link>
                            </div>
                            <button className="py-2 bg-white w-[100%] text-black font-medium rounded-lg cursor-pointer">Log in</button>
                        </form>
                        <div className="flex gap-2 justify-center">
                            <p className="text-gray-400">Don't have an account?</p>
                            <Link className='font-medium cursor-pointer' to='/signup' >Sign up</Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Login