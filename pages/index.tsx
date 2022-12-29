import type { NextPage } from 'next';
import { useContext } from 'react';
import Sidebar from '../components/Sidebar';
import { AuthContext } from '../context';
import DoctorTable from './doctor-table';
import MySubmissions from './my-submissions';


const Home: NextPage = () => {
  const { user, isLogedIn, role, logoutUserContext } = useContext(AuthContext);

  return (
    <Sidebar>
      <h1>Landing</h1>
    </Sidebar>
  )
}

export default Home
