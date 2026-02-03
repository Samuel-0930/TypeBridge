"use client";

import { useRef, useState } from "react";
import * as htmlToImage from "html-to-image";
import styles from "../app/guide/[mbti]/page.module.css";
import Link from "next/link";

interface GuideResultClientProps {
    mbtiUpper: string;
    typeData: any;
    guide: any;
    userTypeData: any;
    userMbtiUpper?: string;
    selectedGender: string;
}

export default function GuideResultClient({
    mbtiUpper,
    typeData,
    guide,
    userTypeData,
    userMbtiUpper,
    selectedGender,
}: GuideResultClientProps) {
    const exportRef = useRef<HTMLDivElement>(null);
    const [isExporting, setIsExporting] = useState(false);

    const handleExport = async () => {
        if (!exportRef.current) return;

        try {
            setIsExporting(true);

            // Allow state update and CSS transitions to settle
            await new Promise((resolve) => setTimeout(resolve, 500));

            console.log("Starting image capture for 9:16 story...");
            const dataUrl = await htmlToImage.toPng(exportRef.current, {
                quality: 1,
                pixelRatio: 2,
                backgroundColor: "#fdfbfb",
            });

            if (!dataUrl || dataUrl.length < 1000) {
                console.error("Generated image seems empty/too small:", dataUrl?.length);
            } else {
                console.log("Image captured successfully, size:", dataUrl.length);
            }

            const link = document.createElement("a");
            link.download = `TypeBridge_${mbtiUpper}_Story.png`;
            link.href = dataUrl;
            link.click();
        } catch (error) {
            console.error("Failed to export image:", error);
            alert("이미지 저장에 실패했습니다. 다시 시도해주세요.");
        } finally {
            setIsExporting(false);
        }
    };

    const GuideContent = ({ isForExport = false }: { isForExport?: boolean }) => (
        <>
            <div className={styles.exportHeader}>
                <span className={styles.brand}>TypeBridge</span>
                <span className={styles.tagline}>상대방의 MBTI로 읽는 연애 전략</span>
            </div>

            <header className={styles.header}>
                <h1 className="gradient-text animate-slide-up">{mbtiUpper} 연애 가이드</h1>
                <p className={`${styles.subtitle} animate-slide-up animate-delay-100`}>{typeData.name}를 위한 맞춤 조언</p>
                <div className={`${styles.genderBadge} animate-fade-in animate-delay-200`}>
                    {selectedGender === "male" ? "♂ 남성 타겟" : "♀ 여성 타겟"}
                </div>
            </header>

            <section className={styles.content}>
                {userTypeData && (
                    <div className={`${styles.card} glass-card animate-slide-up animate-delay-100`} style={{ border: '2px solid var(--primary)' }}>
                        <h3>✨ 나의 {userMbtiUpper} 강점 활용하기</h3>
                        <ul>
                            {userTypeData.user_strengths.map((strength: string, i: number) => (
                                <li key={i}>{strength}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className={`${styles.card} glass-card animate-slide-up animate-delay-200`}>
                    <h3>❤️ 이런 사람에게 이끌려요</h3>
                    <ul>
                        {guide.attraction_points.map((point: string, i: number) => (
                            <li key={i}>{point}</li>
                        ))}
                    </ul>
                </div>

                <div className={`${styles.card} glass-card animate-slide-up animate-delay-300`}>
                    <h3>💡 공략 방법</h3>
                    <ul>
                        {guide.how_to_approach.map((tip: string, i: number) => (
                            <li key={i}>{tip}</li>
                        ))}
                    </ul>
                </div>

                <div className={`${styles.card} glass-card ${styles.warningCard} animate-slide-up animate-delay-400`}>
                    <h3>⚠️ 주의할 점</h3>
                    <ul>
                        {guide.warning.map((item: string, i: number) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </div>
            </section>

            <div className={styles.exportFooter}>
                <p>https://type-bridge.vercel.app</p>
            </div>
        </>
    );

    return (
        <div className={styles.guideWrapper}>
            {/* Hidden capture area (Off-screen) */}
            <div ref={exportRef} className={styles.captureHidden}>
                <GuideContent isForExport={true} />
            </div>

            {/* Visible UI */}
            <div className={styles.captureArea}>
                <GuideContent />
            </div>

            <div className={styles.actions}>
                <button
                    className="btn-primary"
                    onClick={handleExport}
                    disabled={isExporting}
                    style={{ background: 'linear-gradient(135deg, #6e8efb, #a777e3)', width: 'auto', padding: '12px 24px' }}
                >
                    {isExporting ? "이미지 생성 중..." : "📸 결과 이미지 저장"}
                </button>
                <Link href="/" className={styles.backLink}>
                    다른 MBTI 확인하기
                </Link>
            </div>
        </div>
    );
}
