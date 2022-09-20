import React, {useState, useEffect} from 'react';
import { useAuth } from '../../hooks/useAuth';
import CarsList from './components/CarsList';
import CategoryList from './components/CategoryList';
import Navbar from './Navbar';
import Loading from '../../components/Loading';
import AddNewCar from './components/AddNewCar';
import CategoryModal from './components/CategoryModal';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [Category, setCategory] = useState('All');

  const [addCategoryModal, setAddCategoryModal] = useState(false);

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
          {/* show navebar */}
          <Navbar loading={loading} setLoading={setLoading} />

          {/* body of dashboard */}
          <div className='container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center'>

              {/* categories card */}
                <CategoryList addCategoryModal={addCategoryModal} setAddCategoryModal={setAddCategoryModal} Category={Category} setCategory={setCategory}/>


                {/* Add or edit category modal */}
                <CategoryModal addCategoryModal={addCategoryModal} setAddCategoryModal={setAddCategoryModal} />


                <AddNewCar/>
              <br/>

              {/* cars card */}
              <CarsList Category={Category} />

          </div>
        </>
    

  );
}