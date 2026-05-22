import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * ToolCard — individual tool card with:
 *  • Scroll-reveal via whileInView
 *  • Hover title character-by-character shimmer reveal
 */
const ToolCard = ({ tool, index }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <motion.div
            // ── Scroll Reveal ──────────────────────────────────────────
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
                delay: (index % 4) * 0.07,   // stagger per row position
            }}
            // ── Hover lift ────────────────────────────────────────────
            whileHover={{ scale: 1.03, y: -8 }}
            whileTap={{ scale: 0.97 }}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
        >
            <Link
                to={tool.path}
                className="block h-full bg-white dark:bg-slate-900/40 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:border-brand-300 dark:hover:border-brand-500/50 transition-all duration-300 ease-out group backdrop-blur-sm relative overflow-hidden"
            >
                {/* Corner glow on hover */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-brand-500/5 to-transparent rounded-bl-[100%] opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Icon */}
                <div className="w-12 h-12 bg-brand-50 dark:bg-brand-900/30 rounded-xl flex items-center justify-center text-brand-600 dark:text-brand-400 mb-5 group-hover:bg-brand-600 group-hover:text-white dark:group-hover:bg-brand-500 transition-all duration-300 shadow-sm group-hover:shadow-brand-200 dark:group-hover:shadow-brand-900/40">
                    {tool.icon}
                </div>

                {/* Title — character shimmer on hover */}
                <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors text-[0.95rem] leading-snug">
                    {tool.name.split('').map((char, i) => (
                        <motion.span
                            key={i}
                            animate={hovered
                                ? { opacity: [0.3, 1], y: [4, 0] }
                                : { opacity: 1, y: 0 }
                            }
                            transition={{
                                duration: 0.25,
                                delay: hovered ? i * 0.025 : 0,
                                ease: 'easeOut',
                            }}
                            className="inline-block"
                            style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
                        >
                            {char}
                        </motion.span>
                    ))}
                </h3>

                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed font-medium">
                    {tool.description}
                </p>

                {/* Arrow CTA */}
                <div className="mt-4 flex items-center text-xs font-bold text-brand-600 dark:text-brand-400 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                    Open Tool <span className="ml-1">→</span>
                </div>
            </Link>
        </motion.div>
    );
};

export default ToolCard;
