import { IoMdPulse } from "react-icons/io"
import Footer from "../components/Footer"
import { FaArrowLeft } from "react-icons/fa6"
import { Link } from "react-router"


const ForgotPassword = () => {
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
                    <div className="text-white mx-auto flex justify-center p-12 w-[100%]">
                        <div className="flex flex-col gap-4 justify-center items-start p-4 sm:p-8 lg:p-12 max-w-3xl">
                            <h1 className="text-2xl font-bold">Forgot password</h1>
                            <p>Enter your email below you will receive an email with an OTP.</p>
                            <div className="flex flex-col justify-center gap-2 w-[100%]">
                                <label htmlFor="forgot-password-email">Email: </label>
                                <input className="border-2 border-gray-600 rounded-lg p-2" id="forgot-password-email" type="email" placeholder="name@example.com" />
                            </div>
                            <button className="px-4 py-2 bg-green-400 font-bold rounded-lg self-end cursor-pointer">Request OTP</button>
                            <div className="flex flex-col justify-center gap-2 w-[100%]">
                                <label htmlFor="forgot-password-OTP">Enter OTP:</label>
                                <input className="border-2 border-gray-600 rounded-lg p-2 w-[100%]" id='forgot-password-OTP' type="text" placeholder="000000"/>
                            </div>
                            <button className="px-4 py-2 bg-green-400 font-bold rounded-lg self-end cursor-pointer">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ForgotPassword