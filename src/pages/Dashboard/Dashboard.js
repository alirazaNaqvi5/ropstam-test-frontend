import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import Navbar from './Navbar';

export default function Dashboard() {
    const { logout } = useAuth();
  return(
    <>
      <Navbar/>
      <div className='container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center'>

      <button 
        onClick={() => {
          logout();
        }}
        >logout</button>
      </div>
    </>

  );
}