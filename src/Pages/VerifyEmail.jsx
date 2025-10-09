import { FaArrowLeft } from "react-icons/fa6"
import { IoMdPulse } from "react-icons/io"
import { Link, useLocation } from "react-router"
import Footer from "../components/Footer"
import axios from "axios"
import { notifyError, notifySuccess } from "../utils/toasts"



const VerifyEmail = () => {
    const location = useLocation()
    const email = location.state?.email
    // Implement !email with getting email from user and useStating it and them making the api call with button

    const handleResendEmailClick = async () => {
        try{
            const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/resend-verification`, {email}, {withCredentials: true})
            notifySuccess('Email sent successfully', res.data?.message)
        }catch (err) {
            console.log(err)
            if(err.response?.data?.message || err.response?.data?.error) {
                notifyError('Failed to resend email', err.response?.data?.message || err.response?.data?.error)
            } else {
                console.error(err.response)
                notifyError('Failed to resend email', 'Try again after some time.')
            }
        }
    }

    return (
        <div>
            <div className="bg-[#18181a] min-h-[100vh]">
                <Link to='/' className="text-gray-400 font-medium flex gap-2 items-center p-4 cursor-pointer">
                    <FaArrowLeft /> Back to home
                </Link>
                <div className="flex flex-col justify-center items-center p-8">
                    <div className="flex gap-2 text-white py-8 font-bold text-2xl text-center items-center">
                        <IoMdPulse />
                        <h1>Shist</h1>
                    </div>
                    <div className="text-white flex flex-col gap-8 max-w-xl py-8">
                        <h2 className="text-xl sm:text-2xl font-bold">Verify email</h2>
                        <p>Verification link has been sent to the email address you provided, click on the link to verify your email. You need to verify your email to login.</p>
                    </div>
                    <div className="text-white flex gap-2 items-center">
                        <p>Did not receive link?</p>
                        <button onClick={handleResendEmailClick} className="font-bold text-green-500 underline cursor-pointer">Resend link</button>
                    </div>
                    <Link className="bg-black border-2 font-medium border-gray-600 py-2 px-4 rounded-lg text-white mt-12 hover:bg-gray-600 active:bg-gray-800" to='/login' >Proceed to Login</Link>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default VerifyEmail