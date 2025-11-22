import React from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "../pages/home/home"
import LoginForm from "../pages/login/login"
import SignupForm from "../pages/signup/signup"
import Header from "../components/header/Header";
import MainLayout from "../components/main/mainContent"
import CreateCA from "../pages/CAManagenent/CreateCA";

const AppRoutes = () => {

    return(
        <>
         <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard" element={<MainLayout />} />
        <Route path="CreateCA" element={<CreateCA />} />
      </Routes>
    </Router>
        </>
    )
}

export default AppRoutes;