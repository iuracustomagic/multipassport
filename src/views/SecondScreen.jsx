import { useState} from "react";
import {Link} from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client";

export default function SecondScreen () {
    const[togglePeople, setTogglePeople] = useState(false)
    const {  token, user, setUser, setToken } = useStateContext();




    const handleClickPeople = event => {
        event.preventDefault()
        setTogglePeople(!togglePeople);
    };



    const onLogout = ev => {
        ev.preventDefault()
        axiosClient.post('/logout')
            .then(() => {
                setUser({})
                setToken(null)

            })
    }
return (
    <div>
    <div className="menu">
        {token && (
            <a onClick={onLogout} className='btn btn-outline-danger exit_icon' href='#'>
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor"
                     className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                    <path fillRule="evenodd"
                          d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                    <path fillRule="evenodd"
                          d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                </svg>
            </a>

        )

        }
        <ul>
            <li><a onClick={handleClickPeople} className='btn btn-primary text-light mb-3' href="">PEOPLE</a>
                {togglePeople && (
                    <div>
                     {/*<button type="button"  className='btn btn-dark text-light ms-4 mb-3' data-bs-toggle="modal" data-bs-target="#exampleModal" >MULTI-PASSPORT</button>*/}

                {token ? (
                    <div>
                        <p> <button type="button"  className='btn btn-dark text-light ms-4 mb-3' data-bs-toggle="modal" data-bs-target="#exampleModal" >MULTI-PASSPORT</button></p>
                    <p> <Link className='btn btn-dark text-light ms-4 mb-3' to='/enter' >POPULATION STATISTICS</Link></p>
                    <p> <Link className='btn btn-dark text-light ms-4 mb-3' to='/map' >MAPS</Link></p>
                    <p> <Link className='btn btn-dark text-light ms-4 mb-3' to='/enter' >MESSENGER</Link></p>
                    </div>
                    ): (
                    <p> <Link className='btn btn-dark text-light ms-4 mb-3' to='/login' >MULTI-PASSPORT</Link></p>
                )}
                    </div>
                )}
            </li>

            <li><a  className='btn btn-dark mb-3 text-light' href="">CONSORTIUM</a></li>
            <li><a  className='btn btn-dark text-light' href="">TRILOGY</a></li>
        </ul>

        {/*--------------Login modal-----------*/}
        <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content info_box_user">
                    <div className="modal-body row">
                        <ul className='text-light col-sm-6'>
                            <li>Im</li>
                            <li>Name</li>
                            <li>Country</li>
                            <li>City</li>
                        </ul>
                        <ul className='text-light col-sm-6'>
                            <li>{user.id}</li>
                            <li>{user.name}</li>
                            <li>{user.name}</li>
                            <li>{user.name}</li>
                        </ul>

                    </div>

                </div>
            </div>

        </div>
    </div>



    </div>
    )
}
