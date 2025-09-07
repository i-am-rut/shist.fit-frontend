import { CartesianGrid, Legend, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import Container from "../components/Container"
import ProgressBar from "../components/ProgressBar"

const data = [
  {
    date: 'Jan 1',
    weight: 73.9,
  },
  {
    date: 'Jan 8',
    weight: 73.5,
  },
  {
    date: 'Jan 15',
    weight: 73.1,
  },
  {
    date: 'Jan 22',
    weight: 72.7,
  },
  {
    date: 'Jan 29',
    weight: 72.3,
  },
  {
    date: 'feb 5',
    weight: 71.9,
  },
  {
    date: 'feb 12',
    weight: 71.5,
  },
  {
    date: 'feb 19',
    weight: 71.1,
  },
]

const HealthMetricsWeight = () => {
    return (
        <div>
            <Container>
                <div>
                    <h2 className="text-2xl font-bold">Weight Progress</h2>
                    <p className="text-gray-400 text-sm">Your weight loss journey over the time</p>
                </div>
                <div className="mt-8" style={{width: "100%", height: 300}}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 5" />
                            <XAxis dataKey="date" />
                            <YAxis domain={['dataMin - 15', 'dataMax + 15']} />
                            <Tooltip />
                            <Legend />
                            <ReferenceLine 
                                y={62} 
                                label={{
                                    value: 'Target Weight (62 Kg)',
                                    position: 'bottom',
                                    fill: '#82ca9d',
                                    fontSize: 12,
                                    fontWeight: 'bold'
                                }}
                                stroke="#82ca9d" />
                            <Line type="monotone" dataKey="weight" stroke="#8884d8" />
                        </LineChart>
                    </ResponsiveContainer> 
                </div>
            </Container>
            <div className="grid md:grid-cols-3 gap-4 mt-8">
                <Container>
                    <h3 className="text-xl font-bold">Goal Progress</h3>
                    <div className="flex items-center justify-between">
                        <p>Start weight</p>
                        <p className="font-semibold">73.9 Kg</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p>Current weight</p>
                        <p className="font-semibold">71.1 Kg</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p>Goal weight</p>
                        <p className="font-semibold">62 Kg</p>
                    </div>
                    <ProgressBar progress={18} />
                    <p className="text-center">82% to goal</p>
                </Container>
                <Container>
                    <h3 className="text-xl font-bold">Weekly Change</h3>
                    <div className="text-center mt-8">
                        <h2 className="text-green-600 font-bold text-3xl">-0.4 Kg</h2>
                        <p className="text-gray-400 mt-2">This Week</p>
                        <p className="px-4 py-1 bg-gray-700 font-semibold rounded-2xl inline-block mt-2">On Track</p>
                    </div>
                </Container>
                <Container>
                    <h3 className="text-xl font-bold">BMI</h3>
                    <div className="text-center mt-6">
                        <h2 className="font-bold text-3xl">24.6</h2>
                        <p className="text-gray-400 mt-2">More Than Normal Weight</p>
                        <p className="px-4 py-1 bg-gray-700 font-semibold rounded-2xl inline-block mt-2">Slightly Overweight</p>
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default HealthMetricsWeight
