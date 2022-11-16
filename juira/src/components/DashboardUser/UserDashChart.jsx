import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';

export default function UserChart(props) {

    const { colors } = props;
    //const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    const COLORS = colors; //['rgb(255,105,162)']; //['#FF69A2', '#69C3FF'];

    return (
        <PieChart width={130} height={150} /* onMouseEnter={this.onPieEnter} */>
            <Pie
                data={props.data}
                cx={60} //120
                cy={75} //200
                innerRadius={40}
                outerRadius={65}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
            /* label={{ position: 'insideStart', fill: '#000' }} */
            >
                {props.data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>

        </PieChart>
    );
}