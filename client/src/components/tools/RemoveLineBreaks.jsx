import { useState } from 'react';
import ToolLayout from '../layout/ToolLayout';
import { Copy, Trash2, Delete } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

const RemoveLineBreaks = () => {
    const [text, setText] = useState('');

    const removeBreaks = () => {
        if (!text.trim()) return;
        // Replace newlines with spaces, then consolidate multiple spaces into one
        setText(text.replace(/(\r\n|\n|\r)/gm, " ").replace(/\s+/g, " ").trim());
        saveUsage();
        toast.success('Line breaks removed');
    };

    const removeBreaksKeepParas = () => {
        if (!text.trim()) return;
        // Replace single newlines with spaces, but keep double newlines (paragraphs)
        const paras = text.split(/\n{2,}/g);
        const cleaned = paras.map(p => p.replace(/(\r\n|\n|\r)/gm, " ").trim()).join('\n\n');
        setText(cleaned);
        saveUsage();
        toast.success('Line breaks within paragraphs removed');
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        toast.success('Copied to clipboard');
    };

    const saveUsage = async () => {
        if (text.length === 0) return;
        const token = localStorage.getItem('token');
        if (!token) return;
        try {
            await axios.post('https://word-lab-ucvj.vercel.app/api/tools/usage', {
                toolName: 'Remove Line Breaks',
                inputTextLength: text.length,
                resultSummary: `Removed line breaks`
            }, { headers: { Authorization: `Bearer ${token}` } });
        } catch (e) { }
    };

    return (
        <ToolLayout
            title="Remove Line Breaks"
            description="Clean up copied text from PDFs or emails that have weird hard returns in the middle of sentences."
        >
            <div className="flex gap-4 mb-4 justify-center">
                <button
                    onClick={removeBreaksKeepParas}
                    className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-lg px-6 py-2.5 transition-colors focus:ring-4 focus:ring-brand-300"
                >
                    <Delete size={18} /> Keep Paragraphs
                </button>
                <button
                    onClick={removeBreaks}
                    className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white border border-slate-300 font-medium rounded-lg px-6 py-2.5 transition-colors focus:ring-4 focus:ring-slate-200"
                >
                    <Delete size={18} /> Remove ALL Breaks
                </button>
            </div>

            <div className="relative">
                <textarea
                    className="w-full h-[400px] p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none resize-none text-slate-800 bg-gray-50 leading-relaxed"
                    placeholder="Paste text with broken paragraphs here..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                ></textarea>

                <div className="absolute bottom-4 right-4 flex gap-2">
                    <button onClick={handleCopy} className="p-2 bg-white text-gray-600 rounded-md shadow-sm border border-gray-200 hover:bg-gray-50 hover:text-brand-600 transition-colors" title="Copy Text">
                        <Copy size={16} />
                    </button>
                    <button onClick={() => { setText(''); toast.success('Cleared'); }} className="p-2 bg-white text-gray-600 rounded-md shadow-sm border border-gray-200 hover:bg-gray-50 hover:text-red-500 transition-colors" title="Clear Text">
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>
        </ToolLayout>
    );
};

export default RemoveLineBreaks;
