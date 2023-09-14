import React from 'react';
import { Cell, Pie, PieChart, Sector } from 'recharts';
const COLORS = ["#F0F5FB", "#4FA4F4"];

const ProgressBar = ({ correct, totalQ }) => {
    
    // const [activeIndex, setActiveIndex] = React.useState(0);
    const activeIndex = 0
    const ChartData = [
        {
            name: "Group A",
            value: correct
        },
        {
            name: "Group B",
            value: totalQ,
        },
    ];

    const renderActiveShape = (props) => {
        const { cx, cy, innerRadius, outerRadius, endAngle, fill } = props;
        return (
            <g>
                <text
                    x={cx}
                    y={cy}
                    dy={8}
                    dx={-10}
                    textAnchor="end"
                    fill={"#4FA4F4"}
                    style={{
                        fontSize: "16px",
                        fontWeight: "700",
                        fontStyle: "Bold",
                    }}>{ChartData[0]?.value}</text>
                <text
                    x={cx}
                    y={cy}
                    dy={8}
                    dx={-8}
                    textAnchor="start"
                    fill={"#787F86"}
                    style={{
                        fontSize: "16px",
                        fontWeight: "700",
                        fontStyle: "Bold",
                    }}>/{ChartData[1]?.value}</text>
                <text
                    x={cx}
                    y={cy}
                    dy={40}
                    textAnchor="middle"
                    style={{
                        fontSize: "14px",
                        fontWeight: "300",
                        color: "#242450",
                        textIndent: "14px",
                    }}
                >Questions</text>
                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    // startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill}
                // strokeWidth={20}
                />
            </g>
        );
    };

    return (
        <PieChart className="pieChart" width={203} height={203} >
            <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={ChartData}
                cx={90}
                cy={80}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                strokeWidth={0}
                // startAngle={90}
                endAngle={700}
                // paddingAngle={5}
                className="pieChartInner"
            >
                {ChartData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            .
        </PieChart>
    );
}

export default ProgressBar
