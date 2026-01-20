import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-white">
            {/* Mobile Header */}
            <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-100 sticky top-0 bg-white z-50">
                <span className="font-bold text-lg text-primary">Capitalmind</span>
                <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div className="md:hidden fixed inset-0 bg-white z-40 pt-16 px-4">
                    {/* Re-use Sidebar links mainly or simplified */}
                    <nav className="space-y-4">
                        <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-lg font-medium text-primary border-b border-gray-50">Home</Link>
                        <Link to="/portfolio" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-lg font-medium text-primary border-b border-gray-50">Portfolios</Link>
                    </nav>
                </div>
            )}

            <Sidebar />

            <main className="md:ml-64 min-h-screen">
                {children}
            </main>
        </div>
    );
};

export default Layout;
