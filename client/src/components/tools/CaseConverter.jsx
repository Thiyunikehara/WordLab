import { useState } from 'react';
import ToolLayout from '../layout/ToolLayout';
import { Copy, Trash2, Download } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

const CaseConverter = () => {
    const [text, setText] = useState('');

    const toUpper = () => setText(text.toUpperCase());
    const toLower = () => setText(text.toLowerCase());
    const toTitle = () => {
        setText(text.toLowerCase().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '));
    };
    const toSentence = () => {
        setText(text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase()));
    };
    const toAlternating = () => {
        setText(text.toLowerCase().split('').map((c, i) => i % 2 === 0 ? c : c.toUpperCase()).join(''));
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
                toolName: 'Case Converter',
                inputTextLength: text.length,
                resultSummary: `Converted text case`
            }, { headers: { Authorization: `Bearer ${token}` } });
        } catch (e) { }
    };

    return (
        <ToolLayout
            title="Text Case Converter"
            description="Easily convert your text to UPPERCASE, lowercase, Title Case, and more."
        >
            <div className="flex flex-wrap gap-2 mb-4">
                <button onClick={() => { toUpper(); saveUsage(); }} className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-2 rounded-lg font-medium text-sm transition-colors border border-slate-300">UPPERCASE</button>
                <button onClick={() => { toLower(); saveUsage(); }} className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-2 rounded-lg font-medium text-sm transition-colors border border-slate-300">lowercase</button>
                <button onClick={() => { toTitle(); saveUsage(); }} className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-2 rounded-lg font-medium text-sm transition-colors border border-slate-300">Title Case</button>
                <button onClick={() => { toSentence(); saveUsage(); }} className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-2 rounded-lg font-medium text-sm transition-colors border border-slate-300">Sentence case.</button>
                <button onClick={() => { toAlternating(); saveUsage(); }} className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-2 rounded-lg font-medium text-sm transition-colors border border-slate-300">aLtErNaTiNg cAsE</button>
            </div>

            <div className="relative">
                <textarea
                    className="w-full h-64 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none resize-y text-slate-800 bg-gray-50"
                    placeholder="Type or paste your text here..."
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

export default CaseConverter;
