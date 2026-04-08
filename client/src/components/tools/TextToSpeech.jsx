import { useState, useRef, useEffect } from 'react';
import ToolLayout from '../layout/ToolLayout';
import { Play, Square, Pause, Copy, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

const TextToSpeech = () => {
    const [text, setText] = useState('');
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [voices, setVoices] = useState([]);
    const [selectedVoice, setSelectedVoice] = useState(null);

    const synth = window.speechSynthesis;

    useEffect(() => {
        const fetchVoices = () => {
            const v = synth.getVoices();
            setVoices(v);
            if (v.length > 0 && !selectedVoice) setSelectedVoice(v[0].name);
        };

        fetchVoices();
        if (speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = fetchVoices;
        }
    }, [selectedVoice, synth]);

    const speak = () => {
        if (synth.speaking && isPaused) {
            synth.resume();
            setIsPaused(false);
            return;
        }

        if (text === '') return toast.error('Please enter some text to read');

        const utterance = new SpeechSynthesisUtterance(text);
        const voiceObj = voices.find(v => v.name === selectedVoice);
        if (voiceObj) utterance.voice = voiceObj;

        utterance.onend = () => {
            setIsSpeaking(false);
            setIsPaused(false);
            saveUsage();
        };

        synth.speak(utterance);
        setIsSpeaking(true);
        setIsPaused(false);
    };

    const pause = () => {
        if (synth.speaking && !isPaused) {
            synth.pause();
            setIsPaused(true);
        }
    };

    const stop = () => {
        synth.cancel();
        setIsSpeaking(false);
        setIsPaused(false);
    };

    const saveUsage = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;
        try {
            await axios.post('https://word-lab-ucvj.vercel.app/api/tools/usage', {
                toolName: 'Text to Speech',
                inputTextLength: text.length,
                resultSummary: `Listened via TTS`
            }, { headers: { Authorization: `Bearer ${token}` } });
        } catch (e) { }
    };

    // cleanup
    useEffect(() => {
        return () => synth.cancel();
    }, [synth]);

    return (
        <ToolLayout
            title="Text to Speech"
            description="Listen to your text being spoken aloud directly in your browser."
        >
            <div className="flex flex-col sm:flex-row gap-4 mb-4 items-center justify-between">
                <select
                    value={selectedVoice || ''}
                    onChange={(e) => setSelectedVoice(e.target.value)}
                    className="w-full sm:w-64 p-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-brand-500 outline-none"
                >
                    {voices.map((v, i) => (
                        <option key={i} value={v.name}>{v.name} ({v.lang})</option>
                    ))}
                </select>

                <div className="flex gap-2 w-full sm:w-auto">
                    {!isSpeaking || isPaused ? (
                        <button
                            onClick={speak}
                            className="flex-1 sm:flex-none flex justify-center items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-5 py-2.5 rounded-lg transition-colors font-medium border border-transparent shadow-sm"
                        >
                            <Play size={18} fill="currentColor" /> Play
                        </button>
                    ) : (
                        <button
                            onClick={pause}
                            className="flex-1 sm:flex-none flex justify-center items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-5 py-2.5 rounded-lg transition-colors font-medium border border-transparent shadow-sm"
                        >
                            <Pause size={18} fill="currentColor" /> Pause
                        </button>
                    )}

                    <button
                        onClick={stop}
                        disabled={!isSpeaking && !isPaused}
                        className="flex-1 sm:flex-none flex justify-center items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 disabled:text-gray-400 disabled:hover:bg-gray-100 px-5 py-2.5 rounded-lg transition-colors font-medium border border-gray-200 shadow-sm"
                    >
                        <Square size={18} fill="currentColor" /> Stop
                    </button>
                </div>
            </div>

            <div className="relative">
                <textarea
                    className="w-full h-64 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none resize-y text-slate-800 bg-gray-50 leading-relaxed"
                    placeholder="Type or paste the story you want to hear..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                ></textarea>

                <div className="absolute bottom-4 right-4 flex gap-2">
                    <button onClick={() => { setText(''); stop(); toast.success('Text cleared'); }} className="p-2 bg-white text-gray-600 rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 hover:text-red-500 transition-colors" title="Clear Text">
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>
        </ToolLayout>
    );
};

export default TextToSpeech;
