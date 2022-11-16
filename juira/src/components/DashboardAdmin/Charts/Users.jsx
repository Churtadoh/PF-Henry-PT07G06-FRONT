import React, { useState } from "react";
import { RadialBarChart, RadialBar, Legend, Tooltip } from "recharts";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import axios from "axios";
import { API_URL_BACKEND } from "../../../api/apiRoute";



const style = {
  top: 0,
  left: 350,
  lineHeight: "24px"
};

export default function UsersChart() {
  const [users, setUsers] = useState([])

  let resp = []
    axios.get(`${API_URL_BACKEND}users`)
    .then(response => resp = response.data)
    .then(() => !users.length && setUsers(resp))
    .catch(error => console.log(error))

    let totalUsers = users.length
    let activeUsers = 0
    let bannedUsers = 0
    let deletedUsers = 0
    users.forEach( user => {
      if (user.status === 'active') activeUsers += 1
      else if (user.status === 'banned') bannedUsers += 1
      else if (user.status === 'deleted') deletedUsers += 1
    })


    const data = [
      {
        name: "Baneados",
        value: bannedUsers,
        // pv: 2400,
        fill: "#8884d8"
      },
      {
        name: "Eliminados",
        value: deletedUsers,
        // pv: 3908,
        fill: "#ffc658"
        
      },
      {
        name: "Activos",
        value: activeUsers,
        // pv: 9800,
        fill: "#82ca9d",
      },
      // {
      //   name: "Total",
      //   value: totalUsers,
      //   // pv: 9800,
      //   fill: "#8dd1e1"
      // },
    ];
    

    const COLORS = ["#0088FE", "#FFBB28", "#00C49F", "#FF8042"];
  return (
    <PieChart width={800} height={400}>
      <Pie
        data={data}
        cx={220}
        cy={150}
        innerRadius={40}
        outerRadius={90}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Legend
          iconSize={15}
          width={120}
          height={140}
          layout="vertical"
          verticalAlign="middle"
          wrapperStyle={style}
        />
    </PieChart>
    // <RadialBarChart
    //   width={500}
    //   height={300}
    //   cx={150}
    //   cy={150}
    //   innerRadius={30}
    //   outerRadius={140}
    //   barSize={45}
    //   data={data}
    // >
    //   <Tooltip/>
    //   <RadialBar
    //     minAngle={15}
    //     label={{ position: "insideStart", fill: "#fff" }}
    //     background
    //     clockWise
    //     dataKey="value"
    //   />
    //   <Legend
    //     iconSize={15}
    //     width={120}
    //     height={140}
    //     layout="vertical"
    //     verticalAlign="middle"
    //     wrapperStyle={style}
    //   />
    // </RadialBarChart>
    
  );
}
