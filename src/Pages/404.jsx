import { IoMdPulse } from "react-icons/io"
import Footer from "../components/Footer"
import { Link, useLocation } from "react-router"
import { FaArrowLeft } from "react-icons/fa6"



const Page404 = () => {

    const {pathname} = useLocation()
    console.log(pathname)

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
                    <div className="text-white flex flex-col gap-8 m-auto">
                        <h2 className="text-3xl font-bold">404 Not Found!</h2>
                        <p className="font-medium">{`The page you are looking {'${pathname}'} for could not be found.`}</p>
                        <button className="px-4 py-2 rounded-lg bg-white text-black font-medium self-center">Go to dashboard</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Page404