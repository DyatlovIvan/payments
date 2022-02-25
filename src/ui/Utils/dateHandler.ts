export const dateHandler = (value:string) =>{
    const data = new Date(value)
    const day = data.getDay().toString().length!==1?data.getDay():'0'+ data.getDay()
    const month = data.getMonth()+1<10 ? '0'+(data.getMonth()+1).toString():data.getMonth()+1
    const year = data.getFullYear()
    return (`${day}.${month}.${year}`)
}
