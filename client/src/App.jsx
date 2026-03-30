import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import { Toaster } from 'react-hot-toast';

// Tools
import WordCounter from './components/tools/WordCounter';
import CharacterCounter from './components/tools/CharacterCounter';
import SentenceCounter from './components/tools/SentenceCounter';
import ParagraphCounter from './components/tools/ParagraphCounter';
import CaseConverter from './components/tools/CaseConverter';
import RemoveSpaces from './components/tools/RemoveSpaces';
import KeywordDensity from './components/tools/KeywordDensity';
import DuplicateWord from './components/tools/DuplicateWord';
import TextSummarizer from './components/tools/TextSummarizer';
import ReverseText from './components/tools/ReverseText';
import TextToSpeech from './components/tools/TextToSpeech';
import ReadingTime from './components/tools/ReadingTime';
import Base64Encode from './components/tools/Base64Encode';
import URLEncode from './components/tools/URLEncode';
import FindReplace from './components/tools/FindReplace';
import SortLines from './components/tools/SortLines';
import LoremIpsum from './components/tools/LoremIpsum';
import RemoveLineBreaks from './components/tools/RemoveLineBreaks';
import ExtractEmails from './components/tools/ExtractEmails';
import ExtractURLs from './components/tools/ExtractURLs';


function App() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="container mx-auto px-4 py-8"
          >
            <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />

          {/* Tool Routes */}
          <Route path="/tool/word-counter" element={<WordCounter />} />
          <Route path="/tool/character-counter" element={<CharacterCounter />} />
          <Route path="/tool/sentence-counter" element={<SentenceCounter />} />
          <Route path="/tool/paragraph-counter" element={<ParagraphCounter />} />
          <Route path="/tool/case-converter" element={<CaseConverter />} />
          <Route path="/tool/remove-spaces" element={<RemoveSpaces />} />
          <Route path="/tool/keyword-density" element={<KeywordDensity />} />
          <Route path="/tool/duplicate-word" element={<DuplicateWord />} />
          <Route path="/tool/text-summarizer" element={<TextSummarizer />} />
          <Route path="/tool/reverse-text" element={<ReverseText />} />
          <Route path="/tool/text-to-speech" element={<TextToSpeech />} />
          <Route path="/tool/reading-time" element={<ReadingTime />} />
          <Route path="/tool/base64-encode" element={<Base64Encode />} />
          <Route path="/tool/url-encode" element={<URLEncode />} />
          <Route path="/tool/find-replace" element={<FindReplace />} />
          <Route path="/tool/sort-lines" element={<SortLines />} />
          <Route path="/tool/lorem-ipsum" element={<LoremIpsum />} />
          <Route path="/tool/remove-line-breaks" element={<RemoveLineBreaks />} />
          <Route path="/tool/extract-emails" element={<ExtractEmails />} />
          <Route path="/tool/extract-urls" element={<ExtractURLs />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;
