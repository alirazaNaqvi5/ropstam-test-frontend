import React from 'react';
import Message from './message';
import {useAuth} from '../../hooks/useAuth';


function Login({page, setPage, setLoginInfo, loginInfo}) {

    const { login } = useAuth();
 


  

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
  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            {
            
              
                    <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
                        <h1 className="text-3xl font-semibold text-center text-blue-700 uppercase">

                            sign in
                        </h1>
                        <form className="mt-6" onSubmit={(e) => {
                            e.preventDefault();
                        }} >
                            <div className="mb-2">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-semibold text-gray-800"
                                >
                                    Email
                                </label>
                                <input
                                    onChange={(e) => setLoginInfo({ ...loginInfo, email: e.target.value })}
                                    value={loginInfo.email}
                                    type="email"
                                    className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                            
                            
                                    <div className="mb-2">
                                        <label
                                            htmlFor="password"
                                            className="block text-sm font-semibold text-gray-800"
                                        >
                                            Password
                                        </label>
                                        <input
                                            onChange={(e) => setLoginInfo({ ...loginInfo, password: e.target.value })}
                                            value={loginInfo.password}
                                            type="password"
                                            className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                        />
                                    </div>
                                    {/* <a
                                        href="#"
                                        className="text-xs text-blue-600 hover:underline"
                                    >
                                        Forget Password?
                                    </a> */}

                            <div className="mt-6">
                                <button
                                    onClick={(() => {
                                       
                                            SignIn(loginInfo.email, loginInfo.password);

                                    })}
                                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                                    Sign in
                                </button>
                            </div>
                        </form>

                        <p className="mt-8 text-xs font-light text-center text-gray-700">
                            {" "}

                            Don't have an account?

                            {" "}
                            <button
                                className="font-medium text-blue-600 hover:underline"
                                onClick={() => {
                                    setPage('signup');
                                    console.log('clicked', page)
                                }}
                            >
                               Sign Up
                            </button>
                        </p>
                    </div>
            }
        </div>
  )
        }

export default Login