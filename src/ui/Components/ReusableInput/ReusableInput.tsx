import {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent} from "react";
import s from './ReusableInput.module.css'

export type InputType = 'text' | 'password' | 'email'
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type ReusableInputPropsType = DefaultInputPropsType & { // и + ещё пропсы которых нет в стандартном инпуте
    onChangeText?: (value: string) => void
    onEnter?: () => void
    spanClassName?: string
    value?: string
    inputType?: string | InputType
}

export const ReusableInput = ({placeholder, disabled, onChange,
                                  onChangeText, onKeyPress, onEnter,
                                  value, inputType
                              }: ReusableInputPropsType) => {

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {

        onChange && onChange(e)
        onChangeText && onChangeText(e.currentTarget.value)
    }
    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e);
        onEnter && e.key === 'Enter' && onEnter()
    }

    return (
        <div>
            <input
                value={value}
                type={inputType}
                onChange={onChangeCallback}
                onKeyPress={onKeyPressCallback}
                className={s.input}
                placeholder={placeholder}
                disabled={disabled}
            />
        </div>
    )
}