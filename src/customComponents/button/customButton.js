import { ThemeColors } from '../../theme/theme';
export default function CustomButton(props) {
  const { id,title, border, type, width = '100%', height = "48px", background = ThemeColors.primary, color = ThemeColors.white, func, icon, style, iconStyle, titleStyle, disable } = props;
  return (
    <button className='btn d-flex align-items-center justify-content-center gap-2' id={id} disabled={disable} type={type} style={{
      border: border,
      width: width, height: height, background: background, color: color, ...style
    }} onClick={func} >{icon && <div style={{ ...iconStyle }}>{icon}</div>}{title && <div style={{ ...titleStyle }}>{title}</div>}</button>
  )
}




