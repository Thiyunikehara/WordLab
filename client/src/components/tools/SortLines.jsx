import { useState } from 'react';
import ToolLayout from '../layout/ToolLayout';
import { Copy, Trash2, ArrowDownAZ, ArrowUpAZ, Hash, Type } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

const SortLines = () => {
    const [text, setText] = useState('');

    const sortLines = (type) => {
        if (!text.trim()) return;

        let lines = text.split('\n');

        switch (type) {
            case 'az':
                lines.sort((a, b) => a.localeCompare(b));
                break;
            case 'za':
                lines.sort((a, b) => b.localeCompare(a));
                break;
            case 'length-asc':
                lines.sort((a, b) => a.length - b.length);
                break;
            case 'length-desc':
                lines.sort((a, b) => b.length - a.length);
                break;
            case 'numeric':
                lines.sort((a, b) => {
                    const numA = parseFloat(a.match(/-?\d+\.?\d*/)?.[0] || '0');
                    const numB = parseFloat(b.match(/-?\d+\.?\d*/)?.[0] || '0');
                    return numA - numB;
                });
                break;
        }

        setText(lines.join('\n'));
        saveUsage(type);
        toast.success('Lines sorted!');
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        toast.success('Copied to clipboard');
    };

    const saveUsage = async (type) => {
        const token = localStorage.getItem('token');
        if (!token) return;
        try {
            await axios.post('https://word-lab-ucvj.vercel.app/api/tools/usage', {
                toolName: 'Sort Lines',
                inputTextLength: text.length,
                resultSummary: `Sorted ${type}`
            }, { headers: { Authorization: `Bearer ${token}` } });
        } catch (e) { }
    };

    return (
        <ToolLayout
            title="Sort Text Lines"
            description="Sort lists alphabetically, by length, or numerically."
        >
            <div className="flex flex-wrap gap-2 mb-4 justify-center">
                <button onClick={() => sortLines('az')} className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-2 rounded-lg font-medium text-sm border border-slate-300 transition-colors">
                    <ArrowDownAZ size={16} /> A-Z
                </button>
                <button onClick={() => sortLines('za')} className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-2 rounded-lg font-medium text-sm border border-slate-300 transition-colors">
                    <ArrowUpAZ size={16} /> Z-A
                </button>
                <button onClick={() => sortLines('length-asc')} className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-2 rounded-lg font-medium text-sm border border-slate-300 transition-colors">
                    <Type size={16} /> Shortest First
                </button>
                <button onClick={() => sortLines('length-desc')} className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-2 rounded-lg font-medium text-sm border border-slate-300 transition-colors">
                    <Type size={16} /> Longest First
                </button>
                <button onClick={() => sortLines('numeric')} className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-2 rounded-lg font-medium text-sm border border-slate-300 transition-colors">
                    <Hash size={16} /> Numerically
                </button>
            </div>

            <div className="relative">
                <textarea
                    className="w-full h-[400px] p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none resize-none text-slate-800 bg-white"
                    placeholder="Paste your list here, one item per line..."
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

export default SortLines;
