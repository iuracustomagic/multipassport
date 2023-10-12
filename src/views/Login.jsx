import {Link, Navigate} from "react-router-dom";
import axiosClient from "../axios-client.js";
import {createRef} from "react";
import {useStateContext} from "../context/ContextProvider.jsx";
import { useState } from "react";

export default function Login() {

    const { setUser, setToken, token } = useStateContext()



    if (token) {
        return <Navigate to="/map" />;
    }

    const [message, setMessage] = useState(null)
    const [userLog, setUserLog] = useState({
        email: '',
        password: '',
    })

    const onSubmit = ev => {
        ev.preventDefault()
        if(userLog.email.length === 0){
            setMessage('Enter email')
            return
        }
        if(userLog.password.length === 0){
            setMessage('Enter password')
            return
        }
        axiosClient.post('/login', userLog)
            .then(({data}) => {
                setUser(data.user)
                setToken(data.token);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    setMessage('Invalid email or password')
                }
            })
    }

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="login_form_container">

                <form onSubmit={onSubmit} className='login_form'>

                    <div className="row">
                        <div className="col-sm-6">
                            <Link className="btn bg-light btn-outline-dark" to='/signup'>Login as observer</Link>
                        </div>
                        <div className="col-sm-6 d-flex flex-column align-items-end">
                            {message &&
                            <div className="alert text-danger">
                                <p>{message}</p>
                            </div>
                            }
                            <div className="input-group mb-3">
                                <input className='form-control text-dark' type='email' value={userLog.email} onChange={ev => setUserLog({...userLog, email: ev.target.value})} placeholder="Email"/>
                            </div>
                            <div className="input-group mb-3">
                                <input className='form-control text-dark'  type="password" onChange={ev => setUserLog({...userLog, password: ev.target.value})} placeholder="Password"/>
                            </div>


                            <div className='d-flex justify-content-around align-items-center'>

                                <button type="submit" className="btn bg-light btn-outline-dark px-4" data-bs-dismiss="modal">Start</button>

                            </div>
                        </div>
                    </div>


                </form>
                {/*<form onSubmit={onSubmit}>*/}
                {/*    <h1 className="title">Login into your account</h1>*/}

                {/*    {message &&*/}
                {/*    <div className="alert">*/}
                {/*        <p>{message}</p>*/}
                {/*    </div>*/}
                {/*    }*/}

                {/*    <input ref={emailRef} type="email" placeholder="Email"/>*/}
                {/*    <input ref={passwordRef} type="password" placeholder="Password"/>*/}
                {/*    <button className="btn btn-block">Login</button>*/}
                {/*    <p className="message">Not registered? <Link to="/signup">Create an account</Link></p>*/}
                {/*</form>*/}
            </div>
        </div>
    )
}
