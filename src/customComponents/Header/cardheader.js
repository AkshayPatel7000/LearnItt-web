import React from 'react'
import { ThemeColors } from '../../theme/theme';
import { MathJax } from 'better-react-mathjax';

export function CardHeading(props) {
    const { text, margin = 0, fontFamily = ThemeColors?.font?.cardheading.fontFamily } = props
    const headStyle = {
        // fontFamily:ThemeColors?.font?.cardheading.fontFamily,
        fontWeight: ThemeColors?.font?.cardheading.fontWeight,
        fontSize: ThemeColors?.font?.cardheading.fontSize,
        lineHeight: ThemeColors?.font?.cardheading.lineHeight,
        margin: margin
    }
    return (
        <p style={{ fontFamily: fontFamily, ...headStyle }}>{text}</p>
    )
}
export function CategoryHeading(props) {
    const { text, margin = 0, fontFamily = ThemeColors?.font?.categoryHeading.fontFamily, color } = props
    const headStyle = {
        // fontFamily:ThemeColors?.font?.cardheading.fontFamily,
        fontWeight: ThemeColors?.font?.categoryHeading.fontWeight,
        fontSize: ThemeColors?.font?.categoryHeading.fontSize,
        lineHeight: ThemeColors?.font?.categoryHeading.lineHeight,
        margin: margin,
        color: color || ThemeColors?.font?.categoryHeading?.color
    }
    return (
        <p style={{ fontFamily: fontFamily, ...headStyle }}>{text}</p>
    )
}
export function RobotoblackHeading(props) {
    const { text, margin = 0, fontFamily = ThemeColors?.font?.categoryHeading.fontFamily, color } = props
    const headStyle = {
        // fontFamily:ThemeColors?.font?.cardheading.fontFamily,
        fontWeight: ThemeColors?.font?.categoryHeading.fontWeight,
        fontSize: ThemeColors?.font?.categoryHeading.fontSize,
        lineHeight: ThemeColors?.font?.categoryHeading.lineHeight,
        margin: margin,
        color: color || ThemeColors?.font?.categoryHeading?.color
    }
    return (
        <p style={{ fontFamily: fontFamily, ...headStyle }}>{text}</p>
    )
}
export function RobotMediumHeading(props) {
    const { text, margin = 0, fontFamily = ThemeColors?.font?.RobotMediumHeading.fontFamily, color } = props
    const headStyle = {
        // fontFamily:ThemeColors?.font?.cardheading.fontFamily,
        fontWeight: ThemeColors?.font?.RobotMediumHeading.fontWeight,
        fontSize: ThemeColors?.font?.RobotMediumHeading.fontSize,
        lineHeight: ThemeColors?.font?.RobotMediumHeading.lineHeight,
        margin: margin,
        color: color || ThemeColors?.font?.RobotMediumHeading?.color
    }
    return (
        <p style={{ fontFamily: fontFamily, ...headStyle }}>{text}</p>
    )
}
export function RobotoblackHeading1(props) {
    const { text, margin = 0, fontFamily = ThemeColors?.font?.categoryHeading.fontFamily, color } = props
    const headStyle = {
        // fontFamily:ThemeColors?.font?.cardheading.fontFamily,
        fontWeight: ThemeColors?.font?.categoryHeading.fontWeight,
        fontSize: ThemeColors?.font?.categoryHeading.fontSize,
        lineHeight: ThemeColors?.font?.categoryHeading.lineHeight,
        margin: margin,
        color: color || ThemeColors?.font?.categoryHeading?.color
    }
    return (
        <MathJax>
            <p
                style={{ fontFamily: fontFamily, ...headStyle }}
                dangerouslySetInnerHTML={{
                    __html: text,
                }}
            />
            {/* <p style={{ fontFamily: fontFamily, ...headStyle }}>{text}</p> */}
        </MathJax>
    )
}
export function RobotoTextHeading(props) {
    const { text, margin = 0, fontFamily = ThemeColors?.font?.RobotoTextHeading.fontFamily, color } = props
    const headStyle = {
        // fontFamily:ThemeColors?.font?.cardheading.fontFamily,
        fontWeight: ThemeColors?.font?.RobotoTextHeading.fontWeight,
        fontSize: ThemeColors?.font?.RobotoTextHeading.fontSize,
        lineHeight: ThemeColors?.font?.RobotoTextHeading.lineHeight,
        margin: margin,
        color: color || ThemeColors?.font?.RobotoTextHeading?.color
    }
    return (
        <p style={{ fontFamily: fontFamily, ...headStyle }}>{text}</p>
    )
}
export function RobotgoryHeading(props) {
    const { text, margin = 0, fontFamily = ThemeColors?.font?.RobotgoryHeading.fontFamily, color } = props
    const headStyle = {
        fontFamily: ThemeColors?.font?.RobotgoryHeading.fontFamily,
        fontWeight: ThemeColors?.font?.RobotgoryHeading.fontWeight,
        fontSize: ThemeColors?.font?.RobotgoryHeading.fontSize,
        lineHeight: ThemeColors?.font?.RobotgoryHeading.lineHeight,
        margin: margin,
        color: color || ThemeColors?.font?.RobotgoryHeading?.color
    }
    return (
        <p style={{ fontFamily: fontFamily, ...headStyle }}>{text}</p>
    )
}
export function RobotgoryPremiumVideoText(props) {
    const { text, margin = 0, fontFamily = ThemeColors?.font?.RobotgoryPremiumVideoText.fontFamily, color } = props
    const headStyle = {
        fontFamily: ThemeColors?.font?.RobotgoryPremiumVideoText.fontFamily,
        fontWeight: ThemeColors?.font?.RobotgoryPremiumVideoText.fontWeight,
        fontSize: ThemeColors?.font?.RobotgoryPremiumVideoText.fontSize,
        lineHeight: ThemeColors?.font?.RobotgoryPremiumVideoText.lineHeight,
        margin: margin,
        color: color || ThemeColors?.font?.RobotgoryPremiumVideoText?.color
    }
    return (
        <p style={{ fontFamily: fontFamily, ...headStyle }}>{text}</p>
    )
}
export function RobotgoryHeadingText(props) {
    const { text, margin = 0, fontFamily = ThemeColors?.font?.RobotgoryHeading.fontFamily, color } = props
    const headStyle = {
        fontFamily: ThemeColors?.font?.RobotgoryHeading.fontFamily,
        fontWeight: ThemeColors?.font?.RobotgoryHeading.fontWeight,
        fontSize: ThemeColors?.font?.RobotgoryHeading.fontSize,
        lineHeight: ThemeColors?.font?.RobotgoryHeading.lineHeight,
        margin: margin,
        color: color || ThemeColors?.font?.RobotgoryHeading?.color,
        letterSpacing: ThemeColors?.letterSpacing
    }
    return (
        <p style={{ fontFamily: fontFamily, ...headStyle }}>{text}</p>
    )
}
export function RobotLightHeading(props) {
    const { text, margin = 0, fontFamily = ThemeColors?.font?.RobotLightHeading.fontFamily, color } = props
    const headStyle = {
        fontFamily: ThemeColors?.font?.RobotLightHeading.fontFamily,
        fontWeight: ThemeColors?.font?.RobotLightHeading.fontWeight,
        fontSize: ThemeColors?.font?.RobotLightHeading.fontSize,
        lineHeight: ThemeColors?.font?.RobotLightHeading.lineHeight,
        margin: margin,
        color: color || ThemeColors?.font?.RobotLightHeading?.color
    }
    return (
        <p style={{ fontFamily: fontFamily, ...headStyle }}>{text}</p>
    )
}

export function RobotoTitelHeading(props) {
    const { text, margin = 0, fontFamily = ThemeColors?.font?.RobotoTitelHeading.fontFamily, color } = props
    const headStyle = {
        fontFamily: ThemeColors?.font?.RobotoTitelHeading.fontFamily,
        fontWeight: ThemeColors?.font?.RobotoTitelHeading.fontWeight,
        fontSize: ThemeColors?.font?.RobotoTitelHeading.fontSize,
        lineHeight: ThemeColors?.font?.RobotoTitelHeading.lineHeight,
        margin: margin,
        color: color || ThemeColors?.font?.RobotoTitelHeading?.color
    }
    return (
        <p style={{ fontFamily: fontFamily, ...headStyle }}>{text}</p>
    )
}

export function CardSubHeading1(props) {
    const { text, margin = 0, fontFamily = ThemeColors?.font?.CardSubHeading1.fontFamily, color } = props
    const headStyle = {
        fontFamily: ThemeColors?.font?.CardSubHeading1.fontFamily,
        fontWeight: ThemeColors?.font?.CardSubHeading1.fontWeight,
        fontSize: ThemeColors?.font?.CardSubHeading1.fontSize,
        lineHeight: ThemeColors?.font?.CardSubHeading1.lineHeight,
        margin: margin,
        color: color || ThemeColors?.font?.CardSubHeading1?.color
    }
    return (
        <p style={{ fontFamily: fontFamily, ...headStyle }}>{text}</p>
    )
}

export function RobotodesHeading(props) {
    const { text, margin = 0, fontFamily = ThemeColors?.font?.RobotodesHeading.fontFamily, color } = props
    const headStyle = {
        fontFamily: ThemeColors?.font?.RobotodesHeading.fontFamily,
        fontWeight: ThemeColors?.font?.RobotodesHeading.fontWeight,
        fontSize: ThemeColors?.font?.RobotodesHeading.fontSize,
        lineHeight: ThemeColors?.font?.RobotodesHeading.lineHeight,
        margin: margin,
        color: color || ThemeColors?.font?.RobotodesHeading?.color
    }
    return (
        <p style={{ fontFamily: fontFamily, ...headStyle }}>{text}</p>
    )
}
export function RobotoPrivacyHeading(props) {
    const { text, margin = 0, fontFamily = ThemeColors?.font?.RobotoPrivacyHeading.fontFamily, color } = props
    const headStyle = {
        fontFamily: ThemeColors?.font?.RobotoPrivacyHeading.fontFamily,
        fontWeight: ThemeColors?.font?.RobotoPrivacyHeading.fontWeight,
        fontSize: ThemeColors?.font?.RobotoPrivacyHeading.fontSize,
        lineHeight: ThemeColors?.font?.RobotoPrivacyHeading.lineHeight,
        margin: margin,
        color: color || ThemeColors?.font?.RobotoPrivacyHeading?.color
    }
    return (
        <p style={{ fontFamily: fontFamily, ...headStyle }}>{text}</p>
    )
}


export function RobotoPrivacyHeading1(props) {
    const { text, margin = 0, fontFamily = ThemeColors?.font?.RobotoPrivacyHeading1.fontFamily, color } = props
    const headStyle = {
        fontFamily: ThemeColors?.font?.RobotoPrivacyHeading1.fontFamily,
        fontWeight: ThemeColors?.font?.RobotoPrivacyHeading1.fontWeight,
        fontSize: ThemeColors?.font?.RobotoPrivacyHeading1.fontSize,
        lineHeight: ThemeColors?.font?.RobotoPrivacyHeading1.lineHeight,
        margin: margin,
        color: color || ThemeColors?.font?.RobotoPrivacyHeading1?.color
    }
    return (
        <p style={{ fontFamily: fontFamily, ...headStyle }}>{text}</p>
    )
}





export function RobotoPrivacyTitelHeading(props) {
    const { text, margin = 0, fontFamily = ThemeColors?.font?.RobotoPrivacyTitelHeading.fontFamily, color } = props
    const headStyle = {
        fontFamily: ThemeColors?.font?.RobotoPrivacyTitelHeading.fontFamily,
        fontWeight: ThemeColors?.font?.RobotoPrivacyTitelHeading.fontWeight,
        fontSize: ThemeColors?.font?.RobotoPrivacyTitelHeading.fontSize,
        lineHeight: ThemeColors?.font?.RobotoPrivacyTitelHeading.lineHeight,
        margin: margin,
        color: color || ThemeColors?.font?.RobotoPrivacyTitelHeading?.color
    }
    return (
        <p style={{ fontFamily: fontFamily, ...headStyle }}>{text}</p>
    )
}

export function RobotoPrivacyTitelHeading1(props) {
    const { text, margin = 0, fontFamily = ThemeColors?.font?.RobotoPrivacyTitelHeading1.fontFamily, color } = props
    const headStyle = {
        fontFamily: ThemeColors?.font?.RobotoPrivacyTitelHeading1.fontFamily,
        fontWeight: ThemeColors?.font?.RobotoPrivacyTitelHeading1.fontWeight,
        fontSize: ThemeColors?.font?.RobotoPrivacyTitelHeading1.fontSize,
        lineHeight: ThemeColors?.font?.RobotoPrivacyTitelHeading1.lineHeight,
        margin: margin,
        color: color || ThemeColors?.font?.RobotoPrivacyTitelHeading1?.color
    }
    return (
        <p style={{ fontFamily: fontFamily, ...headStyle }}>{text}</p>
    )
}








export function PriceHeading(props) {
    const { text, margin = 0, fontFamily = ThemeColors?.font?.priceHeading.fontFamily } = props
    const headStyle = {
        // fontFamily:ThemeColors?.font?.cardheading.fontFamily,
        fontWeight: ThemeColors?.font?.priceHeading.fontWeight,
        fontSize: ThemeColors?.font?.priceHeading.fontSize,
        lineHeight: ThemeColors?.font?.priceHeading.lineHeight,
        margin: margin,
        color: ThemeColors?.font?.priceHeading?.color
    }
    return (
        <p style={{ fontFamily: fontFamily, ...headStyle }}>{text}</p>
    )
}
export function VideoPriceHeading(props) {
    const { text, margin = 0, fontFamily = ThemeColors?.font?.videoPriceHeading.fontFamily } = props
    const headStyle = {
        // fontFamily:ThemeColors?.font?.cardheading.fontFamily,
        fontWeight: ThemeColors?.font?.videoPriceHeading.fontWeight,
        fontSize: ThemeColors?.font?.videoPriceHeading.fontSize,
        lineHeight: ThemeColors?.font?.videoPriceHeading.lineHeight,
        margin: margin,
        color: ThemeColors?.font?.videoPriceHeading?.color
    }
    return (
        <p style={{ fontFamily: fontFamily, ...headStyle }}>{text}</p>
    )
}
export function PriceText(props) {
    const { text, margin = 0, fontFamily = ThemeColors?.font?.price.fontFamily } = props
    const headStyle = {
        // fontFamily:ThemeColors?.font?.cardheading.fontFamily,
        fontWeight: ThemeColors?.font?.price.fontWeight,
        fontSize: ThemeColors?.font?.price.fontSize,
        lineHeight: ThemeColors?.font?.price.lineHeight,
        margin: margin,
        color: ThemeColors?.font?.price?.color
    }
    return (
        <p style={{ fontFamily: fontFamily, ...headStyle }}>{text}</p>
    )
}
export function VideoPriceText(props) {
    const { text, margin = 0, fontFamily = ThemeColors?.font?.videoPrice.fontFamily } = props
    const headStyle = {
        // fontFamily:ThemeColors?.font?.cardheading.fontFamily,
        fontWeight: ThemeColors?.font?.videoPrice.fontWeight,
        fontSize: ThemeColors?.font?.videoPrice.fontSize,
        lineHeight: ThemeColors?.font?.videoPrice.lineHeight,
        margin: margin,
        color: ThemeColors?.font?.videoPrice?.color
    }
    return (
        <p style={{ fontFamily: fontFamily, ...headStyle }}>{text}</p>
    )
}
export function AboutText(props) {
    const { text, margin = 0, fontFamily = ThemeColors?.font?.aboutText.fontFamily ,textTransform='uppercase'} = props
    const headStyle = {
        // fontFamily:ThemeColors?.font?.cardheading.fontFamily,
        fontWeight: ThemeColors?.font?.aboutText.fontWeight,
        fontSize: ThemeColors?.font?.aboutText.fontSize,
        lineHeight: ThemeColors?.font?.aboutText.lineHeight,
        margin: margin,
        color: ThemeColors?.font?.aboutText?.color
    }
    return (
        <p style={{ fontFamily: fontFamily, ...headStyle , textTransform:textTransform}}>{text}</p>
    )
}
export function RobotoTextHeadingNormal(props) {

    const { text, margin = 0, fontFamily = ThemeColors?.font?.RobotoTextHeading.fontFamily, color } = props

    const headStyle = {

        // fontFamily:ThemeColors?.font?.cardheading.fontFamily,

        fontWeight: ThemeColors?.font?.RobotMediumHeading.fontWeight,
        fontSize: ThemeColors?.font?.RobotoblackHeading.fontSize,
        lineHeight: ThemeColors?.font?.RobotoTextHeading.lineHeight,
        margin: margin,
        color: color || ThemeColors?.font?.RobotoTextHeading?.color

    }

    return (
        <p style={{ fontFamily: fontFamily, ...headStyle }}>{text}</p>
    )

}