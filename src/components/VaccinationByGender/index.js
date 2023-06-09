// Write your code here

import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'
import './index.css'

const VaccinationByGender = props => {
  const {vaccinationByGender} = props

  return (
    <div className="bg-for-all">
      <h1 className="sub-heading">Vaccination by gender</h1>
      <div>
        <PieChart width={1000} height={300}>
          <Pie
            cx="50%"
            cy="50%"
            data={vaccinationByGender}
            startAngle={180}
            endAngle={0}
            innerRadius="40%"
            outerRadius="70%"
            dataKey="count"
          >
            <Cell name="Male" fill=" #f54394" />
            <Cell name="Female" fill="#5a8dee" />
            <Cell name="Children" fill="#2cc6c6" />
          </Pie>
          <Legend iconType="circle" align="center" />
        </PieChart>
      </div>
    </div>
  )
}

export default VaccinationByGender
