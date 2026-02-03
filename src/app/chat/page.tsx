"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./page.module.css";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
}

export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            role: "assistant",
            content: "안녕하세요! 상대방과의 관계에 대해 궁금한 점이 있으신가요? 무엇이든 물어보세요.",
        },
    ]);
    const [input, setInput] = useState("");
    const [useCount, setUseCount] = useState(0);
    const [isPremium, setIsPremium] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const savedCount = localStorage.getItem("typebridge_free_chat_count");
        if (savedCount) {
            setUseCount(parseInt(savedCount));
        }
        const premium = localStorage.getItem("typebridge_premium") === "true";
        setIsPremium(premium);
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = async () => {
        if (!input.trim() || useCount >= 5 || isTyping) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input,
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");

        const newCount = useCount + 1;
        setUseCount(newCount);
        localStorage.setItem("typebridge_free_chat_count", newCount.toString());

        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            const aiResponse: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: `상대방의 입장에서 생각해보면 ${input.substring(0, 10)}... 에 대해 더 깊이 대화해보는 것이 좋을 것 같아요. 구체적인 상황을 알려주시면 더 자세히 조언해드릴게요!`,
            };
            setMessages((prev) => [...prev, aiResponse]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <main className={styles.container}>
            <header className={styles.header}>
                <Link href="/" className={styles.back}>←</Link>
                <h1 className="gradient-text">AI 상담소</h1>
                <div className={styles.badge}>무료 상담 {useCount}/5</div>
            </header>

            <div className={`${styles.chatBox} glass-card`} ref={scrollRef}>
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`${styles.messageWrapper} ${msg.role === "user" ? styles.userWrapper : styles.aiWrapper
                            }`}
                    >
                        <div className={styles.message}>{msg.content}</div>
                    </div>
                ))}
                {isTyping && (
                    <div className={`${styles.messageWrapper} styles.aiWrapper`}>
                        <div className={`${styles.message} ${styles.typing}`}>
                            상담사가 생각 중입니다...
                        </div>
                    </div>
                )}
            </div>

            <div className={styles.inputArea}>
                {useCount < 5 || isPremium ? (
                    <>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                            placeholder="상대방의 행동에 대해 물어보세요..."
                            className={`${styles.input} glass-card`}
                        />
                        <button
                            onClick={handleSend}
                            className="btn-primary"
                            disabled={isTyping}
                        >
                            보내기
                        </button>
                    </>
                ) : (
                    <div className={`${styles.limitReached} glass-card`}>
                        <p>오늘의 무료 상담 횟수를 모두 사용하셨습니다.</p>
                        <Link href="/premium" className="btn-primary">
                            무제한 프리미엄 이용하기
                        </Link>
                    </div>
                )}
            </div>
        </main>
    );
}
