import { useState, useMemo } from 'react';
import ToolLayout from '../layout/ToolLayout';
import { Copy, Trash2, Link as LinkIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

const ExtractURLs = () => {
    const [text, setText] = useState('');

    const urls = useMemo(() => {
        if (!text) return [];
        // Basic URL regex
        const regex = /(https?:\/\/[^\s]+)/g;
        const matches = text.match(regex);
        if (!matches) return [];
        // Return unique URLs
        return [...new Set(matches)];
    }, [text]);

    const handleCopy = () => {
        if (urls.length === 0) return;
        navigator.clipboard.writeText(urls.join('\n'));
        toast.success('Copied URLs to clipboard');
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
                toolName: 'Extract URLs',
                inputTextLength: text.length,
                resultSummary: `Extracted ${urls.length} links`
            }, { headers: { Authorization: `Bearer ${token}` } });
        } catch (e) { }
    };

    return (
        <ToolLayout
            title="Extract URLs"
            description="Find and extract all web links hidden within a large block of text."
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="relative">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Paste Text Here</label>
                    <textarea
                        className="w-full h-[400px] p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none resize-none text-slate-800 bg-white"
                        placeholder="Document containing URLs (http:// or https://)..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onBlur={saveUsage}
                    ></textarea>
                    <div className="absolute bottom-4 right-4 flex gap-2">
                        <button onClick={handleClear} className="p-2 bg-gray-100 text-gray-600 rounded-lg shadow-sm border border-gray-200 hover:bg-gray-200 hover:text-red-500 transition-colors" title="Clear Text">
                            <Trash2 size={18} />
                        </button>
                    </div>
                </div>

                <div className="flex flex-col">
                    <label className="flex items-center justify-between text-sm font-semibold text-slate-700 mb-2">
                        <span>Extracted Links ({urls.length})</span>
                        <button
                            onClick={handleCopy}
                            disabled={urls.length === 0}
                            className="flex items-center gap-1 text-brand-600 hover:text-brand-700 disabled:text-gray-400"
                        >
                            <Copy size={16} /> Copy All
                        </button>
                    </label>
                    <div className="flex-grow bg-slate-50 border border-gray-200 rounded-xl p-4 overflow-y-auto">
                        {urls.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-gray-400 border-dashed border-2 border-slate-200 rounded-lg">
                                <LinkIcon size={32} className="mb-2 opacity-50 text-slate-400" />
                                <p>No links found yet</p>
                            </div>
                        ) : (
                            <ul className="space-y-2">
                                {urls.map((url, i) => (
                                    <li key={i} className="flex gap-2 bg-white p-3 rounded-lg border border-gray-100 hover:border-brand-200 transition-colors">
                                        <LinkIcon size={16} className="text-brand-500 shrink-0 mt-0.5" />
                                        <a href={url} target="_blank" rel="noopener noreferrer" className="text-slate-700 hover:text-brand-600 break-all text-sm underline-offset-2 hover:underline">
                                            {url}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
};

export default ExtractURLs;
