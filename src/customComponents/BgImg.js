import React from 'react'

import { SvgGroup } from '../assets/svg'
import img from '../assets/images/Rectangle 6.png'

export default function BgImg() {
    return (
        <div className="imgContainer">
            <img src={img} alt="background" style={{ width: '100%' }} />

            <div className="centered"><SvgGroup /></div>
        </div>
    )
}
