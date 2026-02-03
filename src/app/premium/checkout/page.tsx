"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

export default function CheckoutPage() {
    const [selectedPlan, setSelectedPlan] = useState<"once" | "unlimited">("once");

    const handlePayment = () => {
        alert(`${selectedPlan === "once" ? "1회 분석" : "무제한 멤버십"} 결제 창을 엽니다... (실제 연동 시 SDK 호출)`);
        // Example for Toss Payments setup
        // window.TossPayments.requestPayment(...)
    };

    return (
        <main className={styles.container}>
            <header className={styles.header}>
                <h1 className="gradient-text">프리미엄 멤버십</h1>
                <p className={styles.subtitle}>더 깊은 분석과 무제한 상담을 시작해보세요.</p>
            </header>

            <div className={styles.planGrid}>
                <div
                    className={`${styles.planCard} glass-card ${selectedPlan === "once" ? styles.active : ""}`}
                    onClick={() => setSelectedPlan("once")}
                >
                    <div className={styles.planHeader}>
                        <h3>1회 집중 분석</h3>
                        <p className={styles.price}>₩4,900</p>
                    </div>
                    <ul className={styles.features}>
                        <li>대화 내역 1회 정밀 분석</li>
                        <li>맞춤형 액션 플랜 제공</li>
                        <li>분석 결과 영구 소장</li>
                    </ul>
                </div>

                <div
                    className={`${styles.planCard} glass-card ${selectedPlan === "unlimited" ? styles.active : ""}`}
                    onClick={() => setSelectedPlan("unlimited")}
                >
                    <div className={styles.badge}>인기</div>
                    <div className={styles.planHeader}>
                        <h3>무제한 패스 (1개월)</h3>
                        <p className={styles.price}>₩12,900</p>
                    </div>
                    <ul className={styles.features}>
                        <li>모든 MBTI 가이드 무제한 열람</li>
                        <li>AI 채팅 상담 무제한 이용</li>
                        <li>대화 내역 정밀 분석 무제한</li>
                        <li>신규 기능 우선 체험</li>
                    </ul>
                </div>
            </div>

            <div className={styles.footer}>
                <button className="btn-primary" onClick={handlePayment}>
                    {selectedPlan === "once" ? "4,900원 결제하기" : "12,900원 결제하기"}
                </button>
                <p className={styles.secure}>🔒 안전한 암호화 결제 시스템을 사용합니다.</p>
            </div>

            <Link href="/premium" className={styles.backLink}>이전으로 돌아가기</Link>
        </main>
    );
}
