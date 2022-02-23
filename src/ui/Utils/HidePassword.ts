import {InputType} from "../Components/ReusableInput/ReusableInput";
import {INPUT_TYPE} from "../Enums/InputType";

export const hidePassword = (inputType:InputType) =>{
    return inputType === INPUT_TYPE.PASSWORD ? INPUT_TYPE.TEXT : INPUT_TYPE.PASSWORD
}