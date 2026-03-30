import { useState } from 'react';
import ToolLayout from '../layout/ToolLayout';
import { Copy, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

const SentenceCounter = () => {
    const [text, setText] = useState('');

    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        toast.success('Copied to clipboard');
    };

    const handleClear = () => {
        setText('');
        toast.success('Text cleared');
    };

    const saveUsage = async () => {
        if (text.length === 0) return;
        const token = localStorage.getItem('token');
        if (!token) return;
        try {
            await axios.post('http://localhost:5000/api/tools/usage', {
                toolName: 'Sentence Counter',
                inputTextLength: text.length,
                resultSummary: `${sentences} sentences`
            }, { headers: { Authorization: `Bearer ${token}` } });
        } catch (e) { }
    };

    return (
        <ToolLayout
            title="Sentence Counter"
            description="Find out exactly how many sentences are in your writing."
        >
            <div className="mb-6 flex justify-center">
                <div className="bg-brand-50 border border-brand-200 px-8 py-4 rounded-2xl flex flex-col items-center">
                    <span className="text-4xl font-black text-brand-600">{sentences}</span>
                    <span className="text-brand-800 font-medium">Sentences</span>
                </div>
            </div>

            <div className="relative">
                <textarea
                    className="w-full h-64 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none resize-y text-slate-800 bg-gray-50"
                    placeholder="Type or paste your text here..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onBlur={saveUsage}
                ></textarea>

                <div className="absolute bottom-4 right-4 flex gap-2">
                    <button onClick={handleCopy} className="p-2 bg-white text-gray-600 rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 hover:text-brand-600 transition-colors" title="Copy Text">
                        <Copy size={18} />
                    </button>
                    <button onClick={handleClear} className="p-2 bg-white text-gray-600 rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 hover:text-red-500 transition-colors" title="Clear Text">
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>
        </ToolLayout>
    );
};

export default SentenceCounter;
