import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, PieChart, TrendingUp, BookOpen, Settings, HelpCircle, User } from 'lucide-react';

const Sidebar = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    const menuItems = [
        { name: 'Home', path: '/', icon: Home },
        { name: 'Portfolios', path: '/portfolio', icon: PieChart },
        { name: 'Experimentals', path: '#', icon: TrendingUp },
        { name: 'Slack Archives', path: '#', icon: BookOpen },
        { name: 'Refer a friend', path: '#', icon: User },
        { name: 'Gift a Subscription', path: '#', icon: HelpCircle },
        { name: 'Account', path: '#', icon: Settings },
    ];

    return (
        <aside className="w-64 bg-white border-r border-gray-100 min-h-screen flex flex-col fixed left-0 top-0 hidden md:flex">
            <div className="p-6">
                <div className="flex items-center gap-2 mb-8">
                    <div className="bg-primary text-white p-2 rounded-lg">
                        <TrendingUp className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-primary tracking-tight leading-none">Capitalmind</h1>
                        <span className="text-xs text-accent font-semibold tracking-wider uppercase">Premium</span>
                    </div>
                </div>

                <nav className="space-y-1">
                    {menuItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive(item.path)
                                    ? 'bg-blue-50 text-accent'
                                    : 'text-secondary hover:bg-gray-50 hover:text-primary'
                                }`}
                        >
                            <item.icon className={`w-5 h-5 ${isActive(item.path) ? 'text-accent' : 'text-gray-400'}`} />
                            {item.name}
                        </Link>
                    ))}
                </nav>
            </div>

            <div className="mt-auto p-6 border-t border-gray-100">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-xs">
                        JD
                    </div>
                    <div>
                        <p className="text-sm font-medium text-primary">John Doe</p>
                        <p className="text-xs text-secondary">Premium Member</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
