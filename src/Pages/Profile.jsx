import { CgProfile } from "react-icons/cg"
import {  useSelector } from "react-redux"


const Profile = () => {
    const user = useSelector(state => state.user.user)
    return (
        <div className="bg-[#18181c] text-white mt-8 px-2 sm:px-8 lg:px-12">
            <div className="max-w-7xl">
                <h1 className="sm:text-xl md:text-2xl lg:text-3xl font-bold self-start">Profile</h1>
            </div>
            <div className="mt-6 p-4 bg-black rounded-lg border border-gray-600 pb-12">
                <div>
                    <h2 className="font-bold md:text-lg lg:text-2xl">Personal Information</h2>
                    <p className="text-gray-400">Upadte your personal details and health information</p>
                </div>
                <div className="grid lg:grid-cols-[1fr_2fr] gap-4 mt-6">
                    <div className="flex items-center justify-center">
                        <CgProfile className="text-9xl" />
                    </div>
                    <form className="grid md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="profile-name">Full name</label>
                            <input value={user.name} id="profile-name" minLength={2} maxLength={100} className="px-4 py-2 border border-gray-600 rounded-lg" disabled />
                            <p className="text-sm text-gray-400">Name can not be changed</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="profile-email">Email</label>
                            <input value={user.email} id="profile-email" type="email" className="px-4 py-2 border border-gray-600 rounded-lg" disabled />
                            <p className="text-sm text-gray-400">Email can not be changed</p>
                        </div>
                        <div className="flex flex-col gap-2 mt-4">
                            <label htmlFor="profile-age">Age</label>
                            <input id="profile-age" type="number" min={5} max={150} className="px-4 py-2 border border-gray-600 rounded-lg" placeholder="Enter your age" />
                        </div>
                        <div className="flex flex-col gap-2 mt-4">
                            <label htmlFor="profile-gender">Gender</label>
                            <select id="profile-gender" className="px-4 py-2 border border-gray-600 rounded-lg bg-[#18181c]">
                                <option>Select</option>
                                <option value='male'>Male</option>
                                <option value='female' >Female</option>
                                <option value='other'>Other</option>
                                <option value='prefer not to say'>Prefer not to say</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-2 mt-4">
                            <label htmlFor="profile-height">Height (cm)</label>
                            <input id="profile-height" type="number" min={50} max={300} className="px-4 py-2 border border-gray-600 rounded-lg" placeholder="Enter your height in cm."/>
                        </div>
                        <div className="flex flex-col gap-2 mt-4">
                            <label htmlFor="profile-heartrate">Resting Heart Rate (BPM)</label>
                            <input id="profile-heartrate" type="number" min={0} max={300} className="px-4 py-2 border border-gray-600 rounded-lg" placeholder="Enter your resting heartrate"/>
                        </div>
                        <button className="px-4 py-2 bg-white text-black rounded-lg w-40 font-medium">Save Changes</button>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default Profile