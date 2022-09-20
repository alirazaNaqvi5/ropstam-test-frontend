import React, {useState} from 'react';
import axios from 'axios';
import {useAuth} from '../../../hooks/useAuth';

function AddCategory() {

    const {user} = useAuth();

    const [category, setCategory] = useState('');

    // create function to post category to api
    const addCategory = () => {
        // call api localhost:5000/api/cat/create to post category with x-access-token in header
        axios.post('http://localhost:5000/api/cat/create', {
            name: category
        }, {
            headers: {
                'x-access-token': JSON.parse([user]).token
            }
        })
            .then(res => {
                console.log(res.data);
                alert(res.data.message);
                setCategory('');
            })
            .catch(err => {
                console.log(err);
                alert('Error in adding category'+ err.response.data.message);
            })
    }



  return (
    // create a form to add category
    <div className='w-full p-5  bg-white rounded-md shadow-xl lg:max-w-full'>
        <h1 className='text-2xl font-bold text-gray-900'>Add Category</h1>
        <p className='mt-2 text-sm text-gray-600'>Add a new category</p>

        {/* create form */}
        <div className='mt-4 mb-4 flex'>
            <input type='text' placeholder='Category Name' className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500' value={category} onChange={(e) => setCategory(e.target.value)} />
            <button onClick={addCategory} className='ml-2 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600'>Add</button>
        </div>
    </div>
    );
  
}

export default AddCategory