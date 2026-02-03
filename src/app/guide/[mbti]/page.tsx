import { notFound } from "next/navigation";
import mbtiData from "@/data/mbti_guides.json";
import styles from "./page.module.css";
import GuideResultClient from "@/components/GuideResultClient";

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
        notFound();
    }

    const selectedGender = (gender === "male" || gender === "female") ? gender : "female";
    const guide = typeData[selectedGender];

    return (
        <main className={styles.container}>
            <GuideResultClient
                mbtiUpper={mbtiUpper}
                typeData={typeData}
                guide={guide}
                userTypeData={userTypeData}
                userMbtiUpper={userMbtiUpper}
                selectedGender={selectedGender}
            />

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
