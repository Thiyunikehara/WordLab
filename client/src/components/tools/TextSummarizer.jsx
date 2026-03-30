import { useState } from 'react';
import ToolLayout from '../layout/ToolLayout';
import { Copy, Trash2, Zap } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

const TextSummarizer = () => {
    const [text, setText] = useState('');
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false);

    const generateSummary = () => {
        if (!text.trim()) return toast.error('Please enter some text');

        setLoading(true);

        // Client-side dummy summarizer: Extracts 25% of the most important looking sentences
        // Real-world scenario would call an AI backend service for this
        setTimeout(() => {
            const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
            if (sentences.length <= 3) {
                setLoading(false);
                setSummary(text);
                return;
            }

            // Simple heuristic: First sentence is important. Last sentence is important. 
            // Plus a few randomly or based on length.
            const first = sentences[0];
            const last = sentences[sentences.length - 1];

            const middle = sentences.slice(1, -1);
            // sort by length to find "meaty" sentences
            middle.sort((a, b) => b.length - a.length);

            const numToExtract = Math.max(1, Math.floor(sentences.length * 0.25));
            const extractedMiddle = middle.slice(0, numToExtract);

            // Re-order by appearance
            const finalSentences = [first, ...extractedMiddle, last];
            const reordered = finalSentences.sort((a, b) => text.indexOf(a) - text.indexOf(b));

            setSummary(reordered.join(' '));
            setLoading(false);
            saveUsage();
            toast.success('Summary generated!');
        }, 800);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(summary);
        toast.success('Copied to clipboard');
    };

    const saveUsage = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;
        try {
            await axios.post('http://localhost:5000/api/tools/usage', {
                toolName: 'Text Summarizer',
                inputTextLength: text.length,
                resultSummary: `Summarized to ${summary.split(' ').length} words`
            }, { headers: { Authorization: `Bearer ${token}` } });
        } catch (e) { }
    };

    return (
        <ToolLayout
            title="Text Summarizer (Basic)"
            description="Quickly extract the most important sentences to generate a concise summary."
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
                <textarea
                    className="w-full h-64 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none resize-y text-slate-800 bg-gray-50 mb-2"
                    placeholder="Paste long article or text here..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                ></textarea>

                <div className="relative h-64">
                    {loading ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-50 border border-gray-200 rounded-xl">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-600"></div>
                        </div>
                    ) : (
                        <textarea
                            className="w-full h-full p-4 border border-brand-200 bg-white rounded-xl focus:ring-2 focus:ring-brand-500 outline-none resize-none text-slate-800 leading-relaxed shadow-inner"
                            placeholder="Your summary will appear here"
                            readOnly
                            value={summary}
                        ></textarea>
                    )}

                    {summary && !loading && (
                        <button onClick={handleCopy} className="absolute bottom-4 right-4 p-2 bg-brand-50 text-brand-600 rounded-lg shadow-sm border border-brand-100 hover:bg-brand-100 transition-colors" title="Copy Text">
                            <Copy size={18} />
                        </button>
                    )}
                </div>
            </div>

            <div className="flex justify-center mt-4">
                <button
                    onClick={generateSummary}
                    disabled={loading || text.length < 50}
                    className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-full px-8 py-3 transition-colors focus:ring-4 focus:ring-brand-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Zap size={20} />
                    {loading ? 'Analyzing...' : 'Generate Summary'}
                </button>
            </div>
        </ToolLayout>
    );
};

export default TextSummarizer;
