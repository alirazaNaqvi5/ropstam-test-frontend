import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import axios from 'axios';

function AddNewCar(props) {
    const { user } = useAuth();
    const [modal, setModal] = useState(false);
    const [car, setCar] = useState({
        name: '',
        category: '',
        title: '',
        color: '',
        model: '',
        make: '',
        registration_no: '',
    });

    const [category, setCategory] = useState([]);
    useEffect(() => {
        // call api localhost:5000/api/cat to get all categories with x-access-token in header
        axios.get('http://localhost:5000/api/cat', {
            headers: {
                'x-access-token': JSON.parse([user]).token
            }
        })
            .then(res => {
                const data = res.data.map((item) => {
                    return {
                        name: item.name,
                        id: item._id
                    }
                })
                setCategory(data);
                // props.setCategory(data[0].name);
            })
    }, []);


    // creating a function to post form data to add new car api
    const createCar = () => {
        // call api localhost:5000/api/cars/ to add new car with x-access-token in header
        const formData = new FormData();
        formData.append('title', car.name);
        formData.append('category', car.category);
        formData.append('color', car.color);
        formData.append('model', car.model);
        formData.append('make', car.make);
        formData.append('registration_no', car.registration_no);
        formData.append('image', car.image);
        axios.post('http://localhost:5000/api/cars', formData, {
            headers: {
                'x-access-token': JSON.parse([user]).token
            }
        })
            .then(res => {
                console.log(res.data);
                setModal(false);
                setCar({
                    name: '',
                    category: '',
                    title: '',
                    color: '',
                    model: '',
                    make: '',
                    registration_no: '',

                });
                window.location.reload();
            })
            .catch(err => {
                console.log(err.response.data.message);
                alert('Error in adding car: ' + err.response.data.message)
            }
            )
    }







    return (
        <>
            {/* create a side menu to show dropdown of some options */}
            <div className='w-full p-5  bg-white rounded-md shadow-xl lg:max-w-full'>
                <h1 className='text-2xl font-bold text-gray-900'>Add Car details</h1>
                {/* create a modal with form to add new car with image upload field  */}
                <div className='mt-4 mb-4 flex'>
                    <button
                        onClick={() => setModal(true)}
                        className='px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600'
                    >
                        Add New Car
                    </button>

                    {/* modal */}
                    <div
                        className={`${modal ? 'block' : 'hidden'
                            } fixed inset-0 z-10 overflow-y-auto`}
                    >
                        <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
                            <div
                                className='fixed inset-0 transition-opacity'
                                aria-hidden='true'
                            >
                                <div className='absolute inset-0 bg-gray-500 opacity-75'></div>

                                <div className='fixed inset-y-0 right-0 pl-10 max-w-full flex'>
                                    <div className='w-screen max-w-md'>
                                        <div className='h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll'>
                                            <div className='px-4 sm:px-6'>
                                                <div className='flex items-start justify-between'>
                                                    <h2 className='text-lg font-medium text-gray-900'>
                                                        Add New Car
                                                    </h2>
                                                    <div className='ml-3 h-7 flex items-center'>
                                                        <button

                                                            onClick={() =>
                                                                setModal(
                                                                    false
                                                                )
                                                            }

                                                            className='bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                                                        >
                                                            <span className='sr-only'>
                                                                Close panel
                                                            </span>
                                                            <svg

                                                                className='h-6 w-6'
                                                                xmlns='http://www.w3.org/2000/svg'
                                                                fill='none'
                                                                viewBox='0 0 24 24'
                                                                stroke='currentColor'
                                                                aria-hidden='true'
                                                            >
                                                                <path
                                                                    strokeLinecap='round'
                                                                    strokeLinejoin='round'
                                                                    strokeWidth='2'
                                                                    d='M6 18L18 6M6 6l12 12'
                                                                />
                                                            </svg>
                                                        </button>

                                                    </div>

                                                </div>

                                                <div className='mt-6'>

                                                    <form
                                                        onSubmit={async (e) => {
                                                            e.preventDefault();
                                                        }}
                                                    >
                                                        {/* get car details, title category registartion_no make model color and image */}
                                                        <div className='grid grid-cols-6 gap-6'>
                                                            <div className='col-span-6 sm:col-span-3'>
                                                                <label
                                                                    htmlFor='first_name'
                                                                    className='block text-sm font-medium text-gray-700'
                                                                >
                                                                    Title
                                                                </label>
                                                                <input
                                                                    type='text'
                                                                    name='name'
                                                                    id='name'
                                                                    value={car.name}
                                                                    onChange={(e) =>
                                                                        setCar({
                                                                            ...car, name: e.target.value
                                                                        })
                                                                    }
                                                                    autoComplete='given-name'
                                                                    className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                                                                />
                                                            </div>

                                                            <div className='col-span-6 sm:col-span-3'>
                                                                <label
                                                                    htmlFor='last_name'
                                                                    className='block text-sm font-medium text-gray-700'
                                                                >
                                                                    Category
                                                                </label>
                                                                <select 
                                                                    id='category'
                                                                    name='category'
                                                                    value={car.category}
                                                                    onChange={(e) =>
                                                                        setCar({
                                                                            ...car, category: e.target.value
                                                                        })
                                                                    }
                                                                    autoComplete='family-name'
                                                                    className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                                                                >
                                                                    {category?.map((category) => (
                                                                        <option key={category.id} value={category.name}>
                                                                            {category.name}
                                                                        </option>
                                                                    ))}
                                                                </select>

                                                            </div>

                                                            <div className='col-span-6 sm:col-span-3'>
                                                                <label
                                                                    htmlFor='last_name'
                                                                    className='block text-sm font-medium text-gray-700'
                                                                >
                                                                    Make
                                                                </label>
                                                                <input
                                                                    type='text'
                                                                    name='make'
                                                                    id='make'
                                                                    value={car.make}
                                                                    onChange={(e) =>
                                                                        setCar({
                                                                            ...car, make: e.target.value
                                                                        })
                                                                    }
                                                                    autoComplete='family-name'
                                                                    className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                                                                />
                                                            </div>

                                                            <div className='col-span-6 sm:col-span-3'>
                                                                <label
                                                                    htmlFor='last_name'
                                                                    className='block text-sm font-medium text-gray-700'
                                                                >
                                                                    Model
                                                                </label>
                                                                <input
                                                                    type='number'
                                                                    name='model'
                                                                    id='model'
                                                                    value={car.model}
                                                                    onChange={(e) =>
                                                                        setCar({
                                                                            ...car, model: e.target.value
                                                                        })
                                                                    }
                                                                    autoComplete='family-name'
                                                                    className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                                                                />
                                                            </div>

                                                            <div className='col-span-6 sm:col-span-3'>
                                                                <label
                                                                    htmlFor='last_name'
                                                                    className='block text-sm font-medium text-gray-700'
                                                                >
                                                                    Color
                                                                </label>
                                                                <input
                                                                    type='text'
                                                                    name='color'
                                                                    id='color'
                                                                    value={car.color}
                                                                    onChange={(e) =>
                                                                        setCar({
                                                                            ...car, color: e.target.value
                                                                        })
                                                                    }
                                                                    autoComplete='family-name'
                                                                    className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                                                                />
                                                            </div>

                                                            <div className='col-span-6 sm:col-span-3'>
                                                                <label
                                                                    htmlFor='last_name'
                                                                    className='block text-sm font-medium text-gray-700'
                                                                >
                                                                    Registration No
                                                                </label>
                                                                <input
                                                                    type='text'
                                                                    name='registration_no'
                                                                    id='registration_no'
                                                                    value={car.registration_no}
                                                                    onChange={(e) =>
                                                                        setCar({
                                                                            ...car, registration_no: e.target.value
                                                                        })
                                                                    }
                                                                    autoComplete='family-name'
                                                                    className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                                                                />
                                                            </div>

                                                            <div className='col-span-6 sm:col-span-3'>
                                                                <label
                                                                    htmlFor='last_name'
                                                                    className='block text-sm font-medium text-gray-700'
                                                                >
                                                                    Chassis No
                                                                </label>
                                                                <input
                                                                    type='file'
                                                                    name='image'
                                                                    id='image'
                                                                    onChange={(e) =>
                                                                        setCar({
                                                                            ...car, image: e.target.files[0]
                                                                        })
                                                                    }
                                                                    autoComplete='family-name'
                                                                    className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                                                                />
                                                            </div>
                                                            {/* create submit button */}
                                                            <br />
                                                            <div className='col-span-2 sm:col-span-6 space-x-5 w-full mt-5 '>
                                                                <button
                                                                    onClick={() => {
                                                                        createCar()
                                                                    }}
                                                                    type='submit'
                                                                    className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                                                                >
                                                                    Create
                                                                </button>

                                                                <button
                                                                    type='button'
                                                                    className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                                                                    onClick={() => setModal(false)}
                                                                >
                                                                    Cancel
                                                                </button>

                                                            </div>
                                                        </div>
                                                    </form>


                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}



export default AddNewCar;