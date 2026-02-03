"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import GenderSelector from "@/components/GenderSelector";
import MBTISelector from "@/components/MBTISelector";
import styles from "./page.module.css";

export default function Home() {
  const router = useRouter();
  const [gender, setGender] = useState<string | null>(null);
  const [mbti, setMbti] = useState<string | null>(null);

  const handleStart = () => {
    if (gender && mbti) {
      router.push(`/guide/${mbti}?gender=${gender}`);
    }
  };

  return (
    <main className={styles.container}>
      <section className={styles.hero}>
        <h1 className="gradient-text">TypeBridge</h1>
        <p className={styles.subtitle}>
          상대방의 MBTI를 통해 더 깊은 관계를 만들어보세요.
        </p>
      </section>

      <div className={styles.selectors}>
        <GenderSelector selected={gender} onSelect={setGender} />
        <MBTISelector selected={mbti} onSelect={setMbti} />
      </div>

      <button
        className={`btn-primary ${styles.cta}`}
        disabled={!gender || !mbti}
        onClick={handleStart}
      >
        가이드 받기
      </button>
    </main>
  );
}
