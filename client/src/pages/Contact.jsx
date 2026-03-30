import { motion } from 'framer-motion';
import { Mail, MessageCircle, Bug, Rocket, HelpCircle, Heart, Share2 } from 'lucide-react';

const Contact = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <motion.div 
            initial="hidden"
            animate="show"
            variants={containerVariants}
            className="max-w-4xl mx-auto px-4 py-12"
        >
            {/* Header Section */}
            <motion.div variants={itemVariants} className="text-center mb-16">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 rounded-3xl mb-6 shadow-sm">
                    <Mail size={40} />
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
                    📬 Contact Us
                </h1>
                <p className="text-xl text-slate-600 dark:text-slate-400 font-medium">
                    We’d love to hear from you! 💙
                </p>
                <p className="text-slate-500 dark:text-slate-500 mt-2">
                    Whether you have a question, feedback, or a feature request, feel free to reach out.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                {/* Get in Touch Card */}
                <motion.div 
                    variants={itemVariants}
                    className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-gray-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:border-brand-300 transition-colors"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center">
                            <MessageCircle size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">✉️ Get in Touch</h2>
                    </div>
                    <ul className="space-y-4">
                        <li className="flex gap-3 text-slate-600 dark:text-slate-400 font-medium">
                            <span className="text-brand-500">👉</span>
                            Have a suggestion to improve WordLab?
                        </li>
                        <li className="flex gap-3 text-slate-600 dark:text-slate-400 font-medium">
                            <span className="text-brand-500">👉</span>
                            Found a bug or issue?
                        </li>
                        <li className="flex gap-3 text-slate-600 dark:text-slate-400 font-medium">
                            <span className="text-brand-500">👉</span>
                            Want to collaborate or share an idea?
                        </li>
                    </ul>
                    <p className="mt-8 text-slate-500 dark:text-slate-500 italic">
                        Just drop us a message — we’re here to help!
                    </p>
                </motion.div>

                {/* Email Section Card */}
                <motion.div 
                    variants={itemVariants}
                    className="bg-gradient-to-br from-brand-600 to-indigo-600 p-8 rounded-[2rem] text-white shadow-xl shadow-brand-500/20"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-md text-white rounded-xl flex items-center justify-center font-bold">
                            @
                        </div>
                        <h2 className="text-2xl font-bold">📧 Email</h2>
                    </div>
                    <p className="mb-6 opacity-90 font-medium text-lg">You can contact us anytime at:</p>
                    
                    <motion.a 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        href="mailto:wordlabcontact@gmail.com"
                        className="inline-flex items-center gap-3 bg-white text-brand-600 px-6 py-4 rounded-2xl font-black text-lg shadow-lg hover:shadow-xl transition-all"
                    >
                        📩 wordlabcontact@gmail.com
                    </motion.a>

                    <div className="mt-10 flex items-center gap-2 text-sm font-bold opacity-80 uppercase tracking-wider">
                        <HelpCircle size={16} />
                        Usually respond within 24–48 hours ⏱️
                    </div>
                </motion.div>
            </div>

            {/* Why Contact Us Section */}
            <motion.div 
                variants={itemVariants}
                className="bg-slate-50 dark:bg-slate-800/50 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 mb-16"
            >
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 bg-white dark:bg-slate-900 text-brand-500 rounded-2xl flex items-center justify-center shadow-sm">
                        <Rocket size={28} />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white">💡 Feedback & Suggestions</h2>
                </div>

                <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 font-medium leading-relaxed">
                    Your feedback helps us improve 🚀 We’re always working to make WordLab better, faster, and more useful for you.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        { icon: <Bug className="text-red-500" />, label: 'Report issues', emoji: '🐛' },
                        { icon: <Rocket className="text-emerald-500" />, label: 'New features', emoji: '✨' },
                        { icon: <HelpCircle className="text-amber-500" />, label: 'Ask questions', emoji: '❓' },
                        { icon: <Share2 className="text-blue-500" />, label: 'Share ideas', emoji: '💭' }
                    ].map((item, idx) => (
                        <motion.div 
                            key={idx}
                            whileHover={{ y: -5 }}
                            className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 text-center shadow-sm"
                        >
                            <div className="mb-3 inline-flex">{item.icon}</div>
                            <div className="text-sm font-bold text-slate-800 dark:text-slate-200">{item.label} {item.emoji}</div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Footer Thank You Section */}
            <motion.div 
                variants={itemVariants}
                className="text-center bg-brand-50 dark:bg-brand-900/20 py-12 rounded-[3rem] border border-brand-100 dark:border-brand-800"
            >
                <div className="inline-flex mb-6 text-brand-500">
                    <Heart size={48} fill="currentColor" className="animate-pulse" />
                </div>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">❤️ Thank You</h2>
                <p className="text-xl text-slate-600 dark:text-slate-400 font-bold mb-2">
                    Thank you for using WordLab!
                </p>
                <p className="text-lg text-brand-600 dark:text-brand-400 font-black">
                    Your support means a lot to us 🙌
                </p>
            </motion.div>
        </motion.div>
    );
};

export default Contact;
