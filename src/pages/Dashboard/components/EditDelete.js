import axios from 'axios';
import React from 'react';
import  {useAuth} from '../../../hooks/useAuth'

export default function EditDelete({setShowModal, showModal, car, setModify, setChange, change}) {
    const { user } = useAuth();
    const deleteCar = () => {
        // delete car
        axios.delete('http://localhost:5000/api/cars/delete', {
            headers: {
                'x-access-token': JSON.parse([user]).token
            },
            data: {
                id: car._id
            }
        }).then(res => {
            // console.log(res.data);
            // alert('Car Deleted Successfully', res.data);
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
            });
            setModify({
                modify: true,
                id: null,
                name: ''
            })
            setChange(change + 1)
        }).catch(err => {
            console.log(err);
            alert('Error in deleting car', err)
        })

    }
    return (
        // add animation to the edit and delete buttons
        <div className="w-64 h-64 bg-white rounded-lg shadow-xl p-5 absolute flex flex-col justify-center 
        transition ease-in-out delay-150 bg-white-500 hover:-translate-y-1 hover:scale-110 hover:bg-white-500 duration-300
            ">
            {/* create buttons of edit and delete with transition */}
            <button
                onClick={() => {
                    setShowModal({
                        show: true,
                        delete: false,
                        _id: car._id,
                        category: car.category,
                        title: car.title,
                        color: car.color,
                        model: car.model,
                        make: car.make,
                        registration_no: car.registration_no,
                        image: car.image
                    })
                    setModify({
                        modify: true,
                        id: car._id,
                        name: car.title
                    })
                    
                }} 
                className="bg-blue-500 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-blue-500 duration-300 text-white px-4 py-2 rounded-lg my-5">
                Edit
            </button>
            <button
                onClick={() => deleteCar()}
                className="delay-150 bg-red-500 hover:-translate-y-1 hover:scale-110 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300 ease-in-out my-5">
                Delete
            </button>

        </div>
    )
}
