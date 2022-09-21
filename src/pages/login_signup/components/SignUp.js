import React from 'react';
import Message from './message';


function SignUp({page, setPage, setLoginInfo, loginInfo}) {


    const [message, setMessage] = React.useState({
        show: false,
        message: '',
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
                    return response.json();
                }
                else {
                    alert('Something went wrong');
                }
            })
            .then(result => {
                console.log( "result =====>", result);
                if(result.email){
                    setMessage({
                    show: true,
                    message: 'Please check your email to verify your account'
                })
                }
                else if(result.message){
                    setMessage({
                        show: true,
                        message: result.message
                    })
                }
            })
            .catch(error => {
                console.log('error ===== >', error)
                if(error.response.data.message){
                    setMessage({
                    show: true,
                    message: error.response.data.message
                })
                }
            });
    };


    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            {
                // if message state is true then show message, othwise show SignUp form
                message.show ?
                 <Message message={message.message} setPage={setPage} setMessage={setMessage} /> 
                 :
                    <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
                        <h1 className="text-3xl font-semibold text-center text-blue-700 uppercase">
                            sign up
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
                                    className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                            
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
                                            className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
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
                                            className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                        />
                                    </div>
                               
                            
                            <div className="mt-6">
                                <button
                                    onClick={(() => {
                                       
                                            signUp(loginInfo.email, loginInfo.name, loginInfo.phone);
                                        
                                    })}
                                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                                    Sign up
                                </button>
                            </div>
                        </form>

                        <p className="mt-8 text-xs font-light text-center text-gray-700">
                            {" "}

                            Already have an account?

                            {" "}
                            <button
                                className="font-medium text-blue-600 hover:underline"
                                onClick={() => setPage(page === 'login' ? 'signup' : 'login')}
                            >
                                Login
                            </button>
                        </p>
                    </div>
            }
        </div>
    )
}

export default SignUp