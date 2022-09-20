import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loading from '../../../components/Loading';
import { useAuth } from '../../../hooks/useAuth'
import EditDelete from './EditDelete';
import Modal from './Modal';

function CarsList(props) {

    const [modify, setModify] = useState({
        modify: false,
        id: null,
        name: '',
    });

    const [showModal, setShowModal] = useState({
        show: false,
        delete: false,
        _id: '',
        category: '',
        title: '',
        color: '',
        model: '',
        make: '',
        registration_no: '',
        image: ''
    });


    // first loading true then false if page loads first time
    const [firstLoad, setFirstLoad] = useState(true);

    // cras loading animation state if page is loaded first time then false otherwise true
    const [loading, setLoading] = useState(firstLoad ? false : true);

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
        setLoading(firstLoad ? false : true);
        if (firstLoad) {
            getCars();
        }
        else {
            setTimeout(() => {
                getCars();
            }, 800);
        }


    }, [props.Category])

const [change, setChange] = useState(0);
    useEffect(() => {
        
            getCars();
       
       


    }, [change])

    return (

        <div className='mt-10 flex flex-wrap pl-10 '>
            {loading ? <Loading /> : (
                <>
                    <Modal setShowModal={setShowModal} showModal={showModal} change={change} setChange={setChange} />
                    {/* create cards to show cars */}
                    {cars.map((car) => (
                        // show all details of car
                        <div className=" flex flex-col justify-center items-center mx-5 my-4" key={car._id}
                            onMouseOver={() => {
                                setModify({
                                    modify: true,
                                    id: car._id,
                                    name: car.name
                                })
                            }}
                            onMouseLeave={() => {
                                setModify({
                                    modify: false,
                                    id: null,
                                    name: ''
                                })
                            }}
                        >

                            {
                                modify.modify && modify.id === car._id ? <EditDelete setChange={setChange} change={change} car={car} showModal={showModal} setShowModal={setShowModal} setModify={setModify} /> : null
                            }

                            <div className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                                <div className="bg-cover bg-center h-56 p-4" style={{ backgroundImage: `url(${car.image})` }}>
                                    <div className="flex justify-end">
                                        <button className="text-gray-600 focus:outline-none focus:text-gray-500">
                                            <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
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
                                                fillRule="evenodd"
                                                clipRule="evenodd"
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
                                                fillRule="evenodd"
                                                clipRule="evenodd"
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
                                                fillRule="evenodd"
                                                clipRule="evenodd"
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
                                                fillRule="evenodd"
                                                clipRule="evenodd"
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