import { ReactNode, useEffect } from "react";
import { useAppSelector } from "../hooks/reduxHooks";
import {Navigate, useLocation, useNavigate} from "react-router-dom"

interface Props {
    children?: ReactNode
    // any props that come into the component
}

const ProtectedRoute = ({children}:Props) => {
    
    const {isLogin,token} = useAppSelector((state) => state.auth);
    const jwtToken = localStorage.getItem('jwtToken');
    const isAuthenticated = jwtToken === token  ;
    const isAuthenticatedTwo = jwtToken !== null;
    const navigate = useNavigate();
    const location = useLocation();
    
    useEffect(() => {
        if(!isLogin && !isAuthenticated && !isAuthenticatedTwo) {
            navigate('/login' , { replace: true }); 
        }
        
    }, [isLogin,isAuthenticated,isAuthenticatedTwo,location]);

    return children

};

export default ProtectedRoute;
