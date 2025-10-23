import React from 'react'
import Navbar from '../Components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Components/Footer'

export default function layout() {
    return <>
        <Navbar />
        <div className="bg-gray-100 pt-4 bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4 sm:px-6 md:px-10 lg:px-20">
            <Outlet />
        </div>
    </>
}




