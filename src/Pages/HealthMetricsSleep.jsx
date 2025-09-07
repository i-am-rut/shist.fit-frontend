import { BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis, Bar } from "recharts"
import Container from "../components/Container"

const data = [
  {
    name: 'Mon',
    hours: 7,
  },
  {
    name: 'Tue',
    hours: 8,
  },
  {
    name: 'Wed',
    hours: 6,
  },
  {
    name: 'Thu',
    hours: 7,
  },
  {
    name: 'Fri',
    hours: 4,
  },
  {
    name: 'Sat',
    hours: 5,
  },
  {
    name: 'Sun',
    hours: 8,
  },
]

const HealthMetricsSleep = () => {
    return (
        <div>
            <Container>
                <div>
                    <h2 className="text-2xl font-bold">Sleep Patterns</h2>
                    <p className="text-[gray-400] text-sm">Your Sleep Duration Over the Past Week</p>
                </div>
                <div className="mt-8" style={{width: "100%", height: 300}}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="1 3" />
                            <XAxis dataKey="name" stroke="#fff" />
                            <YAxis stroke="#fff" />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="hours" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer> 
                </div>
            </Container>
        </div>
    )
}

export default HealthMetricsSleep
