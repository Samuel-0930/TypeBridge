"use client";

import { motion } from "framer-motion";

interface TimelineItem {
    stage: string;
    title: string;
    desc: string;
}

interface RelationshipTimelineProps {
    data: TimelineItem[];
}

export default function RelationshipTimeline({ data }: RelationshipTimelineProps) {
    return (
        <section style={{ width: "100%", marginTop: "40px" }}>
            <h3 className="gradient-text" style={{
                fontSize: "1.5rem",
                textAlign: "center",
                marginBottom: "30px",
                fontWeight: 700
            }}>
                💘 관계 발전 타임라인
            </h3>

            <div style={{
                position: "relative",
                maxWidth: "600px",
                margin: "0 auto",
                padding: "20px 0"
            }}>
                {/* Vertical Line */}
                <div style={{
                    position: "absolute",
                    left: "20px",
                    top: "0",
                    bottom: "0",
                    width: "2px",
                    background: "linear-gradient(to bottom, var(--primary), var(--secondary))",
                    opacity: 0.3
                }} />

                <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
                    {data.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            style={{
                                display: "flex",
                                gap: "20px",
                                position: "relative"
                            }}
                        >
                            {/* Node */}
                            <div style={{
                                width: "12px",
                                height: "12px",
                                borderRadius: "50%",
                                background: "var(--primary)",
                                marginTop: "6px",
                                marginLeft: "15px", // To center on the line (20px left + 1px center - 6px half width ≈ 15px)
                                zIndex: 1,
                                boxShadow: "0 0 0 4px rgba(255, 71, 126, 0.2)",
                                flexShrink: 0
                            }} />

                            {/* Content Card */}
                            <div style={{
                                flex: 1,
                                background: "rgba(255, 255, 255, 0.8)",
                                backdropFilter: "blur(10px)",
                                border: "1px solid rgba(255, 255, 255, 0.5)",
                                borderRadius: "16px",
                                padding: "20px",
                                boxShadow: "0 4px 15px rgba(0,0,0,0.05)"
                            }}>
                                <span style={{
                                    display: "inline-block",
                                    fontSize: "0.85rem",
                                    color: "var(--primary)",
                                    fontWeight: 700,
                                    marginBottom: "8px",
                                    background: "rgba(255, 71, 126, 0.1)",
                                    padding: "4px 10px",
                                    borderRadius: "20px"
                                }}>
                                    Step {index + 1}: {item.stage}
                                </span>
                                <h4 style={{
                                    fontSize: "1.1rem",
                                    fontWeight: 700,
                                    marginBottom: "8px",
                                    color: "var(--foreground)"
                                }}>
                                    {item.title}
                                </h4>
                                <p style={{
                                    fontSize: "0.95rem",
                                    lineHeight: "1.5",
                                    color: "var(--foreground)",
                                    opacity: 0.8
                                }}>
                                    {item.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
