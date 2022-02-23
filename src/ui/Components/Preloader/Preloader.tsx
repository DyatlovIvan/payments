import preloader from '../../Assets/preloader.svg'
import s from './preloader.module.css'

export const Preloader = () =>{
    return <img className={s.preloader} src = {preloader}/>
}