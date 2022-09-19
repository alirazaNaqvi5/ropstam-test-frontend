import React, {useState, useEffect} from 'react';
import { useAuth } from '../../hooks/useAuth';
import CarsList from './CarsList';
import CategoryList from './CategoryList';
import Navbar from './Navbar';
import Loading from '../../components/Loading';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [Category, setCategory] = useState('All');

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);


  return (
    
      loading ? 
        <Loading/>
       : 
        <>
      <Navbar loading={loading} setLoading={setLoading} />
      <div className='container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center'>

        <CategoryList Category={Category} setCategory={setCategory}/>
        <CarsList Category={Category} />

      </div>
    </>
    

  );
}