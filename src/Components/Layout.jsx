

import { Outlet } from "react-router-dom";

import Home from './HomePage/Home.jsx'


const Layout=()=>{




    return(

        <>
        
        
        <Home/>
        <Outlet/>
        
        
        </>

    );
}

export default Layout;