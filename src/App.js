import React from 'react';
import {  createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LoginSignup } from './Components/LoginSignup/LoginSignup';
import { Login } from './Components/Login/Login';
import HomePage from './Components/HomePage/Home.jsx';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';
import LandingOage from './Components/LandingOage.jsx';

import Layout from './Components/Layout.jsx';
import Comments from './Components/Pages/Comments.jsx';


function App() {

   const router= createBrowserRouter([
    {path:'/',element:<LandingOage/>},
    {path:'Login',element:<Login/>},
    {path:'Signup',element:<LoginSignup/>},
    {path:'/Home',element:<Layout/>,children:[
      
      {path:'error',element:<LandingOage/>},
      {path:'gao',element:<Login/>},
      {path:'mao',element:<LoginSignup/>}

   ]}])




  return (

    <RouterProvider router={router}/>
  );
}

export default App;
