import { Link } from 'react-router-dom';
import { Beaker } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-200 mt-auto">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <img src="/l.png" alt="WordLab Logo" className="h-8 w-auto object-contain" />
                        </Link>
                        <p className="text-gray-500 mb-4 max-w-sm">
                            Your ultimate toolkit for text analysis, editing, and formatting. Free, fast, and easy to use.
                        </p>
                        <p className="text-sm text-gray-400">
                            &copy; {new Date().getFullYear()} WordLab. All rights reserved.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-slate-800 mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link to="/" className="text-gray-500 hover:text-brand-600 transition-colors">All Tools</Link></li>
                            <li><Link to="/about" className="text-gray-500 hover:text-brand-600 transition-colors">About Us</Link></li>
                            <li><Link to="/contact" className="text-gray-500 hover:text-brand-600 transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-slate-800 mb-4">Legal</h3>
                        <ul className="space-y-2">
                            <li><Link to="/terms" className="text-gray-500 hover:text-brand-600 transition-colors">Terms of Service</Link></li>
                            <li><Link to="/terms" className="text-gray-500 hover:text-brand-600 transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
