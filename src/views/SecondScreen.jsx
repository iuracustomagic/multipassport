import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axiosClient from "../axios-client";
import {useStateContext} from "../context/contextProvider";
import { useForm } from 'react-hook-form';

export default function SecondScreen () {
    const[togglePeople, setTogglePeople] = useState(false)
    const[countries, setCountries] = useState([])
    const[cities, setCities] = useState([])

    const [userReg, setUserReg] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        country_id: 0,
        city_id: 0
    })
    const [userLog, setUserLog] = useState({
        email: '',
        password: '',
    })
    const {
        handleSubmit: handleFirstFormSubmit
    } = useForm({
        defaultValues: userReg
    })
    const {
        handleSubmit: handleSecondFormSubmit
    } = useForm({
        defaultValues: userLog
    })
    const { setUser, setToken } = useStateContext()

    useEffect(() => {
        getCountries();
    }, [])

    const handleClickPeople = event => {
        event.preventDefault()
        setTogglePeople(!togglePeople);
    };
    const handleCountrySelect = event => {
        event.preventDefault()
        console.log('handleCountrySelect')
        console.log(event.target.value)
        const id = event.target.value
        setUserReg({...userReg, country_id: Number(id)})
        axiosClient.get(`/country/${id}`)
            .then(({ data }) => {
                console.log(data)
                setCities(data)
            })
            .catch((er) => {
                console.log(er)
            })
    };
    const handleCitySelect = event => {
        event.preventDefault()
        console.log('handleCitySelect')
        const id = event.target.value
        setUserReg({...userReg, city_id: Number(id)})

    };

    // const handleClickPassport = event => {
    //     event.preventDefault()
    //     setTogglePassport(!togglePassport);
    // };
    const getCountries = () => {

        axiosClient.get('/countries')
            .then(({ data }) => {
                console.log(data)
                setCountries(data)
            })
            .catch((er) => {
                console.log(er)
            })
    }

    const handleSubmit = ev=> {
        ev.preventDefault()


        console.log('userReg', userReg)
        axiosClient.post('/signup', userReg)
            .then(({data}) => {
                setUser(data.user);
                setToken(data.token);

            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    // setErrors(response.data.errors)
                }
            })
    }
    const handleSubmitLogin = ev=> {
        ev.preventDefault()

        //
        console.log('userLog', userLog)
        // axiosClient.post('/signup', userReg)
        //     .then(({data}) => {
        //         setUser(data.user);
        //         setToken(data.token);
        //
        //     })
        //     .catch(err => {
        //         const response = err.response;
        //         if (response && response.status === 422) {
        //             // setErrors(response.data.errors)
        //         }
        //     })
    }
return (
    <div>
    <div className="menu">
        <ul>
            <li><a onClick={handleClickPeople} className='btn btn-primary text-light mb-3' href="">PEOPLE</a>
                {togglePeople && (<p><button type="button"  className='btn btn-dark text-light ms-4 mb-3' data-bs-toggle="modal" data-bs-target="#exampleModal" >MULTI-PASSPORT</button></p>)}
            </li>

            <li><a  className='btn btn-dark mb-3 text-light' href="">CONSORTIUM</a></li>
            <li><a  className='btn btn-dark text-light' href="">TRILOGY</a></li>
        </ul>
        {/*--------------Register modal-----------*/}
        <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body">
                        <h5 className="modal-title mb-3" id="exampleModalLabel">Enter your details to receive a multi-passport </h5>
                        <form onSubmit={handleFirstFormSubmit(handleSubmit)}>
                            <div className="input-group mb-3">
                                <input className='form-control bg-dark text-light' value={userReg.name} onChange={ev => setUserReg({...userReg, name: ev.target.value})} placeholder="Name"/>
                            </div>
                            <div className="input-group mb-3">
                                <select name="country" className="form-select bg-dark text-light" onChange={handleCountrySelect} aria-label="Default select example">
                                    <option value="0">Country</option>
                                    {countries && countries.map(country => (
                                        <option key={country.id}  value={country.id}>{country.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="input-group mb-3">
                                <select name="country" className="form-select bg-dark text-light" onChange={handleCitySelect} aria-label="Default select example">
                                    <option value="0">Town</option>
                                    {cities && cities.map(city => (
                                        <option key={city.id} value={city.id}>{city.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="input-group mb-3">
                                <input className='form-control bg-dark text-light'  type="password" onChange={ev => setUserReg({...userReg, password: ev.target.value})} placeholder="Password"/>
                            </div>
                            <div className="input-group mb-3">
                                <input className='form-control bg-dark text-light' type="password" onChange={ev => setUserReg({...userReg, password_confirmation: ev.target.value})} placeholder="Password Confirmation"/>
                            </div>
                            <div className="input-group mb-3">
                            <input className='form-control bg-dark text-light' type='email' value={userReg.email} onChange={ev => setUserReg({...userReg, email: ev.target.value})} placeholder="Email"/>
                            </div>
                            <div className='d-flex justify-content-around align-items-center'>

                                <button type="submit" className="btn btn-primary px-4" data-bs-dismiss="modal">Signup</button>
                                <div className='d-flex'>
                                    <span >Already registered?</span>
                                    <button className="btn btn-primary ms-2" type='button' data-bs-target="#exampleModal2" data-bs-toggle="modal" data-bs-dismiss="modal">Sign In</button>
                                </div>

                            </div>
                        </form>
                    </div>

                </div>
            </div>

        </div>
        {/*--------------Login modal-----------*/}
        <div className="modal fade" id="exampleModal2" aria-labelledby="exampleModalLabel2" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body">
                        <h5 className="modal-title mb-3" id="exampleModalLabel">Enter your details to login </h5>
                        <form onSubmit={handleSecondFormSubmit(handleSubmitLogin)}>

                            <div className="input-group mb-3">
                                <input className='form-control bg-dark text-light' type='email' value={userLog.email} onChange={ev => setUserLog({...userLog, email: ev.target.value})} placeholder="Email"/>
                            </div>
                            <div className="input-group mb-3">
                                <input className='form-control bg-dark text-light'  type="password" onChange={ev => setUserLog({...userLog, password: ev.target.value})} placeholder="Password"/>
                            </div>


                            <div className='d-flex justify-content-around align-items-center'>

                                <button type="submit" className="btn btn-primary px-4" data-bs-dismiss="modal">Sign In</button>
                                <button type='button' className="btn btn-primary" data-bs-target="#exampleModal" data-bs-toggle="modal" data-bs-dismiss="modal">Back to Signup</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>

        </div>
    </div>



    </div>
    )
}
