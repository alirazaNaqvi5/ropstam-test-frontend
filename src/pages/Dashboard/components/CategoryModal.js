import React, { useState } from 'react'
import AddCategory from './AddCategory';
import DeleteCategory from './DeleteCategory';
import EditCategory from './EditCategory';

function CategoryModal({ addCategoryModal, setAddCategoryModal }) {
    const [checkedState, setCheckedState] = useState('add');
    const active = 'bg-blue-600 text-white font-bold px-10 rounded-lg'
    const inActive = 'text-black font-bold px-6 rounded-lg'


    return (
        // create a modal to add new category to the database or to edit the existing category
        <div className={`fixed z-10 inset-0 overflow-y-auto ${addCategoryModal ? 'block' : 'hidden'}`}>
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                                    Add Category
                                </h3>

                                {/* create a toggle button */}

                                <div className=" flex flex-col items-center justify-center w-full mt-6 mb-6 overflow-hidden">
                                    <div className="flex space-x-8 border-solid border-2 border-blue-600 rounded-xl  ">
                                        
                                        <button onClick={()=>{
                                            setCheckedState('add');
                                        }}
                                            className={checkedState==='add'? active : inActive}>Add</button>
                                        <button 
                                            onClick={()=>{
                                                setCheckedState('edit');
                                            }}
                                            className={checkedState==='edit'? active : inActive} >Edit</button>
                                        <button 
                                            onClick={()=>{
                                                setCheckedState('delete');
                                            }}
                                            className={checkedState==='delete'? active : inActive} >Delete</button>
                                      
                                    </div>
                                </div>

                                {/*  */}

                                {
                                    // if add is selected then show add category component
                                 checkedState === 'add'?   <AddCategory/> 

                                    // if edit is selected then show edit category component
                                    : checkedState === 'edit'? <EditCategory/>

                                    // if delete is selected then show delete category component
                                    : checkedState === 'delete' && <DeleteCategory/> 
                                    
                                   
                                
                                }







                                

                                {/* <div className="mt-2">
                                    <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Category Name" />
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        {/* <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                            Action
                        </button> */}
                        <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={() => setAddCategoryModal(false)}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoryModal