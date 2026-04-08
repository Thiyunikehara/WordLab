import { useState, useMemo } from 'react';
import ToolLayout from '../layout/ToolLayout';
import { Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

const DuplicateWord = () => {
    const [text, setText] = useState('');

    const duplicates = useMemo(() => {
        if (!text.trim()) return [];

        const words = text.toLowerCase()
            .replace(/[^\w\s]/g, '')
            .split(/\s+/)
            .filter(w => w.length > 3); // ignore small words

        const counts = {};
        for (const w of words) counts[w] = (counts[w] || 0) + 1;

        return Object.entries(counts)
            .filter(([_, count]) => count > 1)
            .sort((a, b) => b[1] - a[1]);
    }, [text]);

    const handleClear = () => {
        if (window.confirm("Are you sure you want to clear the text?")) {
            setText('');
            toast.success('Text cleared');
        }
    };

    const highlightedText = useMemo(() => {
        if (!text || duplicates.length === 0) return text;

        // Create a RegExp to find the duplicate words
        const duplicateWords = duplicates.map(d => d[0]);
        const regex = new RegExp(`\\b(${duplicateWords.join('|')})\\b`, 'gi');

        // Split text and map to JSX elements
        const parts = text.split(regex);

        return parts.map((part, i) => {
            // Check if this part is one of the duplicate words
            if (duplicateWords.includes(part.toLowerCase())) {
                return <mark key={i} className="bg-orange-200 text-orange-900 px-1 rounded">{part}</mark>;
            }
            return <span key={i}>{part}</span>;
        });
    }, [text, duplicates]);

    const saveUsage = async () => {
        if (text.length === 0) return;
        const token = localStorage.getItem('token');
        if (!token) return;
        try {
            await axios.post('https://word-lab-ucvj.vercel.app/api/tools/usage', {
                toolName: 'Duplicate Highlighter',
                inputTextLength: text.length,
                resultSummary: `Highlighted ${duplicates.length} duplicate words`
            }, { headers: { Authorization: `Bearer ${token}` } });
        } catch (e) { }
    };

    return (
        <ToolLayout
            title="Duplicate Word Highlighter"
            description="Find and visually highlight words that appear more than once in your text."
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                <div className="relative">
                    <textarea
                        className="w-full h-[400px] p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none resize-none text-slate-800 bg-white"
                        placeholder="Type or paste your text here..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onBlur={saveUsage}
                    ></textarea>

                    <div className="absolute bottom-4 right-4 flex gap-2">
                        <button onClick={handleClear} className="p-2 bg-gray-100 text-gray-600 rounded-lg shadow-sm border border-gray-200 hover:bg-gray-200 hover:text-red-500 transition-colors" title="Clear Text">
                            <Trash2 size={18} />
                        </button>
                    </div>
                </div>

                <div className="h-[400px] bg-slate-50 border border-gray-200 rounded-xl p-4 overflow-y-auto whitespace-pre-wrap leading-relaxed">
                    {text.trim() === '' ? (
                        <div className="text-gray-400 text-center h-full flex items-center justify-center italic">
                            Highlights will appear here...
                        </div>
                    ) : (
                        <div>{highlightedText}</div>
                    )}
                </div>
            </div>

            {duplicates.length > 0 && (
                <div className="mt-4 p-4 bg-orange-50 border border-orange-100 rounded-lg">
                    <h4 className="font-semibold text-orange-800 mb-2">Most repeated words (length &gt; 3):</h4>
                    <div className="flex flex-wrap gap-2">
                        {duplicates.slice(0, 10).map((d, i) => (
                            <span key={i} className="bg-white px-3 py-1 rounded text-sm border border-orange-200 text-orange-700">
                                {d[0]}: <strong>{d[1]}</strong>
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </ToolLayout>
    );
};

export default DuplicateWord;
