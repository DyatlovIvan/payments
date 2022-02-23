import axios from "axios";

const instance = axios.create({
    baseURL:'https://621473c589fad53b1f142ad3.mockapi.io/api/v1/'
})

export const authAPI ={
    login(email:string,password:string){
      return instance.get('/auth',{params:{password}})
          .then(res=>res.data)
    },
    register(email:string,password:string){
        return instance.post('/auth',{email,password})
    }
}

export type ResponseType = {
    email:string
    password:string
    id:string
}