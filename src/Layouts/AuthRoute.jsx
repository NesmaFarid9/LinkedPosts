import React, { useContext} from 'react'
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

export default function AuthRoute({children}) {
    let {isLoggedIn} = useContext(AuthContext);
    // const [isLoggedIn,] = useState(localStorage.getItem('token')!=null);
    return !isLoggedIn? children: <Navigate to={'/'}/>
}
