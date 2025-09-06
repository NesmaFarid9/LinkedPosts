import {Navbar as NavbarHeroUi, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@heroui/react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { CounterContext } from "../Context/CounterContext";
import { useNavigate } from "react-router-dom";
import { AuthContext } from './../Context/AuthContext';

export default function Navbar() {
    // const [isLoggedIn, ] = useState(localStorage.getItem('token')!=null);

    const {isLoggedIn, setIsLoggedIn, setUserData} = useContext(AuthContext);
    // let {counter} = useContext(CounterContext);

    const navigate = useNavigate();
    function logOut(){
        localStorage.removeItem('token');
        setIsLoggedIn(null);
        setUserData(null);
        navigate('/login');
    }
    return <>
        <NavbarHeroUi>
            <NavbarBrand>
                <NavLink to={'/'} className="font-bold text-inherit">Linked Posts </NavLink>
            </NavbarBrand>
            
            <NavbarContent justify="end">
                {
                    isLoggedIn? <NavbarItem>
                    <NavLink onClick={logOut} className={`flex gap-2`}>Logout</NavLink>
                    <NavLink to={'/profile'}>profile</NavLink>
                </NavbarItem> : <>
                    <NavbarItem className="lg:flex">
                    <NavLink to={'/login'} className={`rounded-2xl outline-blue-600`}>Login</NavLink>
                    </NavbarItem>
                    <NavbarItem>
                        <NavLink to={'/register'}>SignUp</NavLink>
                    </NavbarItem>
                </>
                }
            </NavbarContent>
        </NavbarHeroUi>
    </>
}
