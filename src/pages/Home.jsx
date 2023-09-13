import React from 'react';
import SideBar from '../components/SideBare';
import Main from '../components/Main';
const Home = () => {
    return (
      <div className='col-12 d-flex flex-row'>
      <SideBar/>
      <Main/>
      </div>
    );
}

export default Home;
