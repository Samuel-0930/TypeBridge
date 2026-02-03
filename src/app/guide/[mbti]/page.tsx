import { notFound } from "next/navigation";
import Link from "next/link";
import mbtiData from "@/data/mbti_guides.json";
import styles from "./page.module.css";

interface PageProps {
    params: Promise<{ mbti: string }>;
    searchParams: Promise<{ gender?: string; userMbti?: string }>;
}

export async function generateMetadata({ params }: PageProps) {
    const { mbti } = await params;
    const mbtiUpper = mbti.toUpperCase();

    return {
        title: `${mbtiUpper} 연애 가이드 - 성공 확률 100% 공략법 | TypeBridge`,
        description: `${mbtiUpper}인 그 사람의 마음을 사로잡는 법! 유혹 포인트부터 주의사항까지, MBTI 맞춤형 연애 전략을 확인하세요.`,
        openGraph: {
            title: `${mbtiUpper} 연애 가이드 | TypeBridge`,
            description: `${mbtiUpper}인 그 사람, 어떻게 공략할까? 지금 바로 TypeBridge에서 확인하세요. 💘`,
            images: ["https://type-bridge.vercel.app/og-image.avif"],
        },
    };
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
                <Link href="/" className="btn-primary">
                    다른 MBTI 확인하기
                </Link>
            </div>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Article",
                        "headline": `${mbtiUpper} 연애 가이드 - TypeBridge`,
                        "description": `${mbtiUpper} 유형을 위한 맞춤형 연애 전략과 시너지 분석`,
                        "image": "https://type-bridge.vercel.app/og-image.avif",
                        "author": {
                            "@type": "Organization",
                            "name": "TypeBridge"
                        },
                        "publisher": {
                            "@type": "Organization",
                            "name": "TypeBridge",
                            "logo": {
                                "@type": "ImageObject",
                                "url": "https://type-bridge.vercel.app/og-image.avif"
                            }
                        },
                        "mainEntityOfPage": {
                            "@type": "WebPage",
                            "@id": `https://type-bridge.vercel.app/guide/${mbti.toLowerCase()}`
                        }
                    })
                }}
            />
        </main>
    );
}
