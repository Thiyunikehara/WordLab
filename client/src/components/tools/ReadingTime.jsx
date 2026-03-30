import { useState } from 'react';
import ToolLayout from '../layout/ToolLayout';
import { Clock, Trash2, Copy } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

const ReadingTime = () => {
    const [text, setText] = useState('');
    const [wpm, setWpm] = useState(200);

    const words = text.trim() ? text.trim().split(/\s+/).filter(word => /\p{L}|\p{N}/u.test(word)).length : 0;
    const minutes = Math.floor(words / wpm);
    const seconds = Math.floor((words % wpm) / (wpm / 60));

    const handleClear = () => {
        setText('');
        toast.success('Text cleared');
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
            await axios.post('http://localhost:5000/api/tools/usage', {
                toolName: 'Reading Time',
                inputTextLength: text.length,
                resultSummary: `Reading time: ${minutes}m ${seconds}s`
            }, { headers: { Authorization: `Bearer ${token}` } });
        } catch (e) { }
    };

    return (
        <ToolLayout
            title="Reading Time Estimator"
            description="Find out exactly how long it takes to read your text, script, or speech."
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-8 bg-brand-50 rounded-2xl p-6 border border-brand-100">
                <div className="flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-brand-200 pb-6 md:pb-0">
                    <Clock className="text-brand-500 mb-3" size={48} />
                    <div className="text-4xl font-extrabold text-brand-700 font-mono tracking-tight">
                        {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
                    </div>
                    <p className="text-brand-600 font-medium mt-1">Minutes : Seconds</p>
                </div>

                <div className="space-y-4 px-4">
                    <div>
                        <label className="block text-sm font-semibold text-brand-800 mb-2 flex justify-between">
                            <span>Reading Speed (WPM)</span>
                            <span className="bg-brand-200 text-brand-800 px-2 py-0.5 rounded text-xs">{wpm} words/min</span>
                        </label>
                        <input
                            type="range"
                            min="100"
                            max="400"
                            step="10"
                            value={wpm}
                            onChange={(e) => setWpm(parseInt(e.target.value))}
                            className="w-full h-2 bg-brand-200 rounded-lg appearance-none cursor-pointer accent-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-400"
                        />
                        <div className="flex justify-between text-xs text-brand-600 mt-1">
                            <span>Slow (100)</span>
                            <span>Average (200)</span>
                            <span>Fast (400)</span>
                        </div>
                    </div>
                    <div className="text-sm text-brand-700 bg-white p-3 rounded-lg border border-brand-200 shadow-sm text-center">
                        Your text has <strong>{words}</strong> words. Let's start the clock!
                    </div>
                </div>
            </div>

            <div className="relative">
                <textarea
                    className="w-full h-64 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none resize-y text-slate-800 bg-gray-50 leading-relaxed"
                    placeholder="Paste the text you want to estimate reading time for..."
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

export default ReadingTime;
