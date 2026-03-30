import { useState } from 'react';
import ToolLayout from '../layout/ToolLayout';
import { Copy, Trash2, ArrowUpDown, ArrowLeftRight } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

const ReverseText = () => {
    const [text, setText] = useState('');

    const reverseCharacters = () => {
        setText(text.split('').reverse().join(''));
        saveUsage('characters');
    };

    const reverseWords = () => {
        setText(text.split(' ').map(word => word.split('').reverse().join('')).join(' '));
        saveUsage('words');
    };

    const reverseWordOrder = () => {
        setText(text.split(' ').reverse().join(' '));
        saveUsage('word order');
    };

    const reverseLineOrder = () => {
        setText(text.split('\n').reverse().join('\n'));
        saveUsage('line order');
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        toast.success('Copied to clipboard');
    };

    const saveUsage = async (type) => {
        if (text.length === 0) return;
        const token = localStorage.getItem('token');
        if (!token) return;
        try {
            await axios.post('http://localhost:5000/api/tools/usage', {
                toolName: 'Reverse Text',
                inputTextLength: text.length,
                resultSummary: `Reversed by ${type}`
            }, { headers: { Authorization: `Bearer ${token}` } });
        } catch (e) { }
    };

    return (
        <ToolLayout
            title="Reverse Text"
            description="Reverse letters, whole words, or entire lines in a single click."
        >
            <div className="flex flex-wrap gap-2 mb-4 justify-center">
                <button onClick={reverseCharacters} className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-2 rounded-lg font-medium text-sm transition-colors border border-slate-300">
                    Reverse Characters
                </button>
                <button onClick={reverseWordOrder} className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-2 rounded-lg font-medium text-sm transition-colors border border-slate-300">
                    Reverse Word Order
                </button>
                <button onClick={reverseWords} className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-2 rounded-lg font-medium text-sm transition-colors border border-slate-300">
                    Reverse Letters in Words
                </button>
                <button onClick={reverseLineOrder} className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-2 rounded-lg font-medium text-sm transition-colors border border-slate-300">
                    <ArrowUpDown size={16} /> Reverse Line Order
                </button>
            </div>

            <div className="relative">
                <textarea
                    className="w-full h-64 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none resize-y text-slate-800 bg-gray-50"
                    placeholder="Type or paste your text here to reverse it..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                ></textarea>

                <div className="absolute bottom-4 right-4 flex gap-2">
                    <button onClick={handleCopy} className="p-2 bg-white text-gray-600 rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 hover:text-brand-600 transition-colors" title="Copy Text">
                        <Copy size={18} />
                    </button>
                    <button onClick={() => { setText(''); toast.success('Text cleared'); }} className="p-2 bg-white text-gray-600 rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 hover:text-red-500 transition-colors" title="Clear Text">
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>
        </ToolLayout>
    );
};

export default ReverseText;
