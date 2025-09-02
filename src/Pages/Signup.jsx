import { FaArrowLeft } from "react-icons/fa6";
import { IoMdPulse } from "react-icons/io";
import Footer from "../components/Footer";
import { Link } from "react-router";

const SignUp = () => {
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
                                <input className="p-2 rounded-lg border-2 border-gray-600" required id="signup-name-input" type="text" placeholder="Rohan Sharma" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="signup-email-input">Email:</label>
                                <input className="p-2 rounded-lg border-2 border-gray-600" required id="signup-email-input" type="email" placeholder="name@example.com" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="signup-password-input">Password:</label>
                                <input className="p-2 rounded-lg border-2 border-gray-600" required id="signup-password-input" type={`password`} placeholder="********" />
                                <small className="text-gray-400">Password must be atleast 8 characters long</small>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="signup-confirm-password-input">Confirm Password:</label>
                                <input className="p-2 rounded-lg border-2 border-gray-600" required id="signup-confirm-password-input" type={`password`} placeholder="********" />
                            </div>
                            <p className="text-gray-400">All fields are mandatory.</p>
                            <button className="py-2 bg-white w-[100%] text-black font-medium rounded-lg cursor-pointer">Create account</button>
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