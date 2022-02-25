type DateFormatType = 'point' | 'hyphen'

export const dateHandler = (value:string, format:DateFormatType) =>{

    const data = new Date(value)
    const day = data.getDate().toString().length!==1?data.getDate():'0'+ data.getDate()
    const month = data.getMonth()+1<10 ? '0'+(data.getMonth()+1).toString():data.getMonth()+1
    const year = data.getFullYear()
    return format==='point'? (`${day}.${month}.${year}`) : (`${year}-${month}-${day}`)
}
