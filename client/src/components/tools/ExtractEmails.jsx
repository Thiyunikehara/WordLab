import { useState, useMemo } from 'react';
import ToolLayout from '../layout/ToolLayout';
import { Copy, Trash2, Mail } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

const ExtractEmails = () => {
    const [text, setText] = useState('');

    const emails = useMemo(() => {
        if (!text) return [];
        // Basic email regex
        const regex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
        const matches = text.match(regex);
        if (!matches) return [];
        // Return unique emails
        return [...new Set(matches)];
    }, [text]);

    const handleCopy = () => {
        if (emails.length === 0) return;
        navigator.clipboard.writeText(emails.join('\n'));
        toast.success('Copied emails to clipboard');
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
            await axios.post('http://localhost:5000/api/tools/usage', {
                toolName: 'Extract Emails',
                inputTextLength: text.length,
                resultSummary: `Extracted ${emails.length} emails`
            }, { headers: { Authorization: `Bearer ${token}` } });
        } catch (e) { }
    };

    return (
        <ToolLayout
            title="Extract Emails"
            description="Find and extract all email addresses hidden within a large block of text."
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="relative">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Paste Text Here</label>
                    <textarea
                        className="w-full h-[400px] p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none resize-none text-slate-800 bg-white"
                        placeholder="Document containing emails..."
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
                        <span>Extracted Emails ({emails.length})</span>
                        <button
                            onClick={handleCopy}
                            disabled={emails.length === 0}
                            className="flex items-center gap-1 text-brand-600 hover:text-brand-700 disabled:text-gray-400"
                        >
                            <Copy size={16} /> Copy All
                        </button>
                    </label>
                    <div className="flex-grow bg-slate-50 border border-gray-200 rounded-xl p-4 overflow-y-auto">
                        {emails.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-gray-400">
                                <Mail size={32} className="mb-2 opacity-50" />
                                <p>No emails found yet</p>
                            </div>
                        ) : (
                            <ul className="space-y-2">
                                {emails.map((email, i) => (
                                    <li key={i} className="flex items-center gap-2 bg-white p-2 rounded border border-gray-100 text-slate-800 break-all select-all">
                                        <Mail size={14} className="text-brand-500 shrink-0" /> {email}
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

export default ExtractEmails;
