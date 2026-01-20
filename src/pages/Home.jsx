import React from 'react';
import { ArrowRight } from 'lucide-react';

const MOCK_BLOGS = [
    {
        id: 1,
        title: "CM Fixed Income: Exiting Banking & PSU to Add a New Gilt Fund",
        date: "Apr 18, 2024",
        excerpt: "We are increasing the duration of our Fixed Income portfolio to reflect the current macro conditions. We want to take advantage of the current higher rates to further increase the duration of the Gilt funds we hold...",
        isPremium: true
    },
    {
        id: 2,
        title: "Craftsman Automation: Poised for Growth Amid Temporary Headwinds",
        date: "Apr 05, 2024",
        excerpt: "Unlock this post by trial. Craftsman Automation excels in making precise parts for cars and machines. Amidst temporary headwinds, looks resilient with a focus on growth and innovation....",
        isPremium: true
    },
    {
        id: 3,
        title: "The Focused Way of Investing: Our Four-Quadrant Strategy and FY24 Review",
        date: "Apr 03, 2024",
        excerpt: "FY24 brought us a 42% gain in our Capitalmind Focused portfolio, gently outperforming the Nifty's 29%. It's been a bit of a rollercoaster, especially these last few months, but that's part of the equity investing...",
        isPremium: true
    },
    {
        id: 4,
        title: "A Small CAD for India, Yet Again",
        date: "Mar 27, 2024",
        excerpt: "Yet again, India's Current Account Deficit is a mere 10 bn in the quarter (Dec 2023), less than levels more than a decade back, and less than 2017-18 too. Why not of gold? It's not really a current account import...",
        isPremium: false
    },
    {
        id: 5,
        title: "Poonawalla Fincorp: One right step at a time",
        date: "Mar 25, 2024",
        excerpt: "There are some winning patterns in investing that keep repeating. One such pattern is when a big company buys a struggling company, fixes old problems, and brings in new leaders to grow the business...",
        isPremium: true
    },
    {
        id: 6,
        title: "CM Focused: Reducing our allocation to smallcaps & increasing cash",
        date: "Mar 18, 2024",
        excerpt: "In the last few days, we have seen increased volatility in the mid and small-cap sectors due to regulatory actions, including restrictions on inflows into mid and...",
        isPremium: true
    }
];

const Home = () => {
    return (
        <div className="bg-white min-h-screen p-8 md:p-12 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold text-primary mb-10">Home</h1>

            {/* Top Cards Section - "Get started", "Community" similar to image */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <h3 className="font-bold text-primary mb-2">Get started</h3>
                    <p className="text-sm text-secondary mb-4">Read our getting started guide to get the most out of your Capitalmind subscription.</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <h3 className="font-bold text-primary mb-2">Community</h3>
                    <p className="text-sm text-secondary mb-4">Join the conversation on our exclusive community on Slack for Capitalmind Premium subscribers.</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <h3 className="font-bold text-primary mb-2">Visit website</h3>
                    <p className="text-sm text-secondary mb-4">Keep up with our latest content on our website.</p>
                </div>
            </div>

            <h2 className="text-xl font-bold text-primary mb-8 border-b border-gray-100 pb-2">Latest Posts</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
                {MOCK_BLOGS.map(blog => (
                    <div key={blog.id} className="flex flex-col items-start">
                        <span className="text-xs text-secondary mb-1">{blog.date}</span>
                        <h3 className="text-lg font-bold text-primary mb-2 hover:text-accent cursor-pointer leading-tight">
                            {blog.title}
                        </h3>
                        <p className="text-sm text-secondary leading-relaxed mb-3">
                            {blog.excerpt}
                        </p>
                        <button className="text-accent text-sm font-semibold hover:underline">
                            Read full post
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
