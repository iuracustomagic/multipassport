import {Link} from "react-router-dom";
import axiosClient from "../axios-client.js";
import {createRef} from "react";
import {useStateContext} from "../context/ContextProvider.jsx";
import { useState } from "react";

export default function Login() {
    const emailRef = createRef()
    const passwordRef = createRef()
    const { setUser, setToken } = useStateContext()
    const [message, setMessage] = useState(null)
    const [userLog, setUserLog] = useState({
        email: '',
        password: '',
    })

    const onSubmit = ev => {
        ev.preventDefault()


        axiosClient.post('/login', userLog)
            .then(({data}) => {
                setUser(data.user)
                setToken(data.token);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    setMessage(response.data.message)
                }
            })
    }

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <h5 className="modal-title mb-3" id="exampleModalLabel">Enter your details to login </h5>
                    {message &&
                    <div className="alert text-light">
                        <p>{message}</p>
                    </div>
                    }
                <form onSubmit={onSubmit}>

                    <div className="input-group mb-3">
                        <input className='form-control bg-dark text-light' type='email' value={userLog.email} onChange={ev => setUserLog({...userLog, email: ev.target.value})} placeholder="Email"/>
                    </div>
                    <div className="input-group mb-3">
                        <input className='form-control bg-dark text-light'  type="password" onChange={ev => setUserLog({...userLog, password: ev.target.value})} placeholder="Password"/>
                    </div>


                    <div className='d-flex justify-content-around align-items-center'>

                        <button type="submit" className="btn btn-primary px-4" data-bs-dismiss="modal">Sign In</button>
                        <Link className="btn btn-primary" to='/signup'>Back to Signup</Link>
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
