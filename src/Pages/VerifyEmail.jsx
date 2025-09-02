import { FaArrowLeft } from "react-icons/fa6"
import { IoMdPulse } from "react-icons/io"
import { Link } from "react-router"
import Footer from "../components/Footer"



const VerifyEmail = () => {
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
                        <p className="font-bold text-green-500 underline cursor-pointer">Resend link</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default VerifyEmail