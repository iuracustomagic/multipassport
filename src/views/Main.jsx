
import {Link} from "react-router-dom";

export default function Main () {
// const[toggle, setToggle] = useState(false)
// const[togglePeople, setTogglePeople] = useState(false)

    // const handleClick = event => {
    //     event.preventDefault()
    // setToggle(!toggle);
    // };

return (
    <div className='d-flex'>

    <div className="main_container">
        {/*<video src={video} muted loop autoPlay></video>*/}
        {/*<div className="overlay"></div>*/}
        <div className='text-light'>
            <h1 className='text-uppercase mb-3 title'>I didn't say it was possible; I said it already happened</h1>
            <div className='d-flex justify-content-end'>
                <Link to='/enter' className='btn btn-light fst-italic toggle fs-3' type='button'>Earth 2.0</Link>
            </div>

        </div>

    </div>


    </div>
    )
}
