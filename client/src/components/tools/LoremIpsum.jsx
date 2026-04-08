import { useState } from 'react';
import ToolLayout from '../layout/ToolLayout';
import { Copy, LayoutTemplate } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

const LOREM_WORDS = [
    "lorem", "ipsum", "dolor", "sit", "amet", "consectetur",
    "adipiscing", "elit", "sed", "do", "eiusmod", "tempor",
    "incididunt", "ut", "labore", "et", "dolore", "magna",
    "aliqua", "enim", "ad", "minim", "veniam", "quis",
    "nostrud", "exercitation", "ullamco", "laboris", "nisi",
    "aliquip", "ex", "ea", "commodo", "consequat"
];

const LoremIpsum = () => {
    const [text, setText] = useState('');
    const [count, setCount] = useState(3);
    const [type, setType] = useState('paragraphs');

    const generate = () => {
        let result = '';

        const generateSentence = () => {
            const len = Math.floor(Math.random() * 10) + 5;
            let sentence = [];
            for (let i = 0; i < len; i++) {
                sentence.push(LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)]);
            }
            sentence[0] = sentence[0].charAt(0).toUpperCase() + sentence[0].slice(1);
            return sentence.join(' ') + '.';
        };

        const generateParagraph = () => {
            const len = Math.floor(Math.random() * 4) + 3;
            let para = [];
            for (let i = 0; i < len; i++) para.push(generateSentence());
            return para.join(' ');
        };

        if (type === 'words') {
            let words = [];
            for (let i = 0; i < count; i++) words.push(LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)]);
            words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
            result = words.join(' ') + '.';
        } else if (type === 'sentences') {
            let sentences = [];
            for (let i = 0; i < count; i++) sentences.push(generateSentence());
            result = sentences.join(' ');
        } else {
            let paras = [];
            for (let i = 0; i < count; i++) paras.push(generateParagraph());
            result = paras.join('\n\n');
        }

        setText(result);
        saveUsage();
        toast.success('Generated!');
    };

    const saveUsage = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;
        try {
            await axios.post('https://word-lab-ucvj.vercel.app/api/tools/usage', {
                toolName: 'Lorem Ipsum Generator',
                inputTextLength: text.length || 0,
                resultSummary: `Generated ${count} ${type}`
            }, { headers: { Authorization: `Bearer ${token}` } });
        } catch (e) { }
    };

    const handleCopy = () => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        toast.success('Copied to clipboard');
    };

    return (
        <ToolLayout
            title="Lorem Ipsum Generator"
            description="Generate placeholder dummy text for your mockups, websites, and designs."
        >
            <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center justify-center bg-brand-50 p-4 rounded-xl border border-brand-100">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <label className="text-sm font-semibold text-brand-800">Generate</label>
                    <input
                        type="number"
                        min="1"
                        max="100"
                        value={count}
                        onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                        className="w-20 px-3 py-2 rounded-lg border border-brand-200 outline-none focus:ring-2 focus:ring-brand-500 text-center"
                    />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="w-full sm:w-auto px-4 py-2 rounded-lg border border-brand-200 outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                    >
                        <option value="words">Words</option>
                        <option value="sentences">Sentences</option>
                        <option value="paragraphs">Paragraphs</option>
                    </select>
                </div>

                <button
                    onClick={generate}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-lg px-6 py-2 transition-colors focus:ring-4 focus:ring-brand-300 shadow-sm"
                >
                    <LayoutTemplate size={18} /> Generate Text
                </button>
            </div>

            <div className="relative">
                <textarea
                    className="w-full h-[400px] p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none resize-none text-slate-800 bg-white leading-relaxed"
                    placeholder="Your placeholder text will appear here..."
                    value={text}
                    readOnly
                ></textarea>

                {text && (
                    <div className="absolute bottom-4 right-4 flex gap-2">
                        <button onClick={handleCopy} className="p-2 bg-brand-600 text-white rounded-md shadow-sm hover:bg-brand-700 transition-colors" title="Copy Text">
                            <Copy size={16} />
                        </button>
                    </div>
                )}
            </div>
        </ToolLayout>
    );
};

export default LoremIpsum;
