import { useState} from "react";
import {Link} from "react-router-dom";


export default function SecondScreen () {
    const[togglePeople, setTogglePeople] = useState(false)





    const handleClickPeople = event => {
        event.preventDefault()
        setTogglePeople(!togglePeople);
    };



    const handleSubmitLogin = ev=> {
        ev.preventDefault()

    }
return (
    <div>
    <div className="menu">
        <ul>
            <li><a onClick={handleClickPeople} className='btn btn-primary text-light mb-3' href="">PEOPLE</a>
                {togglePeople && (
                    // <button type="button"  className='btn btn-dark text-light ms-4 mb-3' data-bs-toggle="modal" data-bs-target="#exampleModal" >MULTI-PASSPORT</button>
                   <p> <Link className='btn btn-dark text-light ms-4 mb-3' to='/signup' >MULTI-PASSPORT</Link></p>
                )}
            </li>

            <li><a  className='btn btn-dark mb-3 text-light' href="">CONSORTIUM</a></li>
            <li><a  className='btn btn-dark text-light' href="">TRILOGY</a></li>
        </ul>

        {/*--------------Login modal-----------*/}
        <div className="modal fade" id="exampleModal2" aria-labelledby="exampleModalLabel2" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body">

                    </div>

                </div>
            </div>

        </div>
    </div>



    </div>
    )
}
