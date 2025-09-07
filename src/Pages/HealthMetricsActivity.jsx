import Container from "../components/Container"
import ProgressBar from "../components/ProgressBar"

const HealthMetricsActivity = () => {
    return (
        <div className="grid md:grid-cols-2 gap-4 my-6">
            <Container>
                <h2 className="font-semibold text-2xl">Today's Activity</h2>
                <div className="flex justify-between items-center mt-4">
                    <p>Steps</p>
                    <p className="font-semibold text-lg">8547 / 10,000</p>
                </div>
                <ProgressBar progress={85} />
                <div className="flex items-center justify-between mt-4">
                    <p>Active Minutes</p>
                    <p className="font-semibold text-lg">45 / 30</p>
                </div>
                <ProgressBar progress={100} />
                <div className="mt-4 flex justify-between items-center">
                    <p>Calories Burned</p>
                    <p className="font-semibold text-lg">420</p>
                </div>
            </Container>
            <Container>
                <h2 className="font-semibold text-2xl">Weekly Summary</h2>
                <div className="text-center mt-8">
                    <h3 className="text-2xl font-bold">5 / 7</h3>
                    <p className="text-gray-400 ">Days goal reached</p>
                    <h3 className="text-2xl font-bold mt-4">58,429</h3>
                    <p className="text-gray-400 ">Total steps this week</p>
                    <p className="w-full py-1 font-bold bg-gray-700 rounded-2xl mt-4">Great Week!</p>
                </div>
            </Container>
        </div>
    )
}

export default HealthMetricsActivity
