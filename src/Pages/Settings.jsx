
const Settings = () => {
    return (
        <div className="bg-[#18181c] text-white p-4">
            <h1 className="mt-6 px-2 sm:px-8 lg:px-12 text-xl font-bold sm:text-2xl lg:text-4xl">Settings</h1>
            <div className="max-w-7xl bg-black border-2 border-gray-700 mx-auto mt-6 px-2 lg:px-4 py-4 rounded-lg">
                <div>
                    <h2 className="text-lg md:text-2xl lg:text-3xl font-bold">Account Settings</h2>
                    <p className="text-sm md:text-lg text-gray-400">Manage your account and security</p>
                </div>
                <form className="mt-6">
                    <h3 className="text:md lg:text-xl font-medium">Password</h3>
                    <div className="flex flex-col justify-center gap-2 mt-4">
                        <label>Current Password</label>
                        <input type="password" className="px-4 py-2 border border-gray-600 rounded-lg" placeholder="********" />
                    </div>
                    <div className="flex flex-col justify-center gap-2 mt-4">
                        <label>New Password</label>
                        <input type="password" className="px-4 py-2 border border-gray-600 rounded-lg" placeholder="********" />
                    </div>
                    <div className="flex flex-col justify-center gap-2 mt-4">
                        <label>Confirm New Password</label>
                        <input type="password" className="px-4 py-2 border border-gray-600 rounded-lg" placeholder="********" />
                    </div>
                    <button className="w-48 px-4 py-2 bg-white text-black font-medium mt-4 rounded-lg cursor-pointer">Update Password</button>
                </form>

            </div>
            <div className="max-w-7xl bg-black border-2 border-gray-700 mx-auto mt-6 px-2 lg:px-4 py-4 rounded-lg">
                <h2 className="text:md lg:text-xl text-red-700 font-bold">Danger Zone</h2>
                <p className="text-sm md:text-lg text-gray-400 mt-6">Once you delete your account, there is no going back. Please be certain.</p>
                <button className="px-4 py-2 bg-red-900 text-white font-bold rounded-lg cursor-pointer mt-4">Delete Account</button>
            </div>
        </div>
    )
}

export default Settings