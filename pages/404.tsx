import Layout from '../components/Layout';
import Link from 'next/link';
import { FaHome, FaSearch, FaExclamationTriangle } from 'react-icons/fa';

export default function Custom404() {
    return (
        <Layout>
            <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto min-h-[80vh] flex flex-col justify-center">
                <h2 className="text-4xl md:text-5xl font-serif font-bold mb-16 text-center">
                    System Malfunction
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 mt-6">
                    {/* Top Left: 404 Status */}
                    <div className="md:col-span-2 h-full min-h-[240px] bg-neutral-900/50 border border-white/5 rounded-3xl p-8 flex flex-col relative overflow-hidden group hover:border-white/10 transition-colors">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-makima-red/10 blur-[80px] rounded-full pointer-events-none -mr-16 -mt-16" />

                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div>
                                <h3 className="text-gray-400 font-medium mb-1">Error Status</h3>
                                <p className="text-6xl md:text-8xl font-bold text-white mb-2 tracking-tighter">404</p>
                            </div>

                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 rounded-full border border-red-500/20 text-xs font-medium text-red-500 w-fit">
                                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                                Signal Lost
                            </div>
                        </div>
                    </div>

                    {/* Top Right: Message */}
                    <div className="md:col-span-2 h-full min-h-[240px] bg-neutral-900/50 border border-white/5 rounded-3xl p-8 flex flex-col justify-center items-center relative overflow-hidden group hover:border-white/10 transition-colors text-center">
                        <div className="mb-6 p-4 bg-white/5 rounded-full ring-1 ring-white/10">
                            <FaExclamationTriangle className="text-4xl text-makima-red" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Page Not Found</h3>
                        <p className="text-gray-400 max-w-xs">
                            The coordinates you entered don't map to any known sector in this portfolio.
                        </p>
                    </div>

                    {/* Bottom: Action */}
                    <div className="md:col-span-4 min-h-[160px] bg-[#1e1f22] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
                        {/* Background Icon */}
                        <div className="absolute -right-12 -bottom-12 opacity-5 text-white transform rotate-12 group-hover:rotate-0 transition-transform duration-500 pointer-events-none">
                            <FaHome size={250} />
                        </div>

                        <div className="relative z-10 text-center md:text-left">
                            <h3 className="text-3xl font-serif font-bold text-white mb-2">
                                Return to Base
                            </h3>
                            <p className="text-gray-400 max-w-md">
                                Re-establish connection with the main interface to continue exploring projects and experience.
                            </p>
                        </div>

                        <Link
                            href="/"
                            className="relative z-10 flex items-center gap-3 px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all duration-300 hover:scale-105"
                        >
                            <FaHome className="text-xl" />
                            <span>Back home</span>
                        </Link>
                    </div>

                </div>
            </section>
        </Layout>
    );
}
