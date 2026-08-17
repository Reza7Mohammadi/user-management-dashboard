import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import './Layout.css'

const Layout = () => {
    return ( 
        <>
          <Navbar />
          <hr />
          <Outlet />
        </>
     );
}
 
export default Layout;