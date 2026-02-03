import { notFound } from "next/navigation";
import Link from "next/link";
import mbtiData from "@/data/mbti_guides.json";
import styles from "./page.module.css";

interface PageProps {
    params: Promise<{ mbti: string }>;
    searchParams: Promise<{ gender?: string; userMbti?: string }>;
}

export default async function GuidePage({ params, searchParams }: PageProps) {
    const { mbti } = await params;
    const { gender, userMbti } = await searchParams;

    const mbtiUpper = mbti.toUpperCase();
    const typeData = (mbtiData as any)[mbtiUpper];
    const userMbtiUpper = userMbti?.toUpperCase();
    const userTypeData = userMbtiUpper ? (mbtiData as any)[userMbtiUpper] : null;

    if (!typeData) {
        return (
            <main className={styles.container}>
                <div className="glass-card" style={{ padding: '40px', textAlign: 'center' }}>
                    <h2>데이터를 찾을 수 없습니다</h2>
                    <p>{mbti}에 대한 가이드는 아직 준비 중입니다.</p>
                    <Link href="/" className="btn-primary" style={{ display: 'inline-block', marginTop: '20px' }}>
                        돌아가기
                    </Link>
                </div>
            </main>
        );
    }

    // Determine gender content (default to female if not specified)
    const selectedGender = (gender === "male" || gender === "female") ? gender : "female";
    const guide = typeData[selectedGender];

    return (
        <main className={styles.container}>
            <header className={styles.header}>
                <h1 className="gradient-text">{mbtiUpper} 연애 가이드</h1>
                <p className={styles.subtitle}>{typeData.name}를 위한 맞춤 조언</p>
                <div className={styles.genderBadge}>
                    {selectedGender === "male" ? "♂ 남성 타겟" : "♀ 여성 타겟"}
                </div>
            </header>

            <section className={styles.content}>
                {userTypeData && (
                    <div className={`${styles.card} glass-card`} style={{ border: '2px solid var(--primary)' }}>
                        <h3>✨ 나의 {userMbtiUpper} 강점 활용하기</h3>
                        <ul>
                            {userTypeData.user_strengths.map((strength: string, i: number) => (
                                <li key={i}>{strength}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className={`${styles.card} glass-card`}>
                    <h3>❤️ 이런 사람에게 이끌려요</h3>
                    <ul>
                        {guide.attraction_points.map((point: string, i: number) => (
                            <li key={i}>{point}</li>
                        ))}
                    </ul>
                </div>

                <div className={`${styles.card} glass-card`}>
                    <h3>💡 공략 방법</h3>
                    <ul>
                        {guide.how_to_approach.map((tip: string, i: number) => (
                            <li key={i}>{tip}</li>
                        ))}
                    </ul>
                </div>

                <div className={`${styles.card} glass-card ${styles.warningCard}`}>
                    <h3>⚠️ 주의할 점</h3>
                    <ul>
                        {guide.warning.map((item: string, i: number) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                </div>
            </section>

            <div className={styles.actions}>
                <Link href="/chat" className="btn-primary">
                    비공개 채팅 상담하기 (5회 무료)
                </Link>
                <Link href="/" className={styles.backLink}>
                    다른 MBTI 확인하기
                </Link>
            </div>
        </main>
    );
}
