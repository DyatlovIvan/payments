import {ButtonHTMLAttributes, DetailedHTMLProps} from "react";
import s from "./ReusableButton.module.css"

export const ReusableButton = ({value, className, ...props}: ReusableButtonPropsType) => {
    const finalClassName = `${s.button} ${className}`
    return (
        <button className={finalClassName}
                {...props}
        >{value}</button>
    )
}

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
type ReusableButtonPropsType = DefaultButtonPropsType & {
    value: string
}