import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loading from '../../components/Loading';
import { useAuth } from '../../hooks/useAuth'

function CarsList(props) {

    const [firstLoad, setFirstLoad] = useState(true);
    const [loading, setLoading] = useState(firstLoad? false : true);

    const { user } = useAuth();

    const [cars, setCars] = useState([])

    // api call to get all cars function
    const getCars = () => {
        if (props.Category === 'All') {
            axios.get('http://localhost:5000/api/cars', {
                headers: {
                    'x-access-token': JSON.parse([user]).token
                }
            })
                .then(res => {
                    console.log(res.data);
                    setCars(res.data)
                    setLoading(false);
                    setFirstLoad(false);
                })
                .catch(err => {
                    console.log(err)
                    alert('Error in fetching cars', err)
                }
                )
        }
        else {
            axios.get(`http://localhost:5000/api/cars/category/${props.Category}`, {
                headers: {
                    'x-access-token': JSON.parse([user]).token
                }

            })
                .then(res => {
                    console.log(res.data)
                    setCars(res.data)
                    setLoading(false);
                    setFirstLoad(false);

                })
                .catch(err => {
                    console.log(err)
                    alert('Error in fetching cars', err)
                }
                )
        }
    }



    useEffect(() => {
        setLoading(firstLoad? false : true);
        console.log(props.Category);
        if (firstLoad) {
            getCars();
        }
        else {
            setTimeout(()=>{
                getCars();
            }, 800);   
        }


    }, [props.Category])

    return (

        <div className='mt-10 flex flex-wrap items-center justify-center'>
            {loading ? <Loading/> : (
                <>
                    {/* create cards to show cars */}
                    {cars.map((car) => (
                        // show all details of car
                        <div className=" flex flex-col justify-center items-center mx-5 my-4  ">
                            <div className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                                <div className="bg-cover bg-center h-56 p-4" style={{ backgroundImage: `url(${car.image})` }}>
                                    <div className="flex justify-end">
                                        <button className="text-gray-600 focus:outline-none focus:text-gray-500">
                                            <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                                                <path
                                                    fill-rule="evenodd"
                                                    clip-rule="evenodd"
                                                    d="M12 21a9 9 0 100-18 9 9 0 000 18zm0-2a7 7 0 110-14 7 7 0 010 14zm-1-9h2v5H11v-5zm0-3h2v2H11V7z"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h1 className="text-gray-900 font-bold text-2xl">
                                        <span className='font-normal'>Title: </span>
                                        {car.title}
                                    </h1>
                                    <p className="mt-1 text-gray-600 text-sm">
                                        <span className='font-normal'>Category: </span>
                                        {car.category}
                                    </p>
                                    <div className="flex items-center mt-4 text-gray-700">
                                        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M12 21a9 9 0 100-18 9 9 0 000 18zm0-2a7 7 0 110-14 7 7 0 010 14zm-1-9h2v5H11v-5zm0-3h2v2H11V7z"></path>
                                        </svg>
                                        <h1 className="text-gray-700 font-bold text-xl ml-2">
                                            <span className='font-normal'>Registration No: </span>
                                            {car.registration_no}
                                        </h1>
                                    </div>
                                    <div className="flex items-center mt-4 text-gray-700">
                                        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M12 21a9 9 0 100-18 9 9 0 000 18zm0-2a7 7 0 110-14 7 7 0 010 14zm-1-9h2v5H11v-5zm0-3h2v2H11V7z"></path>
                                        </svg>
                                        <h1 className="text-gray-700 font-bold text-xl ml-2">
                                            <span className='font-normal'>Make: </span>
                                            {car.make}
                                        </h1>
                                    </div>
                                    <div className="flex items-center mt-4 text-gray-700">
                                        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M12 21a9 9 0 100-18 9 9 0 000 18zm0-2a7 7 0 110-14 7 7 0 010 14zm-1-9h2v5H11v-5zm0-3h2v2H11V7z"></path>
                                        </svg>
                                        <h1 className="text-gray-700 font-bold text-xl ml-2">
                                            <span className='font-normal'>Model: </span>
                                            {car.model}
                                        </h1>
                                    </div>
                                    <div className="flex items-center mt-4 text-gray-700">
                                        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M12 21a9 9 0 100-18 9 9 0 000 18zm0-2a7 7 0 110-14 7 7 0 010 14zm-1-9h2v5H11v-5zm0-3h2v2H11V7z"></path>
                                        </svg>
                                        <h1 className="text-gray-700 font-bold text-xl ml-2">
                                            <span className='font-normal'>Color: </span>
                                            {car.color}
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </div>

                    ))}
                </>
            )}

    </div>
    )
}

export default CarsList