import React from 'react'
import { ThemeColors } from '../../theme/theme';
import styled from 'styled-components';
export default function CardSubHeading(props) {
    const { text,margin=0 } = props
    const StyledText = styled.p`
    margin:${margin};
    padding:0;
    font-size:${ThemeColors.font.cardSubHeading.fontSize};
    font-family:'Medium';
    `;
        return (
            <StyledText>{text}</StyledText>
        )
}
