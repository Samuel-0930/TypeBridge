"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

export default function PremiumPage() {
    const [chatLog, setChatLog] = useState("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState<null | { score: number; feedback: string }>(null);

    const handleAnalyze = () => {
        if (!chatLog.trim()) return;
        setIsAnalyzing(true);

        // Simulate AI analysis delay
        setTimeout(() => {
            setIsAnalyzing(false);
            setResult({
                score: 75,
                feedback: "상대방의 말투에서 조심스러운 호감이 느껴집니다. 특히 질문을 먼저 던지는 빈도가 높으며, 당신의 일상에 대해 궁금해하는 모습이 자주 보입니다. 다만, 아직은 관계의 속도를 조절하려는 경향이 있으니 조금 더 천천히 다가가는 것을 추천합니다.",
            });
        }, 3000);
    };

    return (
        <main className={styles.container}>
            <header className={styles.header}>
                <h1 className="gradient-text">프리미엄 AI 분석</h1>
                <p className={styles.subtitle}>대화 내역을 분석하여 상대방의 속마음을 읽어 드립니다.</p>
            </header>

            {!result ? (
                <section className={`${styles.analysisArea} glass-card`}>
                    <textarea
                        className={styles.textarea}
                        placeholder="카카오톡이나 문자의 대화 내역을 복사해서 붙여넣어 주세요..."
                        value={chatLog}
                        onChange={(e) => setChatLog(e.target.value)}
                    />
                    <button
                        className="btn-primary"
                        disabled={!chatLog || isAnalyzing}
                        onClick={handleAnalyze}
                    >
                        {isAnalyzing ? "AI 분석 중..." : "호감도 분석하기 (결제 후 이용 가능)"}
                    </button>
                    <p className={styles.disclaimer}>※ 입력하신 대화 내용은 분석 후 즉시 파기되며 저장되지 않습니다.</p>
                </section>
            ) : (
                <section className={`${styles.resultArea} glass-card`}>
                    <div className={styles.scoreCircle}>
                        <span className={styles.score}>{result.score}%</span>
                        <span className={styles.scoreLabel}>호감도 점수</span>
                    </div>
                    <div className={styles.feedback}>
                        <h3>AI 종합 분석 결과</h3>
                        <p>{result.feedback}</p>
                    </div>
                    <Link href="/premium/plan" className="btn-primary">
                        맞춤형 액션 플랜 확인하기 →
                    </Link>
                    <button className={styles.reset} onClick={() => setResult(null)}>다시 분석하기</button>
                </section>
            )}

            <section className={styles.features}>
                <h2>프리미엄 혜택</h2>
                <div className={styles.featureGrid}>
                    <div className="glass-card">
                        <h4>무제한 채팅</h4>
                        <p>상담 횟수 제한 없이 자유롭게 대화하세요.</p>
                    </div>
                    <div className="glass-card">
                        <h4>상세 분석 리포트</h4>
                        <p>호감도 점수뿐만 아니라 심층적인 심리 분석을 제공합니다.</p>
                    </div>
                    <div className="glass-card">
                        <h4>실시간 액션 플랜</h4>
                        <p>지금 당장 어떤 답장을 보내야 할지 가이드 해줍니다.</p>
                    </div>
                </div>
            </section>
        </main>
    );
}
