import React from 'react'
import Message from './message';
import {useAuth} from '../../hooks/useAuth';
import {Navigate} from 'react-router-dom';


function LoginSignUp() {

    const { login, user } = useAuth();
    

    const [page, setPage] = React.useState('login');
    const [message, setMessage] = React.useState({
        show: false,
        message: '',
    });


    const [loginInfo, setLoginInfo] = React.useState({
        email: '',
        password: '',
        name: '',
        phone: ''
    });

    const signUp = (email, name, phone) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("email", email);
        urlencoded.append("name", name);
        urlencoded.append("phone", phone);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("http://localhost:5000/api/auth/signup", requestOptions)
            .then(response => {
                if (response.status === 200) {
                    return response.text();
                }
                else {
                    alert('Something went wrong');
                }
            })
            .then(result => {
               console.log(result);
                setMessage({
                    show: true,
                    message: 'Please check your email to verify your account'
                })
            })
            .catch(error => console.log('error', error));
    };

    const SignIn = (email, password) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("email", email);
        urlencoded.append("password", password);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("http://localhost:5000/api/auth/login", requestOptions)
            .then(response => {
                if (response.status === 200) {
                    return response.text();
                }
                else if(response.status === 400){
                   
                    alert('Please enter valid email and password');
                }
            }).then(result => {
              
                login(result);
            })
            
            .catch(error => console.log('error', error));
    };


    if (user) {
        return <Navigate to="/" />;
      }

    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            {
                message.show ? <Message message={message.message} setPage={setPage} setMessage={setMessage} /> :
                    <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
                        <h1 className="text-3xl font-semibold text-center text-purple-700 uppercase">

                            {page === 'login' ? 'sign in' : 'sign up'}
                        </h1>
                        <form className="mt-6" onSubmit={(e) => {
                            e.preventDefault();
                        }} >
                            <div className="mb-2">
                                <label
                                    for="email"
                                    className="block text-sm font-semibold text-gray-800"
                                >
                                    Email
                                </label>
                                <input
                                    onChange={(e) => setLoginInfo({ ...loginInfo, email: e.target.value })}
                                    value={loginInfo.email}
                                    type="email"
                                    className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                            {page === 'signup' && (
                                <>
                                    <div className="mb-2">
                                        <label
                                            for="email"
                                            className="block text-sm font-semibold text-gray-800"
                                        >
                                            Name
                                        </label>
                                        <input
                                            onChange={(e) => setLoginInfo({ ...loginInfo, name: e.target.value.replace(/[0-9]/g, '') })}
                                            value={loginInfo.name}
                                            type="name"
                                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label
                                            for="phone"
                                            className="block text-sm font-semibold text-gray-800"
                                        >
                                            Phone
                                        </label>
                                        <input
                                            onChange={(e) => setLoginInfo({ ...loginInfo, phone: e.target.value })}
                                            value={loginInfo.phone}
                                            type="number"
                                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                        />
                                    </div>
                                </>
                            )}
                            {page === 'login' && (
                                <>
                                    <div className="mb-2">
                                        <label
                                            for="password"
                                            className="block text-sm font-semibold text-gray-800"
                                        >
                                            Password
                                        </label>
                                        <input
                                            onChange={(e) => setLoginInfo({ ...loginInfo, password: e.target.value })}
                                            value={loginInfo.password}
                                            type="password"
                                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                        />
                                    </div>
                                    <a
                                        href="#"
                                        className="text-xs text-purple-600 hover:underline"
                                    >
                                        Forget Password?
                                    </a>
                                </>
                            )}

                            <div className="mt-6">
                                <button
                                    onClick={(() => {
                                        if (page === 'login') {
                                            console.log('login', loginInfo.email, loginInfo.password);
                                            SignIn(loginInfo.email, loginInfo.password);

                                        } else {
                                            signUp(loginInfo.email, loginInfo.name, loginInfo.phone);
                                        }
                                    })}
                                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                                    {page === 'login' ? 'Sign in' : 'Sign up'}
                                </button>
                            </div>
                        </form>

                        <p className="mt-8 text-xs font-light text-center text-gray-700">
                            {" "}

                            {page === 'login' ? "Don't have an account?" : "Already have an account?"}

                            {" "}
                            <button
                                className="font-medium text-purple-600 hover:underline"
                                onClick={() => setPage(page === 'login' ? 'signup' : 'login')}
                            >
                                {page === 'login' ? "Sign Up" : "Login"}
                            </button>
                        </p>
                    </div>
            }
        </div>
    )
}

export default LoginSignUp