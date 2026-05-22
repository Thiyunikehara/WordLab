import { Link, useSearchParams } from 'react-router-dom';
import { Type, Hash, AlignLeft, AlignJustify, CaseSensitive, Minimize2, Search, Copy, FileText, RefreshCcw, Volume2, Clock, Code, Link as LinkIcon, Replace, ArrowDownAZ, LayoutTemplate, Delete, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import AdBanner from '../components/shared/AdBanner';
import ToolCard from '../components/shared/ToolCard';
import useTypingEffect from '../hooks/useTypingEffect';

const tools = [
    { id: 'word-counter',       name: 'Word Counter',           description: 'Count words, characters, sentences, and paragraphs.',  icon: <Type size={24} />,         path: '/tool/word-counter' },
    { id: 'character-counter',  name: 'Character Counter',      description: 'Detailed count of letters, numbers, and symbols.',      icon: <Hash size={24} />,         path: '/tool/character-counter' },
    { id: 'sentence-counter',   name: 'Sentence Counter',       description: 'Quickly count the number of sentences in your text.',   icon: <AlignLeft size={24} />,    path: '/tool/sentence-counter' },
    { id: 'paragraph-counter',  name: 'Paragraph Counter',      description: 'Count paragraphs and line breaks.',                     icon: <AlignJustify size={24} />, path: '/tool/paragraph-counter' },
    { id: 'case-converter',     name: 'Text Case Converter',    description: 'Change text to uppercase, lowercase, title case.',      icon: <CaseSensitive size={24} />,path: '/tool/case-converter' },
    { id: 'remove-spaces',      name: 'Remove Extra Spaces',    description: 'Clean up text by removing extra spaces.',               icon: <Minimize2 size={24} />,    path: '/tool/remove-spaces' },
    { id: 'keyword-density',    name: 'Keyword Density',        description: 'Analyze text for keyword frequency and density.',       icon: <Search size={24} />,       path: '/tool/keyword-density' },
    { id: 'duplicate-word',     name: 'Duplicate Highlighter',  description: 'Find and highlight duplicate words.',                   icon: <Copy size={24} />,         path: '/tool/duplicate-word' },
    { id: 'text-summarizer',    name: 'Text Summarizer',        description: 'Extract the most important sentences.',                 icon: <FileText size={24} />,     path: '/tool/text-summarizer' },
    { id: 'reverse-text',       name: 'Reverse Text',           description: 'Reverse the characters or words in your text.',         icon: <RefreshCcw size={24} />,   path: '/tool/reverse-text' },
    { id: 'text-to-speech',     name: 'Text to Speech',         description: 'Listen to your text spoken aloud.',                    icon: <Volume2 size={24} />,      path: '/tool/text-to-speech' },
    { id: 'reading-time',       name: 'Reading Time Estimator', description: 'Calculate how long it takes to read.',                  icon: <Clock size={24} />,        path: '/tool/reading-time' },
    { id: 'base64-encode',      name: 'Base64 Encode/Decode',   description: 'Convert text to and from Base64 format.',              icon: <Code size={24} />,         path: '/tool/base64-encode' },
    { id: 'url-encode',         name: 'URL Encode/Decode',      description: 'Safely encode or decode URLs.',                        icon: <LinkIcon size={24} />,     path: '/tool/url-encode' },
    { id: 'find-replace',       name: 'Find and Replace',       description: 'Find specific text and replace it.',                   icon: <Replace size={24} />,      path: '/tool/find-replace' },
    { id: 'sort-lines',         name: 'Sort Text Lines',        description: 'Sort lines alphabetically or numerically.',            icon: <ArrowDownAZ size={24} />,  path: '/tool/sort-lines' },
    { id: 'lorem-ipsum',        name: 'Lorem Ipsum Generator',  description: 'Generate dummy text for your designs.',                icon: <LayoutTemplate size={24} />,path: '/tool/lorem-ipsum' },
    { id: 'remove-line-breaks', name: 'Remove Line Breaks',     description: 'Remove all newlines from your text.',                  icon: <Delete size={24} />,       path: '/tool/remove-line-breaks' },
    { id: 'extract-emails',     name: 'Extract Emails',         description: 'Find and extract all email addresses.',                icon: <Mail size={24} />,         path: '/tool/extract-emails' },
    { id: 'extract-urls',       name: 'Extract URLs',           description: 'Find and extract all web links from text.',            icon: <LinkIcon size={24} />,     path: '/tool/extract-urls' },
];

// Rotating words for the gradient subtitle (cycles forever)
const SUBTITLE_WORDS = [
    'Text Toolkit',
    'Word Counter',
    'Case Converter',
    'Text Analyzer',
    'Base64 Encoder',
    'Text Summarizer',
    'Keyword Checker',
];

// One-shot headline prefix
const HEADLINE_PREFIX = ['WordLab \u2014 The Ultimate'];

const Home = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';

    // "WordLab — The Ultimate" types once on load then stays
    const { displayText: headlineText, isDone: headlineDone } = useTypingEffect(
        HEADLINE_PREFIX, 55, 40, 0, true   // once=true
    );

    // Rotating subtitle (cycles forever)
    const { displayText: subtitleText, isTyping: subtitleTyping } = useTypingEffect(
        SUBTITLE_WORDS, 75, 40, 2000
    );

    const filteredTools = tools.filter(tool =>
        tool.name.toLowerCase().includes(query.toLowerCase()) ||
        tool.description.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-6xl mx-auto px-4"
        >
            {/* ── Hero Section ──────────────────────────────────────── */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative overflow-hidden text-center py-20 px-4 rounded-[2rem] mb-12 shadow-2xl border border-brand-100 dark:border-slate-800 bg-gradient-to-br from-white via-brand-50 to-indigo-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-brand-900/20"
            >
                {/* Floating mesh gradients */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <motion.div
                        animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.1, 0.95, 1] }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute -top-[20%] -left-[10%] w-[60%] h-[150%] rounded-full bg-brand-200/30 dark:bg-brand-500/10 blur-[100px]"
                    />
                    <motion.div
                        animate={{ x: [0, -40, 30, 0], y: [0, 40, -30, 0], scale: [1, 0.9, 1.1, 1] }}
                        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[150%] rounded-full bg-blue-200/30 dark:bg-indigo-600/10 blur-[100px]"
                    />
                </div>

                <div className="relative z-10">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 dark:bg-slate-800/80 border border-brand-100 dark:border-slate-700 text-sm font-bold text-brand-700 dark:text-brand-400 mb-8 backdrop-blur-md shadow-sm"
                    >
                        <Type size={14} className="text-brand-500" /> 20+ Free Text Tools
                    </motion.div>

                    {/* H1 — two-layer typing */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 tracking-tight leading-[1.1] min-h-[1.2em]"
                    >
                        {/* One-shot: types "WordLab — The Ultimate" once */}
                        <span className="relative">
                            {headlineText}
                            {/* Cursor hidden once done */}
                            {!headlineDone && (
                                <span className="inline-block w-[3px] h-[0.75em] ml-1 align-middle rounded-sm bg-slate-700 dark:bg-slate-200 animate-pulse" />
                            )}
                        </span>

                        {/* Rotating subtitle — only visible after headline finishes */}
                        {headlineDone && (
                            <>
                                <br className="hidden md:block" />
                                <span className="relative inline-block mt-2">
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-indigo-600 to-brand-500 dark:from-brand-400 dark:via-indigo-400 dark:to-brand-300">
                                        {subtitleText}
                                    </span>
                                    {/* Blinking cursor */}
                                    <span
                                        className="inline-block w-[3px] h-[0.85em] ml-1 align-middle rounded-sm bg-gradient-to-b from-brand-500 to-indigo-500"
                                        style={{ animation: subtitleTyping ? 'none' : 'wl-blink 0.75s step-end infinite' }}
                                    />
                                    <motion.div
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        transition={{ duration: 0.8, ease: 'circOut' }}
                                        className="absolute -bottom-2 left-0 w-full h-1.5 bg-gradient-to-r from-brand-600/20 to-indigo-600/20 rounded-full"
                                    />
                                </span>
                            </>
                        )}
                    </motion.h1>

                    {/* Subtext — scroll reveal */}
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium"
                    >
                        WordLab provides a professional suite of free, fast, and secure tools to analyze, edit, and format your text. Whether you need to count words, convert text cases, or extract data, WordLab has you covered. Select a WordLab tool below to get started.
                    </motion.p>

                    <p className="hidden">WordLab is a free online text toolkit offering word counter, character counter, sentence counter, text case converter, keyword density checker, text summarizer, Base64 encoder, URL encoder, find and replace, and more. Use WordLab to analyze, edit, format, and transform your text quickly and securely.</p>
                </div>
            </motion.div>

            {/* ── Ad Banner — scroll reveal ──────────────────────────── */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="mb-12 max-w-4xl mx-auto"
            >
                <AdBanner id="home-banner-top" />
            </motion.div>

            {/* ── Tools Grid ────────────────────────────────────────── */}
            <div className="mb-8">
                {/* Section header — scroll reveal */}
                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2"
                >
                    <Type className="text-brand-500" />
                    All Text Tools{' '}
                    {query && (
                        <span className="text-sm font-normal text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full ml-2">
                            Filtering by &quot;{query}&quot;
                        </span>
                    )}
                </motion.h2>

                {filteredTools.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {filteredTools.map((tool, index) => (
                            <ToolCard key={tool.id} tool={tool} index={index} />
                        ))}
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-12 bg-white dark:bg-slate-900/40 rounded-2xl border border-dashed border-gray-200 dark:border-slate-700"
                    >
                        <div className="inline-flex w-16 h-16 bg-brand-50 dark:bg-brand-900/30 text-brand-500 rounded-full items-center justify-center mb-4">
                            <Search size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">No tools found</h3>
                        <p className="text-slate-500">We couldn&apos;t find any tools matching &quot;{query}&quot;.</p>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

export default Home;
