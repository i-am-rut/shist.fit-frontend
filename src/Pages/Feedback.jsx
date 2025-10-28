import { useState } from "react"
import api from "../utils/api"
import { notifyError, notifySuccess } from "../utils/toasts"


const Feedback = () => {

    const [feedback, setFeedback] = useState('')
    const [error, setError] = useState('')

    const handlePostFeedback = async() => {
        setError('')
        if(feedback.length > 2000) {
            setError('Feedback length can not be more than 2000 characters')
            return
        }
        try {
            const res = await api.post('/feedback', {message: feedback}, {withCredentials: true})
            notifySuccess(res.data?.message, '')
            setFeedback('')
        } catch (err) {
            notifyError(err.response?.data?.message || err.response?.data?.error, '')
        }
    }

    return (
        <div className="text-white mx-auto flex justify-center p-12 w-[100%]">
            <div className="flex flex-col gap-4 justify-center items-start p-4 sm:p-8 lg:p-12 max-w-3xl">
                <h1 className="text-2xl font-bold">Feedback</h1>
                <p>Please give your feedback below. We value your suggestions and experience.</p>
                <div className="flex flex-col gap-2">
                    <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} className="w-xs sm:w-xl md:w-2xl p-4 border-2 border-gray-400 rounded-lg" maxLength={2000}></textarea>
                    <div className="flex items-center justify-between">
                        <small className="text-gray-400">(In 2000 characters.)</small>
                        <small className="text-gray-400">{feedback.length}/2000</small>
                    </div>
                </div>
                {error.length > 0 ? <p>{error}</p> : null}
                <button 
                    onClick={handlePostFeedback}
                    className="px-4 py-2 bg-green-400 font-bold rounded-lg self-end">Submit response</button>
            </div>
        </div>
    )
}

export default Feedback