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
        console.log(convertLongitude(52.54))
        console.log(convertLatitude(103.89))
        axiosClient.get('/user')
            .then(({data}) => {
                setUser(data)
                const convertedLong = convertLongitude(data.longitude)
                const convertedLat = convertLatitude(data.latitude)
                // const convertedLong = convertLongitude(37.6)
                // const convertedLat = convertLatitude(55.7)
                setLongitude(`${convertedLong}%`)
                setLatitude(`${convertedLat}%`)

                console.log(data)
            })
    }, [])
    return (
        <div className='map-screen'>

            <span className="mgo-widget-call_pulse" style={{bottom:latitude,left:longitude}}></span>


        </div>
    )
}
