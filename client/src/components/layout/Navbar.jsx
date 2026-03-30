import { Link, useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { Menu, X, Search, User, LogOut, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState('');
    const isAuthenticated = !!localStorage.getItem('token');
    
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    useEffect(() => {
        setSearchQuery(searchParams.get('q') || '');
    }, [searchParams]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/?q=${encodeURIComponent(searchQuery.trim())}`);
            setIsOpen(false);
        } else {
            navigate('/');
        }
    };

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (window.location.pathname === '/') {
            navigate(query ? `/?q=${encodeURIComponent(query)}` : '/');
        }
    };

    return (
        <nav className="sticky top-0 z-50 bg-brand-50/70 dark:bg-brand-900/50 backdrop-blur-xl shadow-sm border-b border-brand-200/50 dark:border-brand-800/50 transition-colors duration-200">
            <div className="container mx-auto px-4">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center gap-2 group">
                            <motion.img 
                                whileHover={{ rotate: [-5, 5, -5, 0], scale: 1.1 }}
                                transition={{ duration: 0.5 }}
                                src="/l.png" 
                                alt="WordLab Logo" 
                                className="h-10 w-auto object-contain" 
                            />
                            <span className="text-2xl font-extrabold tracking-tight text-blue-900 dark:text-blue-300">
                                WordLab
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <motion.form 
                            onSubmit={handleSearchSubmit} 
                            className="relative"
                            initial={false}
                            animate={{ width: searchQuery ? 280 : 240 }}
                        >
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                placeholder="Search tools..."
                                className="pl-10 pr-4 py-2 border border-brand-200 dark:border-slate-700 rounded-full bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm w-full transition-shadow hover:shadow-md"
                            />
                        </motion.form>
                        <Link to="/" className="text-gray-600 hover:text-brand-600 font-medium">Tools</Link>
                        <Link to="/about" className="text-gray-600 hover:text-brand-600 font-medium">About</Link>
                        <Link to="/contact" className="text-gray-600 hover:text-brand-600 font-medium">Contact</Link>

                        <motion.button
                            whileHover={{ scale: 1.1, rotate: 15 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={toggleTheme}
                            className="p-2 text-slate-500 hover:text-brand-600 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            title="Toggle Theme"
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.div
                                    key={theme}
                                    initial={{ y: -20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: 20, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                                </motion.div>
                            </AnimatePresence>
                        </motion.button>

                        <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-gray-200">
                            {isAuthenticated ? (
                                <>
                                    <Link to="/profile" className="text-gray-600 hover:text-brand-600 font-medium flex items-center gap-1" title="Profile">
                                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-brand-50 text-brand-600 hover:bg-brand-100 transition-colors">
                                            <User size={18} />
                                        </div>
                                    </Link>
                                    <button onClick={handleLogout} className="text-gray-600 hover:text-red-600 font-medium" title="Logout">
                                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors">
                                            <LogOut size={18} />
                                        </div>
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="text-gray-600 hover:text-brand-600 font-medium">Log in</Link>
                                    <Link to="/register" className="bg-brand-600 hover:bg-brand-700 text-white px-5 py-2 rounded-full font-medium transition-colors">Sign up</Link>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="md:hidden border-t border-brand-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-2 pb-4 space-y-1 shadow-lg overflow-hidden"
                    >
                        <form onSubmit={handleSearchSubmit} className="mb-4 mt-2">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    placeholder="Search tools..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-slate-700 rounded-lg bg-gray-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm dark:text-gray-200"
                                />
                            </div>
                        </form>
                        <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-900/20" onClick={() => setIsOpen(false)}>Tools</Link>
                        <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-900/20" onClick={() => setIsOpen(false)}>About</Link>
                        <Link to="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-900/20" onClick={() => setIsOpen(false)}>Contact</Link>
                        
                        <button
                            onClick={() => { toggleTheme(); setIsOpen(false); }}
                            className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-900/20 flex items-center gap-2"
                        >
                            {theme === 'dark' ? <><Sun size={18} /> Light Mode</> : <><Moon size={18} /> Dark Mode</>}
                        </button>

                        <div className="pt-4 pb-2 border-t border-gray-100 dark:border-slate-800 mt-4">
                            {isAuthenticated ? (
                                <>
                                    <Link to="/profile" className="block w-full text-center px-4 py-2 text-brand-600 font-medium bg-brand-50 dark:bg-brand-900/20 rounded-lg mb-2 flex items-center justify-center gap-2" onClick={() => setIsOpen(false)}>
                                        <User size={18} /> Profile
                                    </Link>
                                    <button onClick={() => { handleLogout(); setIsOpen(false); }} className="block w-full text-center px-4 py-2 text-red-600 font-medium bg-red-50 dark:bg-red-900/20 rounded-lg flex items-center justify-center gap-2">
                                        <LogOut size={18} /> Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="block w-full text-center px-4 py-2 text-brand-600 font-medium bg-brand-50 dark:bg-brand-900/20 rounded-lg mb-2" onClick={() => setIsOpen(false)}>Log in</Link>
                                    <Link to="/register" className="block w-full text-center px-4 py-2 text-white font-medium bg-brand-600 rounded-lg" onClick={() => setIsOpen(false)}>Sign up</Link>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
