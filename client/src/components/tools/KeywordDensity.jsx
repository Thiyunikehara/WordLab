import { useState, useMemo } from 'react';
import ToolLayout from '../layout/ToolLayout';
import { Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

const KeywordDensity = () => {
    const [text, setText] = useState('');

    const keywords = useMemo(() => {
        if (!text.trim()) return [];

        // Convert to lowercase, remove punctuation, split by space
        const words = text.toLowerCase()
            .replace(/[^\w\s\u00C0-\u024F]+/g, ' ')
            .split(/\s+/)
            .filter(w => w.length > 2); // filter out very short words

        const totalWords = words.length;
        if (totalWords === 0) return [];

        const counts = {};
        for (const w of words) {
            counts[w] = (counts[w] || 0) + 1;
        }

        return Object.entries(counts)
            .map(([word, count]) => ({
                word,
                count,
                percentage: ((count / totalWords) * 100).toFixed(1)
            }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 15); // Top 15 keywords
    }, [text]);

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
            await axios.post('http://localhost:5000/api/tools/usage', {
                toolName: 'Keyword Density',
                inputTextLength: text.length,
                resultSummary: `Found ${keywords.length} keywords`
            }, { headers: { Authorization: `Bearer ${token}` } });
        } catch (e) { }
    };

    return (
        <ToolLayout
            title="Keyword Density Checker"
            description="Extract and analyze the most frequently used words in your text (ignores words under 3 characters)."
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                <div className="relative">
                    <textarea
                        className="w-full h-[400px] p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none resize-none text-slate-800 bg-gray-50"
                        placeholder="Type or paste your text here..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onBlur={saveUsage}
                    ></textarea>

                    <div className="absolute bottom-4 right-4 flex gap-2">
                        <button onClick={handleClear} className="p-2 bg-white text-gray-600 rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 hover:text-red-500 transition-colors" title="Clear Text">
                            <Trash2 size={18} />
                        </button>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-4 border-b pb-2">Top Keywords</h3>
                    {keywords.length === 0 ? (
                        <div className="text-gray-500 text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                            Not enough text to analyze.
                        </div>
                    ) : (
                        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                            {keywords.map((k, i) => (
                                <div key={i} className="flex items-center justify-between p-3 bg-brand-50 border border-brand-100 rounded-lg">
                                    <span className="font-semibold text-brand-700">{k.word}</span>
                                    <div className="flex flex-col items-end">
                                        <span className="text-sm font-bold text-slate-700">{k.count} <span className="text-xs font-normal text-slate-500">times</span></span>
                                        <span className="text-xs text-brand-600 bg-white px-2 py-0.5 rounded-full border border-brand-200 mt-1">{k.percentage}%</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </ToolLayout>
    );
};

export default KeywordDensity;
