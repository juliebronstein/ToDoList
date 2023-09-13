import React, { useContext, useEffect, useState } from 'react';
import SideBar from '../components/SideBare';
import Main from '../components/Main';
import { TaskContext } from '../context/TasksContext';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { AuthContext } from '../context/UserContext';
const Home = () => {


    return (
      <div className='col-12 d-flex flex-row'>
      <SideBar/>
      <Main/>
      </div>
    );
}

export default Home;
