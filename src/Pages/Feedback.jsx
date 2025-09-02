

const Feedback = () => {
    return (
        <div className="text-white mx-auto flex justify-center p-12 w-[100%]">
            <div className="flex flex-col gap-4 justify-center items-start p-4 sm:p-8 lg:p-12 max-w-3xl">
                <h1 className="text-2xl font-bold">Feedback</h1>
                <p>Please give your feedback below. We value your suggestions and experience.</p>
                <div className="flex flex-col gap-2">
                    <textarea className="w-xs sm:w-xl md:w-2xl p-4 border-2 border-gray-400 rounded-lg" maxLength={2000}></textarea>
                    <div className="flex items-center justify-between">
                        <small className="text-gray-400">(In 2000 characters.)</small>
                        <small className="text-gray-400">0/2000</small>
                    </div>
                </div>
                <button className="px-4 py-2 bg-green-400 font-bold rounded-lg self-end">Submit response</button>
            </div>
        </div>
    )
}

export default Feedback