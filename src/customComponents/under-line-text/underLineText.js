import React from 'react'
import styled from 'styled-components'
import { ThemeColors } from '../../theme/theme'

export default function UnderLineText({ text, subText }) {
    const P = styled.p`
        color: ${ThemeColors.primary};
        position: relative;
        font-family: Light;
        font-size: 2rem;
        // &:after {
        //     content: "";
        //     height: 2px;
        //     width: 20%;
        //     background:  ${ThemeColors.primary};
        //     position: absolute;
        //     left: calc(0%);
        //     bottom: -10px;
        // }
        `;
    return (
        <>
            <P>{text}</P>
            <p>{subText}</p>
        </>
    )
}
