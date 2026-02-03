"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { track } from "@vercel/analytics";
import GenderSelector from "@/components/GenderSelector";
import MBTISelector from "@/components/MBTISelector";
import styles from "./page.module.css";

export default function Home() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [targetGender, setTargetGender] = useState<string | null>(null);
  const [targetMbti, setTargetMbti] = useState<string | null>(null);
  const [userMbti, setUserMbti] = useState<string | null>(null);

  const handleNextStep = () => {
    if (targetGender && targetMbti) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleStart = () => {
    if (targetGender && targetMbti && userMbti) {
      // Track complete selection trend
      track("synergy_guide_started", {
        target_gender: targetGender,
        target_mbti: targetMbti,
        user_mbti: userMbti,
      });

      router.push(`/guide/${targetMbti}?gender=${targetGender}&userMbti=${userMbti}`);
    }
  };

  return (
    <main className={styles.container}>
      <section className={styles.hero}>
        <h1 className="gradient-text">TypeBridge</h1>
        <p className={styles.subtitle}>
          {step === 1
            ? "그 사람의 속마음, MBTI로 꿰뚫어보기 💘"
            : "나의 MBTI도 알려주세요! 더 정확한 공략법을 드릴게요. ✨"}
        </p>
      </section>

      <div className={styles.selectors}>
        {step === 1 ? (
          <>
            <GenderSelector selected={targetGender} onSelect={setTargetGender} />
            <MBTISelector selected={targetMbti} onSelect={setTargetMbti} />
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
            <div className={styles.buttonGroup}>
              <button
                className={styles.backButton}
                onClick={() => setStep(1)}
              >
                이전으로
              </button>
              <button
                className={`btn-primary ${styles.cta}`}
                disabled={!userMbti}
                onClick={handleStart}
              >
                매칭 가이드 받기
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
