"use client";

import Link from "next/link";
import styles from "./page.module.css";

export default function ActionPlanPage() {
    const planItems = [
        {
            title: "공감대 형성하기",
            content: "상대방이 최근 관심을 가지는 주제에 대해 먼저 질문을 던져보세요. 단순한 리액션보다는 '그거 정말 재미있었겠네요, 어떤 점이 가장 좋았어요?'와 같은 질문이 효과적입니다.",
        },
        {
            title: "예상치 못한 배려 보여주기",
            content: "상대방이 지나가듯 말했던 작은 취향이나 필요사항을 기억했다가 챙겨주세요. '저번에 ~가 필요하다고 했던 게 생각나서'라는 말 한마디가 큰 감동을 줍니다.",
        },
        {
            title: "자연스러운 만남 제안",
            content: "특정한 목적이 있는 데이트보다는, 가벼운 식사나 산책을 제안해보세요. '오늘 날씨가 너무 좋아서 ~가 생각나는데, 같이 가실래요?'와 같은 부드러운 화법이 좋습니다.",
        },
    ];

    return (
        <main className={styles.container}>
            <header className={styles.header}>
                <h1 className="gradient-text">맞춤형 액션 플랜</h1>
                <p className={styles.subtitle}>AI가 제안하는 승률 99%의 연애 전략</p>
            </header>

            <div className={styles.planList}>
                {planItems.map((item, i) => (
                    <div key={i} className={`${styles.item} glass-card`}>
                        <div className={styles.stepBadge}>Step {i + 1}</div>
                        <h3>{item.title}</h3>
                        <p>{item.content}</p>
                    </div>
                ))}
            </div>

            <div className={styles.finalCall}>
                <Link href="/chat" className="btn-primary">
                    이 플랜대로 AI와 연습해보기
                </Link>
                <Link href="/" className={styles.homeBtn}>
                    홈으로 돌아가기
                </Link>
            </div>
        </main>
    );
}
