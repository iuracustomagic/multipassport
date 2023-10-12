import {useStateContext} from "../context/contextProvider";
import {useEffect, useState, useRef, createRef} from "react";
import {Navigate, Link} from "react-router-dom";
import axiosClient from "../axios-client";
import {convertLongitude, convertLatitude} from "../utils/converToPercent";
import sputnikIcon from '../assets/sputnic.png'
import mapIcon from '../assets/label.png'
import sound from '../assets/sound2.mp3'
import infoBoxImage from '../assets/left-box-removebg.png'

export default function MapScreen () {

    const { token, user, setUser, setToken} = useStateContext();
    const soundRef = createRef()
    if (!token) {
        return <Navigate to="/"/>
    }
    const [longitude, setLongitude] =useState('')
    const [latitude, setLatitude] =useState('')
    const [play, setPlay] =useState(true)



    const onSoundToggle = ev => {
        ev.preventDefault()
        // console.log('play1', play)
        // setPlay(!play)
        // console.log('play2', play)
        document.getElementById("backgroundMusic").pause()

    }
    useEffect(() => {
        console.log(play)
        document.addEventListener('mousemove', () => {
            document.getElementById("backgroundMusic").play()
                }, { once: true })


        axiosClient.get('/user')
            .then(({data}) => {
                setUser(data)
                const convertedLong = convertLongitude(data.longitude)
                const convertedLat = convertLatitude(data.latitude)
                // const convertedLat = convertLatitude(-21)
                // const convertedLong = convertLongitude(24)
                setLatitude(`${convertedLat-7}%`)
                setLongitude(`${convertedLong}%`)


                console.log(data)
            })
    }, [])


    return (
        <div className='map-container'>
        <div className='map-screen'>
            {/*<a onClick={onLogout} className='btn btn-outline-danger exit_icon' href='#'>*/}
            {/*    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor"*/}
            {/*         className="bi bi-box-arrow-right" viewBox="0 0 16 16">*/}
            {/*        <path fillRule="evenodd"*/}
            {/*              d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>*/}
            {/*        <path fillRule="evenodd"*/}
            {/*              d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>*/}
            {/*    </svg>*/}
            {/*</a>*/}

            <span className="mgo-widget-call_pulse m-0" style={{bottom:latitude,left:longitude}}></span>
            <a onClick={onSoundToggle} href="#"><img className='map_icon' src={mapIcon} alt=""/></a>
            <a href="#"><img className='sputnik_icon' src={sputnikIcon} alt=""/></a>
            <audio ref={soundRef} preload='true' autoPlay loop id="backgroundMusic" src={sound} >
                {/*<source src={sound} type="audio/mpeg"/>*/}
                Your browser does not support the audio element.
            </audio>
            <div className='info_box_image'>
                <Link className='exit_link' to='/enter'>EXIT</Link>
                <div className="info_box_text row">
                    <ul className='text-light col-sm-6'>
                        <li>Name</li>
                        <li>Country</li>
                        <li>City</li>
                        <li>Latitude</li>
                        <li>Longitude</li>
                    </ul>
                    <ul className='text-light col-sm-6'>
                        <li>{user.name}</li>
                        <li>{user.country_name}</li>
                        <li>{user.city_name}</li>
                        <li>{user.latitude}</li>
                        <li>{user.longitude}</li>
                    </ul>

                </div>
            </div>

        </div>
        </div>
    )
}
