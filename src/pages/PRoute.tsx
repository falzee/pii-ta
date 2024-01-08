import { ReactNode, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import {Navigate, useLocation, useNavigate} from "react-router-dom"
import { reset } from "../app/authSlice";

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
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        if(!isLogin && !isAuthenticated && !isAuthenticatedTwo) {
            dispatch(reset())
            // navigate(-1); 
            navigate('/login' , { replace: true }); 
        }else {
            setLoading(false);
        }
        
    }, [dispatch,isLogin,isAuthenticated,isAuthenticatedTwo,location]);

    return loading ? null : children;//to prevent route leak during loading
};

export default ProtectedRoute;

// dipake klo make api sendiri (bukan public api)
// future feature
// import { ReactNode, useEffect, useState } from "react";
// import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
// import { Navigate, useLocation, useNavigate } from "react-router-dom";
// import { reset } from "../app/authSlice";
// import jwt_decode from "jsonwebtoken/decode";

// interface Props {
//   children?: ReactNode;
//   // any props that come into the component
// }

// const ProtectedRoute = ({ children }: Props) => {
//   const { isLogin, token } = useAppSelector((state) => state.auth);
//   const jwtToken = localStorage.getItem("jwtToken");
//   const isAuthenticatedTwo = jwtToken !== null;
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useAppDispatch();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const checkTokenExpiration = () => {
//       if (!isAuthenticatedTwo) {
//         return false;
//       }

//       try {
//         const decodedToken: any = jwt_decode(jwtToken!);

//         // Get the expiration time from the decoded token
//         const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds

//         // Get the current time
//         const currentTime = Date.now();

//         // Check if the token is expired
//         const isTokenExpired = expirationTime < currentTime;

//         return !isTokenExpired;
//       } catch (error) {
//         // Handle invalid or expired token
//         return false;
//       }
//     };

//     const handleAuthentication = () => {
//       if (!isLogin && !checkTokenExpiration()) {
//         dispatch(reset());
//         navigate("/login", { replace: true });
//       } else {
//         setLoading(false);
//       }
//     };

//     handleAuthentication();
//   }, [dispatch, isLogin, isAuthenticatedTwo, jwtToken, navigate]);

//   return loading ? null : children; // to prevent route leak during loading
// };

// export default ProtectedRoute;


