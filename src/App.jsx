import { Route, Routes } from "react-router-dom";
import Users from "./pages/Users";
import About from "./pages/About";
import Notfound from "./pages/Notfound";
import Layout from "./components/Layout/Layout";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

const App = () => {
    return (
        <Routes>

            <Route path="/login" element={<Login />} /> 

            <Route element={<ProtectedRoute />}>
                <Route element={<Layout />}>
                    <Route path="/" element={<Users />} />
                    <Route path="/about" element={<About />} />
                </Route>
            </Route>

            <Route path="*" element={<Notfound />} />

        </Routes>
    );
};

export default App;
