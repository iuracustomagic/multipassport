export const convertLongitude = (value) =>{
    if(value<0){
        return (value*50)/180
    } else return (value*50)/180 +50
}

export const convertLatitude = (value) =>{
    if(value<0){
        return (value*50)/90
    } else return (value*50)/90 +50
}