import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import axios from 'axios';

function CategoryList(props) {
    const { user } = useAuth();
    const [editMode, setEditMode] = useState({
        edit: false,
        id: null,
        name: ''
    });

    const [category, setCategory] = useState([{
        name: '',
        id: ''
    }]);

    const [selectedCategory, setSelectedCategory] = useState({
        name: '',
        id: ''
    });


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

    // useEffect(() => {
    //     props.setCategory(selectedCategory.name);
    // }, [selectedCategory]);



    return (
        <>
            {/* create a side menu to show dropdown of some options */}
            <div className='w-full p-5  bg-white rounded-md shadow-xl lg:max-w-full'>
                <h1 className='text-2xl font-bold text-gray-900'>Categories</h1>
                <p className='mt-2 text-sm text-gray-600'>Select Category to show relevant Vehicles</p>

                {/* create selection menu  */}
                <div className='mt-4 mb-4 flex'>
                    <select 
                        
                        onChange={(e) => {
                            if(e.target.value==='All'){
                                props.setCategory('All');
                            }
                            else{
                                setSelectedCategory({
                                    id: category[e.target.value].id,
                                    name: category[e.target.value].name
                                })
                                props.setCategory(category[e.target.value].name);
                            }
                        }}
                        className='w-full px-4 py-2 text-gray-700 bg-white border rounded-lg appearance-none focus:outline-none focus:shadow-outline'>
                            <option key='All' value='All'>All</option>
                        {
                            category.map((item, i) => {
                                if(i===0){
                                    return <option key={item.id} value={i}>{item.name}</option>
                                }
                                return <option key={item.id} value={i}>{item.name}</option>
                            })
                        }
                    </select>

                    {/* edit option button */}
                    <button className='w-[30%] px-4 py-2 ml-2 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:outline-none focus:shadow-outline'>
                        Edit
                    </button>


                </div>

            </div>
        </>
    )
}

export default CategoryList