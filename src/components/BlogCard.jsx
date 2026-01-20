import React from 'react';
import { ArrowRight, Calendar, User } from 'lucide-react';

const BlogCard = ({ blog }) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group flex flex-col h-full">
            <div className="relative h-48 overflow-hidden">
                <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-accent uppercase tracking-wider">
                    {blog.category}
                </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs text-secondary mb-3">
                    <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{blog.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>{blog.author}</span>
                    </div>
                </div>
                <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors line-clamp-2">
                    {blog.title}
                </h3>
                <p className="text-secondary text-sm mb-4 line-clamp-3">
                    {blog.excerpt}
                </p>
                <div className="mt-auto pt-4 border-t border-gray-50">
                    <button className="flex items-center gap-2 text-sm font-semibold text-accent hover:gap-3 transition-all">
                        Read Article <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
