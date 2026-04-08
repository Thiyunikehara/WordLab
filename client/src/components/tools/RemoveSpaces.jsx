import { useState } from 'react';
import ToolLayout from '../layout/ToolLayout';
import { Copy, Trash2, Wand2 } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

const RemoveSpaces = () => {
    const [text, setText] = useState('');

    const fixSpaces = () => {
        if (!text) return;
        // Replace multiple spaces with a single space, and trim ends
        setText(text.replace(/\s+/g, ' ').trim());
        toast.success('Extra spaces removed!');
        saveUsage();
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        toast.success('Copied to clipboard');
    };

    const saveUsage = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;
        try {
            await axios.post('https://word-lab-ucvj.vercel.app/api/tools/usage', {
                toolName: 'Remove Extra Spaces',
                inputTextLength: text.length,
                resultSummary: `Cleaned whitespace`
            }, { headers: { Authorization: `Bearer ${token}` } });
        } catch (e) { }
    };

    return (
        <ToolLayout
            title="Remove Extra Spaces"
            description="Instantly clean up your text by removing double spaces, trailing spaces, and extra whitespace."
        >
            <div className="mb-4">
                <button
                    onClick={fixSpaces}
                    className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-lg px-5 py-2.5 transition-colors focus:ring-4 focus:ring-brand-300"
                >
                    <Wand2 size={18} />
                    Clean Text
                </button>
            </div>

            <div className="relative">
                <textarea
                    className="w-full h-64 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none resize-y text-slate-800 bg-gray-50 font-mono text-sm leading-relaxed"
                    placeholder="Paste   text    with too    many   spaces here..."
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

export default RemoveSpaces;
