import { useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import AdBanner from '../shared/AdBanner';

const ToolLayout = ({ title, description, children }) => {
    useEffect(() => {
        // Optionally log view to analytics here
    }, []);

    const saveUsage = async (inputTextLength, resultSummary) => {
        const token = localStorage.getItem('token');
        if (!token) return; // Only save if user is logged in

        try {
            await axios.post('http://localhost:5000/api/tools/usage', {
                toolName: title,
                inputTextLength,
                resultSummary
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch (err) {
            console.error('Failed to save usage history', err);
        }
    };

    return (
        <motion.div 
            initial="initial"
            animate="animate"
            className="max-w-4xl mx-auto py-6"
        >
            <div className="text-center mb-10">
                <motion.h1 
                    variants={{
                        initial: { opacity: 0, y: -20 },
                        animate: { opacity: 1, y: 0 }
                    }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight"
                >
                    {title}
                </motion.h1>
                <motion.p 
                    variants={{
                        initial: { opacity: 0 },
                        animate: { opacity: 1 }
                    }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium"
                >
                    {description}
                </motion.p>
            </div>

            {/* Ad Placeholder (Top) */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mb-8"
            >
                <AdBanner id="tool-top-ad" />
            </motion.div>

            <motion.div 
                variants={{
                    initial: { opacity: 0, y: 30, scale: 0.98 },
                    animate: { opacity: 1, y: 0, scale: 1 }
                }}
                transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-800 p-6 md:p-10 mb-8 relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-500 to-indigo-500" />
                {children}
            </motion.div>

            {/* Ad Placeholder (Bottom) */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-8"
            >
                <AdBanner id="tool-bottom-ad" />
            </motion.div>
        </motion.div>
    );
};

export default ToolLayout;
