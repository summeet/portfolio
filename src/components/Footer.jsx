import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <span className="font-bold text-lg text-primary">QuantFolio</span>
                        <p className="text-sm text-secondary mt-1">© 2026 QuantFolio Management. All rights reserved.</p>
                    </div>
                    <div className="flex space-x-6">
                        <a href="#" className="text-secondary hover:text-accent transition-colors">Privacy Policy</a>
                        <a href="#" className="text-secondary hover:text-accent transition-colors">Terms of Service</a>
                        <a href="#" className="text-secondary hover:text-accent transition-colors">Contact</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
