"use client";

import { useState, Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { track } from "@vercel/analytics";
import GenderSelector from "@/components/GenderSelector";
import MBTISelector from "@/components/MBTISelector";
import styles from "./page.module.css";
import Link from "next/link";

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const myMbtiResult = searchParams.get("myMbti");
  const targetMbtiResult = searchParams.get("targetMbti");
  const genderParam = searchParams.get("gender");

  const [step, setStep] = useState(myMbtiResult ? 2 : 1);
  const [targetGender, setTargetGender] = useState<string | null>(genderParam || null);
  const [targetMbti, setTargetMbti] = useState<string | null>(targetMbtiResult?.toUpperCase() || null);
  const [userMbti, setUserMbti] = useState<string | null>(myMbtiResult?.toUpperCase() || null);

  // Clear query parameters after initialization to prevent "stuck" URL issues
  useEffect(() => {
    if (myMbtiResult || targetMbtiResult || genderParam) {
      router.replace("/", { scroll: false });
    }
  }, [myMbtiResult, targetMbtiResult, genderParam, router]);

  const handleNextStep = () => {
    if (targetGender && targetMbti) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleStart = () => {
    if (targetGender && targetMbti && userMbti) {
      track("synergy_guide_started", {
        target_gender: targetGender,
        target_mbti: targetMbti,
        user_mbti: userMbti,
      });

      router.push(`/guide/${targetMbti}?gender=${targetGender}&userMbti=${userMbti}`);
    } else {
      console.log("Missing state:", { targetGender, targetMbti, userMbti });
    }
  };

  return (
    <main className={styles.container}>
      <section className={styles.hero}>
        <h1 className="gradient-text">TypeBridge</h1>
        <p className={styles.subtitle}>
          {step === 1
            ? "그 사람의 속마음, MBTI로 꿰뚫어보기 💘"
            : "나의 MBTI도 알려주세요! 더 정확한 공략법을 드릴게요 ✨"}
        </p>
      </section>

      <div className={styles.selectors}>
        {step === 1 ? (
          <>
            <GenderSelector selected={targetGender} onSelect={setTargetGender} />
            <MBTISelector selected={targetMbti} onSelect={setTargetMbti} />
            <p style={{ marginTop: '-10px', marginBottom: '10px', fontSize: '0.9rem', opacity: 0.7, textAlign: 'center' }}>
              그 사람의 MBTI를 잘 모르겠나요? {' '}
              <Link
                href={`/quiz?type=target${targetGender ? `&gender=${targetGender}` : ''}`}
                style={{ color: 'var(--primary)', textDecoration: 'underline' }}
              >
                유추 퀴즈 해보기
              </Link>
            </p>
            <button
              className={`btn-primary ${styles.cta}`}
              disabled={!targetGender || !targetMbti}
              onClick={handleNextStep}
            >
              다음으로
            </button>
          </>
        ) : (
          <>
            <MBTISelector
              selected={userMbti}
              onSelect={setUserMbti}
              label="나의 MBTI를 선택해주세요"
            />
            <p style={{ marginTop: '-10px', fontSize: '0.9rem', opacity: 0.7, textAlign: 'center' }}>
              자신의 MBTI를 잘 모르겠나요? {' '}
              <Link
                href={`/quiz?type=user${targetGender ? `&gender=${targetGender}` : ''}${targetMbti ? `&targetMbti=${targetMbti}` : ''}`}
                style={{ color: 'var(--primary)', textDecoration: 'underline' }}
              >
                3분 정밀 퀴즈 해보기
              </Link>
            </p>
            <div className={styles.buttonGroup}>
              <button
                className={`btn-primary ${styles.cta}`}
                disabled={!userMbti}
                onClick={handleStart}
              >
                매칭 가이드 받기
              </button>
              <button
                className={styles.backButton}
                onClick={() => setStep(1)}
              >
                이전으로
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
