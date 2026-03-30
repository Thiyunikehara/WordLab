import { useState } from 'react';
import ToolLayout from '../layout/ToolLayout';
import { Copy, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

const CharacterCounter = () => {
    const [text, setText] = useState('');

    const stats = {
        total: text.length,
        noSpaces: text.replace(/\s/g, '').length,
        letters: (text.match(/[a-zA-Z]/g) || []).length,
        numbers: (text.match(/[0-9]/g) || []).length,
        special: (text.match(/[^a-zA-Z0-9\s]/g) || []).length,
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        toast.success('Copied to clipboard');
    };

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
                toolName: 'Character Counter',
                inputTextLength: text.length,
                resultSummary: `${stats.total} total chars`
            }, { headers: { Authorization: `Bearer ${token}` } });
        } catch (e) { }
    };

    return (
        <ToolLayout
            title="Character Counter"
            description="Get a detailed breakdown of characters, letters, numbers, and symbols in your text."
        >
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-center">
                    <div className="text-2xl font-bold text-slate-700">{stats.total}</div>
                    <div className="text-xs text-slate-500 uppercase tracking-wide">Total</div>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-center">
                    <div className="text-2xl font-bold text-slate-700">{stats.noSpaces}</div>
                    <div className="text-xs text-slate-500 uppercase tracking-wide">w/o Spaces</div>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-center">
                    <div className="text-2xl font-bold text-slate-700">{stats.letters}</div>
                    <div className="text-xs text-slate-500 uppercase tracking-wide">Letters</div>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-center">
                    <div className="text-2xl font-bold text-slate-700">{stats.numbers}</div>
                    <div className="text-xs text-slate-500 uppercase tracking-wide">Numbers</div>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-center md:col-span-1 col-span-2">
                    <div className="text-2xl font-bold text-slate-700">{stats.special}</div>
                    <div className="text-xs text-slate-500 uppercase tracking-wide">Symbols</div>
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

export default CharacterCounter;
