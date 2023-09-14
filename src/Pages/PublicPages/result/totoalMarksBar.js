import React, { useState } from "react";
import {
    Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis,
    YAxis
} from "recharts";


const TotoalMarksBar = (props) => {
    const data = [
        {

            Correct: props?.Correct,
            Incorrect: props?.Incorrect,
            Skipped: props?.Skipped,
            label: props?.label,
        }
    ];
    const [dimensions, setDimensions] = useState({
        width: 500,
        height: 250
    })
    React.useEffect(() => {
        const handleWindowResize = () => {
            if (window.innerWidth < 1200 && window.innerWidth > 800) {
                return setDimensions({ ...dimensions, width: window.innerWidth / 1.8 })
            }
            if (window.innerWidth <= 800) {
                return setDimensions({ ...dimensions, width: window.innerWidth / 1.5 })
            }
            else {
                return setDimensions({ ...dimensions, width: 800 })
            }
        };
        window.addEventListener('load', handleWindowResize);
        return () => {
            window.removeEventListener('load', handleWindowResize);
        };
    });
    return (
        <div >
            <BarChart
                width={dimensions.width}
                height={dimensions.height}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis dataKey="label" />
                <Tooltip />
                <Legend />
                <Bar dataKey="Correct" fill="#8AD0AF" />
                <Bar dataKey="Incorrect" fill="#D03D3D" />
                <Bar dataKey="Skipped" fill="#4FA4F4" />
            </BarChart>
        </div>
    );
};

export default TotoalMarksBar;
