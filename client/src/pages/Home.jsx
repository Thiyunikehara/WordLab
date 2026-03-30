import { Link, useSearchParams } from 'react-router-dom';
import { Type, Hash, AlignLeft, AlignJustify, CaseSensitive, Minimize2, Search, Copy, FileText, RefreshCcw, Volume2, Clock, Code, Link as LinkIcon, Replace, ArrowDownAZ, LayoutTemplate, Delete, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import AdBanner from '../components/shared/AdBanner';

const tools = [
    { id: 'word-counter', name: 'Word Counter', description: 'Count words, characters, sentences, and paragraphs.', icon: <Type size={24} />, path: '/tool/word-counter' },
    { id: 'character-counter', name: 'Character Counter', description: 'Detailed count of letters, numbers, and symbols.', icon: <Hash size={24} />, path: '/tool/character-counter' },
    { id: 'sentence-counter', name: 'Sentence Counter', description: 'Quickly count the number of sentences in your text.', icon: <AlignLeft size={24} />, path: '/tool/sentence-counter' },
    { id: 'paragraph-counter', name: 'Paragraph Counter', description: 'Count paragraphs and line breaks.', icon: <AlignJustify size={24} />, path: '/tool/paragraph-counter' },
    { id: 'case-converter', name: 'Text Case Converter', description: 'Change text to uppercase, lowercase, title case.', icon: <CaseSensitive size={24} />, path: '/tool/case-converter' },
    { id: 'remove-spaces', name: 'Remove Extra Spaces', description: 'Clean up text by removing extra spaces.', icon: <Minimize2 size={24} />, path: '/tool/remove-spaces' },
    { id: 'keyword-density', name: 'Keyword Density', description: 'Analyze text for keyword frequency and density.', icon: <Search size={24} />, path: '/tool/keyword-density' },
    { id: 'duplicate-word', name: 'Duplicate Highlighter', description: 'Find and highlight duplicate words.', icon: <Copy size={24} />, path: '/tool/duplicate-word' },
    { id: 'text-summarizer', name: 'Text Summarizer', description: 'Extract the most important sentences.', icon: <FileText size={24} />, path: '/tool/text-summarizer' },
    { id: 'reverse-text', name: 'Reverse Text', description: 'Reverse the characters or words in your text.', icon: <RefreshCcw size={24} />, path: '/tool/reverse-text' },
    { id: 'text-to-speech', name: 'Text to Speech', description: 'Listen to your text spoken aloud.', icon: <Volume2 size={24} />, path: '/tool/text-to-speech' },
    { id: 'reading-time', name: 'Reading Time Estimator', description: 'Calculate how long it takes to read.', icon: <Clock size={24} />, path: '/tool/reading-time' },
    { id: 'base64-encode', name: 'Base64 Encode/Decode', description: 'Convert text to and from Base64 format.', icon: <Code size={24} />, path: '/tool/base64-encode' },
    { id: 'url-encode', name: 'URL Encode/Decode', description: 'Safely encode or decode URLs.', icon: <LinkIcon size={24} />, path: '/tool/url-encode' },
    { id: 'find-replace', name: 'Find and Replace', description: 'Find specific text and replace it.', icon: <Replace size={24} />, path: '/tool/find-replace' },
    { id: 'sort-lines', name: 'Sort Text Lines', description: 'Sort lines alphabetically or numerically.', icon: <ArrowDownAZ size={24} />, path: '/tool/sort-lines' },
    { id: 'lorem-ipsum', name: 'Lorem Ipsum Generator', description: 'Generate dummy text for your designs.', icon: <LayoutTemplate size={24} />, path: '/tool/lorem-ipsum' },
    { id: 'remove-line-breaks', name: 'Remove Line Breaks', description: 'Remove all newlines from your text.', icon: <Delete size={24} />, path: '/tool/remove-line-breaks' },
    { id: 'extract-emails', name: 'Extract Emails', description: 'Find and extract all email addresses.', icon: <Mail size={24} />, path: '/tool/extract-emails' },
    { id: 'extract-urls', name: 'Extract URLs', description: 'Find and extract all web links from text.', icon: <LinkIcon size={24} />, path: '/tool/extract-urls' },
];

const Home = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';

    const filteredTools = tools.filter(tool =>
        tool.name.toLowerCase().includes(query.toLowerCase()) ||
        tool.description.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <motion.div 
            initial="initial"
            animate="animate"
            className="max-w-6xl mx-auto px-4"
        >
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative overflow-hidden text-center py-20 px-4 rounded-[2rem] mb-12 shadow-2xl border border-brand-100 dark:border-slate-800 bg-gradient-to-br from-white via-brand-50 to-indigo-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-brand-900/20"
            >
                {/* Advanced Floating Mesh Gradients */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <motion.div 
                        animate={{ 
                            x: [0, 40, -20, 0],
                            y: [0, -30, 20, 0],
                            scale: [1, 1.1, 0.95, 1]
                        }}
                        transition={{ 
                            duration: 20, 
                            repeat: Infinity, 
                            ease: "easeInOut" 
                        }}
                        className="absolute -top-[20%] -left-[10%] w-[60%] h-[150%] rounded-full bg-brand-200/30 dark:bg-brand-500/10 blur-[100px]"
                    />
                    <motion.div 
                        animate={{ 
                            x: [0, -40, 30, 0],
                            y: [0, 40, -30, 0],
                            scale: [1, 0.9, 1.1, 1]
                        }}
                        transition={{ 
                            duration: 25, 
                            repeat: Infinity, 
                            ease: "easeInOut" 
                        }}
                        className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[150%] rounded-full bg-blue-200/30 dark:bg-indigo-600/10 blur-[100px]"
                    />
                </div>

                <div className="relative z-10">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 dark:bg-slate-800/80 border border-brand-100 dark:border-slate-700 text-sm font-bold text-brand-700 dark:text-brand-400 mb-8 backdrop-blur-md shadow-sm"
                    >
                        <Type size={14} className="text-brand-500" /> 20+ Free Text Tools
                    </motion.div>

                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 tracking-tight leading-[1.1]"
                    >
                        The Ultimate <br className="hidden md:block" />
                        <span className="relative inline-block mt-2">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-indigo-600 to-brand-500 dark:from-brand-400 dark:via-indigo-400 dark:to-brand-300">
                                Text Toolkit
                            </span>
                            <motion.div 
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 0.6, duration: 0.8, ease: "circOut" }}
                                className="absolute -bottom-2 left-0 w-full h-1.5 bg-gradient-to-r from-brand-600/20 to-indigo-600/20 rounded-full"
                            />
                        </span>
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium"
                    >
                        WordLab provides a professional suite of free, fast, and secure tools to analyze, edit, and format your text. Select a tool below to get started.
                    </motion.p>
                </div>
            </motion.div>

            {/* Strategic High-Visibility Home Ad */}
            <div className="mb-12 max-w-4xl mx-auto">
                <AdBanner id="home-banner-top" />
            </div>

            <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <Type className="text-brand-500" />
                    All Text Tools {query && <span className="text-sm font-normal text-slate-500 bg-slate-100 px-3 py-1 rounded-full ml-2">Filtering by "{query}"</span>}
                </h2>
                {filteredTools.length > 0 ? (
                    <motion.div 
                        initial="hidden"
                        animate="show"
                        variants={{
                            hidden: { opacity: 0 },
                            show: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.05
                                }
                            }
                        }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                    >
                        {filteredTools.map((tool) => (
                            <motion.div
                                key={tool.id}
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    show: { opacity: 1, y: 0 }
                                }}
                                whileHover={{ scale: 1.02, y: -8 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            >
                                <Link
                                    to={tool.path}
                                    className="block h-full bg-white dark:bg-slate-900/40 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:border-brand-300 dark:hover:border-brand-500/50 transition-all duration-300 ease-out group backdrop-blur-sm relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-brand-500/5 to-transparent rounded-bl-[100%] opacity-0 group-hover:opacity-100 transition-opacity" />
                                    
                                    <div className="w-12 h-12 bg-brand-50 dark:bg-brand-900/30 rounded-xl flex items-center justify-center text-brand-600 dark:text-brand-400 mb-5 group-hover:bg-brand-600 group-hover:text-white dark:group-hover:bg-brand-500 transition-all duration-300 shadow-sm group-hover:shadow-brand-200 dark:group-hover:shadow-brand-900/40">
                                        {tool.icon}
                                    </div>
                                    <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">{tool.name}</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed font-medium">{tool.description}</p>
                                    
                                    <div className="mt-4 flex items-center text-xs font-bold text-brand-600 dark:text-brand-400 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                                        Open Tool <span className="ml-1">→</span>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-200">
                        <div className="inline-flex w-16 h-16 bg-brand-50 text-brand-500 rounded-full items-center justify-center mb-4">
                            <Search size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-2">No tools found</h3>
                        <p className="text-slate-500">We couldn't find any tools matching "{query}".</p>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default Home;
