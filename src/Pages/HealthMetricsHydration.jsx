import { BarChart, Bar, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ReferenceLine } from "recharts"
import Container from "../components/Container"

const data = [
  {
    name: 'Mon',
    liters: 2.4,
  },
  {
    name: 'Tue',
    liters: 2.2,
  },
  {
    name: 'Wed',
    liters: 2.7,
  },
  {
    name: 'Thu',
    liters: 2.0,
  },
  {
    name: 'Fri',
    liters: 2.4,
  },
  {
    name: 'Sat',
    liters: 2.5,
  },
  {
    name: 'Sun',
    liters: 2.7,
  },
]

const HealthMetricsHydration = () => {
    return (
        <div className="my-8">
            <Container>
                <h2 className="text-2xl font-bold">Daily Hydration</h2>
                <p className="text-gray-400 text-sm">Water Intake Over the Past Week</p>
                <div className="mt-8" style={{width: '100%', height: 300}}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 5" />
                            <XAxis dataKey="name" stroke="#fff" />
                            <YAxis stroke="#fff" domain={[0, 'dataMax + 1']} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="liters" fill="#82ca9d" />
                            <ReferenceLine 
                                y={3} 
                                label={{
                                    value: 'Water Target (3 Liters)',
                                    position: 'bottom',
                                    fill: '#8884d8',
                                    fontSize: 12,
                                    fontWeight: 'bold'
                                }}
                                stroke="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Container>
            
        </div>
    )
}

export default HealthMetricsHydration
