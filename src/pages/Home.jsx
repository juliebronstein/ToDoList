import React, { useContext, useEffect, useState } from 'react';
import SideBar from '../components/SideBare';
import Tasks from '../components/Task/Tasks';
const Home = () => {


    return (
      <div className='col-12 d-flex flex-row'>
      <SideBar/>
      <Tasks/>
      </div>
    );
}

export default Home;
