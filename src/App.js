import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import {NonLoggedInRoute, ProtectedRoute} from './components/NotLoggined';

const App = ()=>{
    return (
        <BrowserRouter>
        <Routes>
          <Route path='/login' element={<NonLoggedInRoute><Login /></NonLoggedInRoute>} />
          <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path='/register' element={<NonLoggedInRoute><Register /></NonLoggedInRoute>} />
          <Route path='*' element={<NonLoggedInRoute><Login /></NonLoggedInRoute>} />
          
        </Routes>
        </BrowserRouter>
    ) 
}

export default App;
