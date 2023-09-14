import React from 'react'
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

export default function RangeSlid({minValue=0,maxValue=2000,range=[0, 2000]}) {
    const handleChange = (data) => {
    
    }
    return (
            <RangeSlider min={minValue} max={maxValue} onInput={handleChange} />
    )
}
