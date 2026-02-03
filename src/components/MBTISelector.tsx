"use client";

import styles from "./MBTISelector.module.css";

interface MBTISelectorProps {
    selected: string | null;
    onSelect: (mbti: string) => void;
    label?: string;
}

export default function MBTISelector({ selected, onSelect, label = "상대방의 MBTI를 선택해주세요" }: MBTISelectorProps) {
    const mbtis = [
        "ISTJ", "ISFJ", "INFJ", "INTJ",
        "ISTP", "ISFP", "INFP", "INTP",
        "ESTP", "ESFP", "ENFP", "ENTP",
        "ESTJ", "ESFJ", "ENFJ", "ENTJ"
    ];

    return (
        <div className={styles.container}>
            <p className={styles.label}>{label}</p>
            <div className={styles.grid}>
                {mbtis.map((mbti) => (
                    <button
                        key={mbti}
                        className={`${styles.item} glass-card ${selected === mbti ? styles.active : ""
                            }`}
                        onClick={() => onSelect(mbti)}
                    >
                        {mbti}
                    </button>
                ))}
            </div>
        </div>
    );
}
