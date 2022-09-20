import React, { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";


export default function Modal({ showModal, setShowModal, change, setChange }) {
    const [showMessage, setMessage] = useState('');
    const { user } = useAuth();
    const { _id, category, title, color, model, make, registration_no } = showModal;


    // function to send data to update car API to update
    const UpdateData = () => {
        console.log('token=====>', JSON.parse([user]).token);
        console.log("data ========>", showModal);
        // update car

        var myHeaders = new Headers();
        myHeaders.append("x-access-token", JSON.parse([user]).token);
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("color", showModal.color);
        urlencoded.append("_id", showModal._id);
        urlencoded.append("category", showModal.category);
        urlencoded.append("title", showModal.title);
        urlencoded.append("model", showModal.model);
        urlencoded.append("make", showModal.make);
        urlencoded.append("registration_no", showModal.registration_no);



        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("http://localhost:5000/api/cars/update", requestOptions)

            .then(response => response.json())
            .then(result => {
                if (result) {
                    setMessage('Car Updated Successfully');
                    

                    
                }
            })
            .catch(error => {
                console.log('error', error);
                alert('Error in updating car', error)
            });
    }



    return (
        <>
            {/* <button
        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal({...showModal, show:true})}
      >
        Open regular modal
      </button> */}
            {showModal.show ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                {showMessage !== '' ? (
                                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative w-full " role="alert">
                                        <strong className="font-bold">Success! &nbsp; </strong>
                                        <span className="block sm:inline">{showMessage}</span>
                                        &nbsp;
                                        &nbsp;
                                        &nbsp;
                                        &nbsp;
                                        <span 
                                            onClick={() => {
                                                setMessage('');
                                                setShowModal({
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
                                                })
                                               setChange(change+1)

                                            }}
                                            className="absolute top-0 bottom-0 right-0 px-4 py-3"
                                            >
                                            <svg className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                                        </span>

                                    </div>
                                ) 
                                
                                : 
                                
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Edit details of car
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal({ ...showModal, show: false })}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    {/* show all details of showModal with editable input tags */}
                                    <div className="flex flex-col">
                                        <div className=" flex flex-row justify-between">
                                            <label htmlFor="category">Category</label>

                                            <input
                                                type="text"
                                                name="category"
                                                id="category"
                                                value={category}
                                                onChange={(e) => setShowModal({ ...showModal, category: e.target.value })}
                                                className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                                            />
                                        </div>

                                        <div className="flex flex-row justify-between">
                                            <label htmlFor="title">Title</label>

                                            <input
                                                type="text"
                                                name="title"
                                                id="title"
                                                value={title}
                                                onChange={(e) => setShowModal({ ...showModal, title: e.target.value })}
                                                className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                                            />
                                        </div>

                                        <div className="flex flex-row justify-between">
                                            <label htmlFor="color">Color</label>

                                            <input
                                                type="text"
                                                name="color"
                                                id="color"
                                                value={color}
                                                onChange={(e) => setShowModal({ ...showModal, color: e.target.value })}
                                                className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                                            />
                                        </div>

                                        <div className="flex flex-row justify-between">
                                            <label htmlFor="model">Model</label>

                                            <input
                                                type="text"
                                                name="model"
                                                id="model"
                                                value={model}
                                                onChange={(e) => setShowModal({ ...showModal, model: e.target.value })}
                                                className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                                            />
                                        </div>

                                        <div className="flex flex-row justify-between">
                                            <label htmlFor="make">Make</label>

                                            <input
                                                type="text"
                                                name="make"
                                                id="make"
                                                value={make}
                                                onChange={(e) => setShowModal({ ...showModal, make: e.target.value })}
                                                className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                                            />
                                        </div>

                                        <div className="flex flex-row justify-between">
                                            <label htmlFor="registration_no">Registration No.</label>

                                            <input
                                                type="text"
                                                name="registration_no"
                                                id="registration_no"
                                                value={registration_no}
                                                onChange={(e) => setShowModal({ ...showModal, registration_no: e.target.value })}
                                                className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                                            />
                                        </div>

                                    </div>


                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal({ ...showModal, show: false })}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => UpdateData()}
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                                
                                }
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}