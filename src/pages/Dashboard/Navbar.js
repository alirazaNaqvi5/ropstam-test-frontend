import React from 'react'
import {useAuth} from '../../hooks/useAuth'
import { Link } from 'react-router-dom';

function Navbar() {

    const { logout } = useAuth();

    return (
        <header className="text-gray-600 body-font">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                    <img src="https://www.ropstam.com/wp-content/uploads/2022/09/Ropstam-Logo.svg" alt="ropstam logo" className=" h-10" />
                    <span className="ml-3 text-xl">Test Project</span>
                </a>
                <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
                    <Link className="mr-5 hover:text-gray-900 font-bold">First Link</Link>
                    <Link className="mr-5 hover:text-gray-900 font-bold">Second Link</Link>
                    <Link className="mr-5 hover:text-gray-900 font-bold">Third Link</Link>
                    <Link className="mr-5 hover:text-gray-900 font-bold">Fourth Link</Link>
                </nav>
                <button
                    onClick={() => {
                        logout();
                      }}
                className="inline-flex items-center bg-purple-700 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 text-white hover:text-black rounded text-base mt-4 md:mt-0">
                    Logout
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                </button>
            </div>
        </header>
    )
}

export default Navbar