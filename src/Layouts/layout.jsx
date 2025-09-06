import React from 'react'
import Navbar from '../Components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Components/Footer'

export default function layout() {
    return <>
        <Navbar/>
            <div className="bg-gray-100 pt-4">
                <Outlet/>
            </div>
        <Footer/>
    </>
}
