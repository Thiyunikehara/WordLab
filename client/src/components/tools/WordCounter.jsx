import { useState } from 'react';
import ToolLayout from '../layout/ToolLayout';
import { Copy, Download, Trash2, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const WordCounter = () => {
    const [text, setText] = useState('');

    const stats = {
        words: text.trim() ? text.trim().split(/\s+/).filter(word => /\p{L}|\p{N}/u.test(word)).length : 0,
        characters: text.length,
        charactersNoSpaces: text.replace(/\s/g, '').length,
        sentences: text.split(/[.!?]+/).filter(s => s.trim().length > 0).length,
        paragraphs: text.split(/\n+/).filter(p => p.trim().length > 0).length,
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        toast.success('Copied to clipboard');
    };

    const handleClear = () => {
        if (window.confirm("Are you sure you want to clear the text?")) {
            setText('');
            toast.success('Text cleared');
        }
    };

    const saveUsage = async () => {
        if (text.length === 0) return;
        const token = localStorage.getItem('token');
        if (!token) return;
        try {
            await axios.post('https://word-lab-ucvj.vercel.app/api/tools/usage', {
                toolName: 'Word Counter',
                inputTextLength: text.length,
                resultSummary: `${stats.words} words, ${stats.characters} chars`
            }, { headers: { Authorization: `Bearer ${token}` } });
        } catch (e) { }
    };

    return (
        <ToolLayout
            title="Word Counter"
            description="Quickly count the number of words, characters, sentences, and paragraphs in your text."
        >
            <motion.div 
                initial="hidden"
                animate="show"
                variants={{
                    show: {
                        transition: {
                            staggerChildren: 0.1
                        }
                    }
                }}
                className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8"
            >
                {[
                    { label: 'Words', value: stats.words, color: 'blue' },
                    { label: 'Characters', value: stats.characters, color: 'emerald' },
                    { label: 'Sentences', value: stats.sentences, color: 'amber' },
                    { label: 'Paragraphs', value: stats.paragraphs, color: 'purple' },
                    { label: 'Reading Time', value: `${Math.ceil(stats.words / 200)}m`, color: 'rose', fullWidth: true }
                ].map((stat, idx) => (
                    <motion.div 
                        key={stat.label}
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            show: { opacity: 1, y: 0 }
                        }}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className={`bg-${stat.color}-50 dark:bg-${stat.color}-900/10 p-5 rounded-2xl border border-${stat.color}-100 dark:border-${stat.color}-800/50 text-center shadow-sm hover:shadow-md transition-shadow duration-300 ${stat.fullWidth ? 'md:col-span-1 col-span-2' : ''}`}
                    >
                        <motion.div 
                            key={stat.value}
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            className={`text-3xl font-black text-${stat.color}-600 dark:text-${stat.color}-400 mb-1`}
                        >
                            {stat.value}
                        </motion.div>
                        <div className={`text-xs font-bold uppercase tracking-wider text-${stat.color}-800 dark:text-${stat.color}-300/70`}>{stat.label}</div>
                    </motion.div>
                ))}
            </motion.div>

            <div className="relative">
                <textarea
                    className="w-full h-64 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none resize-y text-slate-800 bg-gray-50"
                    placeholder="Type or paste your text here..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onBlur={saveUsage}
                ></textarea>

                <div className="absolute bottom-4 right-4 flex gap-3">
                    <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleCopy} 
                        className="p-3 bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 hover:text-brand-600 dark:hover:text-brand-400 transition-colors" 
                        title="Copy Text"
                    >
                        <Copy size={20} />
                    </motion.button>
                    <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleClear} 
                        className="p-3 bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 hover:text-red-500 transition-colors" 
                        title="Clear Text"
                    >
                        <Trash2 size={20} />
                    </motion.button>
                </div>
            </div>
        </ToolLayout>
    );
};

export default WordCounter;
