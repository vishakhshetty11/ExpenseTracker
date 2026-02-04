import React from 'react';
import { Pie, PieChart, Sector,Cell, Legend } from 'recharts';

const RADIAN = Math.PI / 180;
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CustomSector = (props) => {
  return <Sector {...props} fill={COLORS[props.index % COLORS.length]} />;
};

export default function CustomPieChart({ isAnimationActive = true, data }) {
  return (
    <>
      <PieChart width={300} height={180}>
        <Pie
          data={data}
          dataKey="value"
          labelLine={false}
          label={renderCustomizedLabel}
          isAnimationActive={isAnimationActive}
          shape={CustomSector}
          outerRadius={70}
        >{data.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={COLORS[index % COLORS.length]}
          />
        ))} </Pie>
        <Legend verticalAlign="bottom" width="300px" />
      </PieChart>
    </>
  );
}
