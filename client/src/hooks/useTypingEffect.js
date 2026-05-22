import { useState, useEffect, useRef } from 'react';

/**
 * useTypingEffect — cycles through `words` with a typewriter animation.
 * @param {string[]} words       - Array of strings to cycle through
 * @param {number}   typeSpeed   - ms per character while typing   (default 80)
 * @param {number}   deleteSpeed - ms per character while deleting (default 45)
 * @param {number}   pauseAfter  - ms to wait after full word is typed (default 1800)
 * @param {boolean}  once        - If true, types the first word once and stops (default false)
 * @returns {{ displayText: string, isTyping: boolean, isDone: boolean }}
 */
const useTypingEffect = (
    words,
    typeSpeed = 80,
    deleteSpeed = 45,
    pauseAfter = 1800,
    once = false
) => {
    const [displayText, setDisplayText] = useState('');
    const [isTyping, setIsTyping] = useState(true);
    const [isDone, setIsDone] = useState(false);
    const wordIndex = useRef(0);
    const charIndex = useRef(0);
    const isDeleting = useRef(false);

    useEffect(() => {
        if (!words || words.length === 0) return;

        let timeout;

        const tick = () => {
            const current = words[wordIndex.current];

            if (!isDeleting.current) {
                // Typing forward
                charIndex.current += 1;
                setDisplayText(current.slice(0, charIndex.current));
                setIsTyping(true);

                if (charIndex.current === current.length) {
                    if (once) {
                        // One-shot mode: stop here, keep cursor blinking then hide
                        setIsTyping(false);
                        setIsDone(true);
                        return;
                    }
                    // Loop mode: pause then delete
                    setIsTyping(false);
                    timeout = setTimeout(() => {
                        isDeleting.current = true;
                        tick();
                    }, pauseAfter);
                    return;
                }
            } else {
                // Deleting
                charIndex.current -= 1;
                setDisplayText(current.slice(0, charIndex.current));
                setIsTyping(true);

                if (charIndex.current === 0) {
                    // Done deleting — move to next word
                    isDeleting.current = false;
                    wordIndex.current = (wordIndex.current + 1) % words.length;
                }
            }

            timeout = setTimeout(tick, isDeleting.current ? deleteSpeed : typeSpeed);
        };

        timeout = setTimeout(tick, typeSpeed);
        return () => clearTimeout(timeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [words]);

    return { displayText, isTyping, isDone };
};

export default useTypingEffect;
