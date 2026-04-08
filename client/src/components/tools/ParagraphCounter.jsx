import { useState } from 'react';
import ToolLayout from '../layout/ToolLayout';
import { Copy, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

const ParagraphCounter = () => {
    const [text, setText] = useState('');

    const paragraphs = text.split(/\n+/).filter(p => p.trim().length > 0).length;

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
            await axios.post('https://word-lab-ucvj.vercel.app/api/tools/usage', {
                toolName: 'Paragraph Counter',
                inputTextLength: text.length,
                resultSummary: `${paragraphs} paragraphs`
            }, { headers: { Authorization: `Bearer ${token}` } });
        } catch (e) { }
    };

    return (
        <ToolLayout
            title="Paragraph Counter"
            description="Quickly count the number of paragraphs in your document."
        >
            <div className="mb-6 flex justify-center">
                <div className="bg-purple-50 border border-purple-200 px-8 py-4 rounded-2xl flex flex-col items-center">
                    <span className="text-4xl font-black text-purple-600">{paragraphs}</span>
                    <span className="text-purple-800 font-medium">Paragraphs</span>
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

export default ParagraphCounter;
