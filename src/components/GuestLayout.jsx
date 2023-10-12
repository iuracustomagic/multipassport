import {Navigate, Outlet} from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";

export default function GuestLayout() {
    const {  token } = useStateContext();

    // if (token) {
    //     return <Navigate to="/map" />;
    // }

    return (
        <div id="guestLayout">
            <Outlet />
        </div>
    );
}
