import {useStateContext} from "../context/contextProvider";
import {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";
import axiosClient from "../axios-client";
import {convertLongitude, convertLatitude} from "../utils/converToPercent";
export default function MapScreen () {
    const [longitude, setLongitude] =useState('')
    const [latitude, setLatitude] =useState('')
    const { token, setUser} = useStateContext();

    if (!token) {
        return <Navigate to="/"/>
    }

    useEffect(() => {

        axiosClient.get('/user')
            .then(({data}) => {
                setUser(data)
                const convertedLong = convertLongitude(data.longitude)
                const convertedLat = convertLatitude(data.latitude)
                // const convertedLat = convertLatitude(-25)
                // const convertedLong = convertLongitude(133)
                setLatitude(`${convertedLat-10}%`)
                setLongitude(`${convertedLong}%`)


                console.log(data)
            })
    }, [])
    return (
        <div className='map-container'>
        <div className='map-screen'>

            <span className="mgo-widget-call_pulse m-0" style={{bottom:latitude,left:longitude}}></span>


        </div>
        </div>
    )
}
