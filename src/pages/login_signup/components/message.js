import React from 'react'

function Message({message, setPage, setMessage}) {
    return (
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
            {/* show message that come from login api */}
            <div className="flex justify-between">
                <div className="flex items-center">
                    <div className="flex items-center justify-center w-12 h-12 mr-4 text-white bg-blue-500 rounded-full">
                        <svg className="w-6 h-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                            <path d="M12 14l-9 5 9 5 9-5-9-5z"></path>
                            <path d="M12 14L12 3"></path>
                        </svg>
                    </div>
                    <h2 className="text-lg font-semibold text-gray-700">{message}</h2>
                </div>
                <button 
                    onClick={() => {
                        setMessage({
                            show: false,
                            message: '',
                        });
                        setPage('login');
                    }}
                 className="text-sm font-semibold text-blue-500">Login</button>
            </div>
        </div>
    )
}

export default Message