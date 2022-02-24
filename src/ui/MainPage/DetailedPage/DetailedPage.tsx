import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";

export const DetailedPage = () =>{
    const dispatch = useDispatch()
    debugger
    const params = useParams<'id'>()

    const id = params.id
    debugger
    return(
        <div>
            page
        </div>
    )
}