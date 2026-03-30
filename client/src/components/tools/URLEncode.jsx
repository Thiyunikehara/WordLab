import { useState } from 'react';
import ToolLayout from '../layout/ToolLayout';
import { Copy, Trash2, Link } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

const URLEncode = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const encode = () => {
        setOutput(encodeURIComponent(input));
        saveUsage('Encoding');
        toast.success('URL Encoded');
    };

    const decode = () => {
        try {
            setOutput(decodeURIComponent(input));
            saveUsage('Decoding');
            toast.success('URL Decoded');
        } catch (e) {
            toast.error('Invalid URL encoded string');
        }
    };

    const saveUsage = async (action) => {
        if (input.length === 0) return;
        const token = localStorage.getItem('token');
        if (!token) return;
        try {
            await axios.post('http://localhost:5000/api/tools/usage', {
                toolName: 'URL Encode/Decode',
                inputTextLength: input.length,
                resultSummary: `${action} completed`
            }, { headers: { Authorization: `Bearer ${token}` } });
        } catch (e) { }
    };

    return (
        <ToolLayout
            title="URL Encode/Decode"
            description="Safely encode parameters for URLs or decode them to readable text."
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Input</label>
                    <textarea
                        className="w-full h-48 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none resize-none text-slate-800 bg-gray-50 font-mono text-sm leading-relaxed"
                        placeholder="Paste URL or string here..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    ></textarea>
                    <button
                        onClick={() => setInput('')}
                        className="absolute bottom-4 right-4 p-2 bg-white text-gray-400 rounded-md shadow-sm border border-gray-200 hover:text-red-500"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>

                <div className="relative">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Output</label>
                    <textarea
                        className="w-full h-48 p-4 border border-brand-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none resize-none text-brand-900 bg-brand-50 font-mono text-sm leading-relaxed shadow-inner break-all"
                        placeholder="Result will appear here..."
                        readOnly
                        value={output}
                    ></textarea>
                    <button
                        onClick={() => { navigator.clipboard.writeText(output); toast.success('Copied!'); }}
                        className="absolute bottom-4 right-4 p-2 bg-brand-600 hover:bg-brand-700 text-white rounded-md shadow-sm transition-colors"
                    >
                        <Copy size={16} />
                    </button>
                </div>
            </div>

            <div className="flex gap-4 justify-center mt-6">
                <button
                    onClick={encode}
                    className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-lg px-6 py-2.5 transition-colors focus:ring-4 focus:ring-brand-300"
                >
                    <Link size={18} /> URL Encode
                </button>
                <button
                    onClick={decode}
                    className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 font-medium rounded-lg px-6 py-2.5 transition-colors focus:ring-4 focus:ring-slate-200"
                >
                    URL Decode
                </button>
            </div>
        </ToolLayout>
    );
};

export default URLEncode;
