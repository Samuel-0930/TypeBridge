import { notFound } from "next/navigation";
import Link from "next/link";
import mbtiData from "@/data/mbti_guides.json";
import styles from "./page.module.css";

interface PageProps {
    params: Promise<{ mbti: string }>;
    searchParams: Promise<{ gender?: string }>;
}

export default async function GuidePage({ params, searchParams }: PageProps) {
    const { mbti } = await params;
    const { gender } = await searchParams;

    const guide = mbtiData.find((item) => item.mbti.toUpperCase() === mbti.toUpperCase());

    if (!guide) {
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

    return (
        <main className={styles.container}>
            <header className={styles.header}>
                <h1 className="gradient-text">{guide.mbti} 연애 가이드</h1>
                <p className={styles.subtitle}>{guide.name}를 위한 맞춤 조언</p>
            </header>

            <section className={styles.content}>
                <div className={`${styles.card} glass-card`}>
                    <h3>✨ 매력 포인트</h3>
                    <ul>
                        {guide.attraction_points.map((point, i) => (
                            <li key={i}>{point}</li>
                        ))}
                    </ul>
                </div>

                <div className={`${styles.card} glass-card`}>
                    <h3>💡 공략 방법</h3>
                    <ul>
                        {guide.how_to_approach.map((tip, i) => (
                            <li key={i}>{tip}</li>
                        ))}
                    </ul>
                </div>

                <div className={`${styles.card} glass-card ${styles.warningCard}`}>
                    <h3>⚠️ 주의할 점</h3>
                    <p>{guide.warning}</p>
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
