import {Link} from "react-router-dom";
import { useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../context/ContextProvider.jsx";

export default function Signup() {

    const {setUser, setToken} = useStateContext()
    const [errors, setErrors] = useState(null)
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
    useEffect(() => {
        getCountries();
    }, [])
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

    const onSubmit = ev => {
        ev.preventDefault()

        axiosClient.post('/signup', userReg)
            .then(({data}) => {
                setUser(data.user)
                setToken(data.token);
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors)
                }
            })
    }

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <h5 className="modal-title mb-3" id="exampleModalLabel">Enter your details to receive a multi-passport </h5>
                    {errors &&
                    <div className="alert">
                        {Object.keys(errors).map(key => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                    }
                <form onSubmit={onSubmit}>
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
                        <div className='d-flex align-items-center'>
                            <span className='text-light' >Already registered?</span>
                            <Link className="btn btn-primary ms-2" to='/login'>Sign In</Link>
                        </div>

                    </div>
                </form>


                {/*<form onSubmit={onSubmit}>*/}
                {/*    <h1 className="title">Signup for Free</h1>*/}
                {/*    {errors &&*/}
                {/*    <div className="alert">*/}
                {/*        {Object.keys(errors).map(key => (*/}
                {/*            <p key={key}>{errors[key][0]}</p>*/}
                {/*        ))}*/}
                {/*    </div>*/}
                {/*    }*/}
                {/*    <input ref={nameRef} type="text" placeholder="Full Name"/>*/}
                {/*    <input ref={emailRef} type="email" placeholder="Email Address"/>*/}
                {/*    <input ref={passwordRef} type="password" placeholder="Password"/>*/}
                {/*    <input ref={passwordConfirmationRef} type="password" placeholder="Repeat Password"/>*/}
                {/*    <button className="btn btn-block">Signup</button>*/}
                {/*    <p className="message">Already registered? <Link to="/login">Sign In</Link></p>*/}
                {/*</form>*/}
            </div>
        </div>
    )
}
