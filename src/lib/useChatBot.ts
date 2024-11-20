import { useState } from 'react';
import { useAI } from './useAI';
import {Message} from './types'


const useChatBot = (): [Message[], (question: string) => void] => {
    const [enabled, ai] = useAI()
    const [messages, setMessages] = useState<Message[]>([]);

    const ask = (question: string, article: string | null = null) => {
        if (!enabled) return
        console.log('🤖 Asking AI:', question, article)

        setMessages((prevMessages) => [...prevMessages, { msg: question, role: 'user' }]);

        if (!article && question === '/summary') {
            return
        }

        const prompt = article && question === '/summary' ? `<TEXTOFARTICLE>${article.trim()}</TEXTOFARTICLE>\nBrief summary of the above content` : question
        // @ts-expect-error ai not available yet
        ai.prompt(prompt).then((response: string) => {
            setMessages((prevMessages) => [...prevMessages, { msg: response, role: 'robot' }]);
        })
    }

    return [messages, ask];
};

export default useChatBot;