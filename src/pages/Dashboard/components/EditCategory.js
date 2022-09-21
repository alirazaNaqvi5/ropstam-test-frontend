import React from 'react'
import axios from 'axios'
import {useAuth} from '../../../hooks/useAuth'
function EditCategory() {

    const {user} = useAuth();

    // create a state to store the NEW name of the category
    const [category, setCategory] = React.useState({
        previous_name: '',
        name: '',
        _id: ''
    })

    // create state for store all categories
    const [categories, setCategories] = React.useState([])

    // create state to store the category name
    const [editMode, setEditMode] = React.useState({
        edit: false,
        id: null,
        name: ''
    })

    // get all categories
    React.useEffect(() => {
        axios.get('http://localhost:5000/api/cat', {
            headers: {
                'x-access-token': JSON.parse([user]).token
            }
        })
            .then(res => {
                setCategories(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [user])




  return (
    // create a side menu to show dropdown of some options
    <div className='w-full p-5  bg-white rounded-md shadow-xl lg:max-w-full'>
        <h1 className='text-2xl font-bold text-gray-900'>Categories</h1>
        <p className='mt-2 text-sm text-gray-600'>Select Category to show relevant Vehicles</p>

        {/* create selection menu  */}
        <div className='mt-4 mb-4 flex'>
            <select
                className='w-full px-4 py-2 text-gray-700 bg-white border rounded-lg appearance-none focus:outline-none focus:bg-white'
                onChange={(e) => {
                    setCategory({
                        previous_name: categories[e.target.value].name,
                        name: categories[e.target.value].name,
                        _id: categories[e.target.value]._id
                    })
                }}
            >
                <option value=''>Select Category</option>
                {
                    categories.map((item, index) => {
                        return (
                            <option key={index} value={index}>{item.name}</option>
                        )
                    }
                    )
                }
            </select>
            <button
                className='ml-2 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600'
                onClick={() => {
                    setEditMode({
                        edit: true,
                        id: category._id,
                        name: category.name
                    })
                }}
            >Edit</button>
        </div>

        {/* edit option button */}
        {
            editMode.edit ?
                <div className='flex'>
                    <input
                        type='text'
                        className='w-full px-4 py-2 text-gray-700 bg-white border rounded-lg appearance-none focus:outline-none focus:shadow-outline'
                        value={category.name}
                        onChange={(e) => {
                            setCategory({
                                ...category,
                                name: e.target.value
                            })
                        }}
                    />
                    <button
                        className='ml-2 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600'
                        onClick={() => {
                            axios.put('http://localhost:5000/api/cat/update', {
                                previous_name: category.previous_name,
                                name: category.name,
                                id: category._id
                            }, {
                                headers: {
                                    'x-access-token': JSON.parse([user]).token
                                }
                            })
                                .then(res => {
                                    alert(res.data.message)
                                    setEditMode({
                                        edit: false,
                                        id: null,
                                        name: ''
                                    })
                                    window.location.reload()
                                })
                                .catch(err => {
                                    alert(err.response.data.message)
                                })
                        }}
                    >Update</button>
                </div>
                :
                null
        }
    </div>
    
  )
}

export default EditCategory