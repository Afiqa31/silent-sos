import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Contacts from "./pages/Contacts";
import Alerts from "./pages/Alerts";
import Navbar from "./components/Navbar";

import "./styles/App.css";


function Layout({ children }) {

    return (
        <>
            <Navbar />
            {children}
        </>
    );

}


function App() {

    return (

        <Routes>

            <Route 
                path="/" 
                element={<Login />} 
            />

            <Route 
                path="/register" 
                element={<Register />} 
            />


            <Route 
                path="/dashboard" 
                element={
                    <Layout>
                        <Dashboard />
                    </Layout>
                } 
            />


            <Route 
                path="/contacts" 
                element={
                    <Layout>
                        <Contacts />
                    </Layout>
                } 
            />


            <Route 
                path="/alerts" 
                element={
                    <Layout>
                        <Alerts />
                    </Layout>
                } 
            />


        </Routes>

    );

}


export default App;