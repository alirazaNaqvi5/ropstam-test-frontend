import React, { useEffect } from 'react'
import { useAuth } from '../../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';


function LoginSignUp() {
    const { user } = useAuth();
    const [page, setPage] = React.useState('login');

    const [loginInfo, setLoginInfo] = React.useState({
        email: '',
        password: '',
        name: '',
        phone: ''
    });







    if (user) {
        return <Navigate to="/" />;
    }

    return (
        page === 'login'? 
            <Login page={page} setPage={setPage} setLoginInfo={setLoginInfo} loginInfo={loginInfo}/>

        :

            <SignUp page={page} setPage={setPage} setLoginInfo={setLoginInfo} loginInfo={loginInfo}/>

    )
}

export default LoginSignUp