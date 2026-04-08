import { useState } from 'react';
import ToolLayout from '../layout/ToolLayout';
import { Copy, Trash2, Replace } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

const FindReplace = () => {
    const [text, setText] = useState('');
    const [findStr, setFindStr] = useState('');
    const [replaceStr, setReplaceStr] = useState('');
    const [matchCase, setMatchCase] = useState(false);

    const handleReplace = () => {
        if (!text || !findStr) return;

        // Create regex based on case sensitivity option
        const flags = matchCase ? 'g' : 'gi';
        // Escape regex special characters from input
        const escapedFind = findStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(escapedFind, flags);

        // Count occurrences for feedback
        const matches = (text.match(regex) || []).length;

        if (matches > 0) {
            setText(text.replace(regex, replaceStr));
            toast.success(`Replaced ${matches} occurrences`);
            saveUsage(matches);
        } else {
            toast.error('Search text not found');
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        toast.success('Copied to clipboard');
    };

    const saveUsage = async (matches) => {
        if (text.length === 0) return;
        const token = localStorage.getItem('token');
        if (!token) return;
        try {
            await axios.post('https://word-lab-ucvj.vercel.app/api/tools/usage', {
                toolName: 'Find and Replace',
                inputTextLength: text.length,
                resultSummary: `Replaced ${matches} items`
            }, { headers: { Authorization: `Bearer ${token}` } });
        } catch (e) { }
    };

    return (
        <ToolLayout
            title="Find and Replace"
            description="Search for specific words or phrases and replace them instantly."
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Find Text</label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none bg-gray-50"
                        placeholder="Text to find..."
                        value={findStr}
                        onChange={(e) => setFindStr(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Replace With</label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-slate-500 outline-none bg-gray-50"
                        placeholder="Replacement text..."
                        value={replaceStr}
                        onChange={(e) => setReplaceStr(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex items-center justify-between mb-6 bg-slate-50 p-3 border border-slate-200 rounded-lg">
                <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer select-none">
                    <input
                        type="checkbox"
                        checked={matchCase}
                        onChange={(e) => setMatchCase(e.target.checked)}
                        className="w-4 h-4 text-brand-600 border-gray-300 rounded focus:ring-brand-500"
                    />
                    Match Case Sensitivity
                </label>

                <button
                    onClick={handleReplace}
                    className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded p-2 transition-colors focus:ring-2 focus:ring-brand-500 text-sm shadow-sm"
                >
                    <Replace size={16} /> Replace All
                </button>
            </div>

            <div className="relative">
                <textarea
                    className="w-full h-[400px] p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none resize-none text-slate-800 bg-white leading-relaxed"
                    placeholder="Type or paste your document here..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                ></textarea>

                <div className="absolute bottom-4 right-4 flex gap-2">
                    <button onClick={handleCopy} className="p-2 bg-white text-gray-600 rounded-md shadow-sm border border-gray-200 hover:bg-gray-50 hover:text-brand-600 transition-colors" title="Copy Text">
                        <Copy size={16} />
                    </button>
                    <button onClick={() => { setText(''); toast.success('Text cleared'); }} className="p-2 bg-white text-gray-600 rounded-md shadow-sm border border-gray-200 hover:bg-gray-50 hover:text-red-500 transition-colors" title="Clear Text">
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>
        </ToolLayout>
    );
};

export default FindReplace;
