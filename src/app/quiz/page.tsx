"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./quiz.module.css";

const questions = [
    {
        id: "EI",
        question: "주말에 나는 어떨 때 더 즐거운가요?",
        options: [
            { text: "친구들과 북적북격 신나게 노는 것!", value: "E" },
            { text: "집에서 혼자 조용히 에너지를 충전하는 것!", value: "I" },
        ],
    },
    {
        id: "SN",
        question: "새로운 정보를 접할 때 나는?",
        options: [
            { text: "현실적이고 구체적인 사실을 먼저 봐요.", value: "S" },
            { text: "아이디어와 미래의 가능성을 먼저 봐요.", value: "N" },
        ],
    },
    {
        id: "TF",
        question: "친구의 고민 상담을 해줄 때 나는?",
        options: [
            { text: "객관적인 판단과 해결책을 제시해요.", value: "T" },
            { text: "속상했을 마음을 먼저 다독여줘요.", value: "F" },
        ],
    },
    {
        id: "JP",
        question: "여행을 가기로 했을 때 나는?",
        options: [
            { text: "시간별로 꼼꼼하게 계획을 세워야 마음이 편해요.", value: "J" },
            { text: "그때그때 기분에 따라 자유롭게 다녀요.", value: "P" },
        ],
    },
];

function QuizPageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const type = searchParams.get("type") || "user"; // "user" or "target"

    const [currentStep, setCurrentStep] = useState(0);
    const [results, setResults] = useState<string[]>([]);
    const [mbti, setMbti] = useState<string | null>(null);

    const handleSelect = (value: string) => {
        const newResults = [...results, value];

        if (currentStep < questions.length - 1) {
            setResults(newResults);
            setCurrentStep(currentStep + 1);
        } else {
            const finalMbti = newResults.join("");
            setMbti(finalMbti);
        }
    };

    const goToHome = () => {
        if (mbti) {
            const param = type === "target" ? `targetMbti=${mbti}` : `myMbti=${mbti}`;
            router.push(`/?${param}`);
        }
    };

    if (mbti) {
        return (
            <main className={styles.container}>
                <div className={`${styles.resultCard} glass-card`}>
                    <h2 className="gradient-text">
                        {type === "target" ? "그 사람의 예상 MBTI" : "나의 MBTI 결과"}
                    </h2>
                    <div className={`${styles.mbtiResult} gradient-text`}>{mbti}</div>
                    <p>
                        {type === "target"
                            ? "분석된 MBTI를 바탕으로 공략법을 확인해보세요!"
                            : "당신의 연애 매력을 가장 잘 살려줄 가이드를 확인해보세요!"}
                    </p>
                    <div className={styles.actions}>
                        <button className="btn-primary" onClick={goToHome}>
                            {type === "target" ? "공략법 보러 가기" : "시너지 가이드 보러 가기"}
                        </button>
                        <button className="btn-secondary" onClick={() => window.location.reload()}>
                            다시 테스트하기
                        </button>
                    </div>
                </div>
            </main>
        );
    }

    const progress = ((currentStep + 1) / questions.length) * 100;

    return (
        <main className={styles.container}>
            <header className={styles.header}>
                <h1 className="gradient-text">
                    {type === "target" ? "그 사람 MBTI 유추하기" : "나의 MBTI 찾기"}
                </h1>
                <div className={styles.progress}>
                    <div
                        className={styles.progressBar}
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </header>

            <section className={styles.quizContent}>
                <p className={styles.question}>
                    {type === "target" ? "그 사람은" : ""} {questions[currentStep].question}
                </p>
                <div className={styles.options}>
                    {questions[currentStep].options.map((option, i) => (
                        <button
                            key={i}
                            className={styles.optionBtn}
                            onClick={() => handleSelect(option.value)}
                        >
                            {option.text}
                        </button>
                    ))}
                </div>
            </section>
        </main>
    );
}

export default function QuizPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <QuizPageContent />
        </Suspense>
    );
}
```
