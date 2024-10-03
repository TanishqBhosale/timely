import React from 'react';
import './navbar.css';
import logo from '../asset/time.png';

const Navbar = () => {
    return (
        <nav className="bg-blue-600 text-white shadow-3d opacity-90 py-2"> {/* Decreased height */}
            <div className="container mx-auto flex justify-center items-center">
                {/* Centered Logo */}
                <div className="text-2xl font-bold"> {/* Adjusted font size */}
                    <img src={logo} alt="Logo" className="h-20 w-auto" /> {/* Adjusted logo height */}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
