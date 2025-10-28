import { useState } from "react"
import api from "../utils/api"
import axios from "axios"
import { notifyError, notifySuccess } from "../utils/toasts"
import Modal from "../components/Modal"

const Settings = () => {
    const [formdata, setFormData] = useState({
        password: '',
        newPassword: '',
        reNewPassword: '',
    })
    const [error, setError] = useState('')
    const [show, setShow] = useState(false)

    const validatePasswords = () => {
        const {password, newPassword, reNewPassword} = formdata
        if(password.length === 0 || newPassword.length === 0 || reNewPassword.length === 0) {
            setError('Fields can not be empty')
            return false
        }
        if(newPassword.length < 8 || reNewPassword.length < 8) {
            setError('Password must be atleast 8 characters long and must contain atleast 1 uppercase, lowercase letters, number and special characters.')
            return false
        }
        if(newPassword !== reNewPassword) {
            setError('New password and re-entered new passwords do not match')
            return false
        }
        return true
    }

    const handleUpdatePassword = async(e) => {
        e.preventDefault()
        setError('')
        const {password, newPassword, reNewPassword} = formdata
        if(validatePasswords()) {
            try {
                const res = await api.patch(`/auth/change-password`, {password, newPassword, reNewPassword}, {withCredentials: true})
                notifySuccess(res.data?.message)
                setFormData({password: '', newPassword: '', reNewPassword: ''})
            } catch (err) {
                notifyError(err.response?.data?.message)
                setFormData({password: '', newPassword: '', reNewPassword: ''})
            }
        }else {
            return
        }
    }

    const Logout = async() => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/logout`, {}, {withCredentials: true})
      dispatch(setUser('null'))
      notifySuccess("Logged out successfully")
    }catch (err) {
      if(err.response?.data?.message || err.response?.data?.error) {
          notifyError('Failed to Logout', err.response?.data?.message || err.response?.data?.error)
      } else {
          console.error(err.response)
          notifyError('Failed to Logout', 'Try again after some time.')
      }
    }
  }

    const handleDeleteAccountYesClick = async() => {
        try {
            const res = await api.patch('/auth/delete-account', {}, {withCredentials: true})
            console.log(res)
            Logout()
        }catch(err) {
            console.log(err)
        }
    }

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
                        <input 
                            type="password" 
                            value={formdata.password}
                            onChange={e => setFormData(prev => ({
                                ...prev, password: e.target.value
                            }))}
                            className="px-4 py-2 border border-gray-600 rounded-lg" 
                            placeholder="********" />
                    </div>
                    <div className="flex flex-col justify-center gap-2 mt-4">
                        <label>New Password</label>
                        <input 
                            type="password" 
                            value={formdata.newPassword}
                            onChange={e => setFormData(prev => ({
                                ...prev, newPassword: e.target.value
                            }))}
                            className="px-4 py-2 border border-gray-600 rounded-lg" 
                            placeholder="********" />
                        <small className="text-gray-400">Password must be atleast 8 characters long and must contain atleast 1 uppercase, lowercase letters, number and special characters.</small>
                    </div>
                    <div className="flex flex-col justify-center gap-2 mt-4">
                        <label>Confirm New Password</label>
                        <input 
                            type="password" 
                            value={formdata.reNewPassword}
                            onChange={e => setFormData(prev => ({
                                ...prev, reNewPassword: e.target.value
                            }))}
                            className="px-4 py-2 border border-gray-600 rounded-lg" 
                            placeholder="********" />
                    </div>
                    {error.length > 0 ? <p className="text-red-600">{error}</p> : null}
                    <button onClick={e => handleUpdatePassword(e)} className="w-48 px-4 py-2 bg-white text-black font-medium mt-4 rounded-lg cursor-pointer">Update Password</button>
                </form>

            </div>
            <div className="max-w-7xl bg-black border-2 border-gray-700 mx-auto mt-6 px-2 lg:px-4 py-4 rounded-lg">
                <h2 className="text:md lg:text-xl text-red-700 font-bold">Danger Zone</h2>
                <p className="text-sm md:text-lg text-gray-400 mt-6">Once you delete your account, there is no going back. Please be certain.</p>
                <button 
                    onClick={() => setShow(true)}
                    className="px-4 py-2 bg-red-900 text-white font-bold rounded-lg cursor-pointer mt-4">Delete Account</button>
            </div>
            {show? <Modal show={show} setShow={setShow} >
                <div className="flex flex-col">
                    <h2 className="text-2xl font-bold mb-4">Are you sure you want to delete your account?</h2>
                    <div className="flex gap-3 self-end">
                        <button 
                            className="px-4 py-2 bg-white text-black font-medium mt-4 rounded-lg cursor-pointer"
                            onClick={() => setShow(false)}>No</button>
                        <button 
                            className="px-4 py-2 bg-red-900 text-white font-bold rounded-lg cursor-pointer mt-4" 
                            onClick={handleDeleteAccountYesClick}    
                        >Yes</button>
                    </div>
                </div>
            </Modal> : null}
        </div>
    )
}

export default Settings