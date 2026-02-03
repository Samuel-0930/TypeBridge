"use client";

import styles from "./GenderSelector.module.css";

interface GenderSelectorProps {
    selected: string | null;
    onSelect: (gender: string) => void;
}

export default function GenderSelector({ selected, onSelect }: GenderSelectorProps) {
    const genders = [
        { id: "male", label: "남성", icon: "♂️" },
        { id: "female", label: "여성", icon: "♀️" },
    ];

    return (
        <div className={styles.container}>
            <p className={styles.label}>상대방의 성별을 선택해주세요</p>
            <div className={styles.options}>
                {genders.map((gender) => (
                    <button
                        key={gender.id}
                        className={`${styles.option} glass-card ${selected === gender.id ? styles.active : ""
                            }`}
                        onClick={() => onSelect(gender.id)}
                    >
                        <span className={styles.icon}>{gender.icon}</span>
                        <span className={styles.text}>{gender.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
