# TypeBridge (타입브릿지)

MBTI 기반의 맞춤형 연애 가이드 서비스입니다. 상대방의 MBTI와 나의 MBTI를 분석하여 최적의 관계 전략을 제안합니다.

[**Live Demo 바로가기**](https://type-bridge.vercel.app/)

---

## 📖 Project Overview
단순한 MBTI 특징 나열을 넘어, 타겟팅된 이성과의 소통을 돕기 위해 기획되었습니다. 사용자는 상대방의 정보를 입력하고 맞춤형 가이드와 AI 상담을 통해 전문적인 연애 솔루션을 경험할 수 있습니다.

<img width="758" height="955" alt="스크린샷 2026-02-03 오후 6 32 12" src="https://github.com/user-attachments/assets/4f696efb-23d6-45a3-9ce2-2d99c1ba33f0" />

### 1️⃣ MBTI 기반 맞춤형 가이드
- **심층 분석 데이터**: 16가지 성격 유형별 '매력 포인트', '접근 전략', '주의사항' 제공
- **동적 가이드 생성**: Next.js의 Dynamic Routes를 활용한 사용자 맞춤형 가이드 출력

### 2️⃣ 프리미엄 AI 대화 내역 분석
- **호감도 수치화**: 카톡 메시지 등 대화 내역을 분석하여 상대방의 호감도를 **0%~100% 점수**로 산출
- **Secret Feedback**: 텍스트 뒤에 숨겨진 상대방의 심리를 AI가 읽어주는 정밀 피드백

### 3️⃣ 단계별 액션 플랜 (Action Plan)
- 분석 결과에 따라 당장 실천할 수 있는 **Step-by-Step 전략** 제시
- 관계 발전을 위한 구체적인 대화 화법 및 행동 가이드

### 4️⃣ 실시간 AI 상담소
- 연애 고민을 실시간으로 나눌 수 있는 인터랙티브 채팅 인터페이스
- **비즈니스 모델**: 로컬 스토리지를 활용한 무료 5회 상담 제한 및 프리미엄 결제 연동 플로우 구현

## 🛠 Technical Stack

### **Frontend & Backend**
- **Next.js 14 (App Router)**: 고성능 SSR/SSG 지원 및 효율적인 라우팅 관리
- **TypeScript**: 안정적인 코드 베이스와 타입 안정성 확보
- **Vanilla CSS (CSS Modules)**: 라이브러리에 의존하지 않는 고유의 디자인 시스템 구축 및 스타일 캡슐화

### **Design System**
- **Geist & Outfit Fonts**: 프리미엄하고 친근한 느낌의 타이포그래피 적용
- **Glassmorphism**: 투명도와 블러 효과를 적극 활용하여 깊이감 있는 세련된 UI 구현
- **Responsive Design**: 모바일, 태블릿, 데스크탑을 모두 지원하는 반응형 레이아웃

### **Deployment & DevOps**
- **Vercel**: 자동 빌드 및 배포 시스템(CI/CD) 구축
- **SEO & OG**: SNS 공유 시 최적화된 미리보기를 위한 Open Graph 메타데이터 적용
- **Google AdSense Ready**: 수익화를 고려한 광고 스크립트 기반 마련

## 🚀 Key Learning & Challenges
- **UI/UX Aesthetics**: 단순 기능을 넘어 '수익화 가능한 서비스'처럼 느껴질 수 있도록 디자인 퀄리티(Premium UX)를 높이는 데 집중했습니다.
- **Client-Side Storage Strategy**: 초기 버전에서 사용자 사용 패턴을 추적하기 위해 로컬 스토리지를 활용한 실시간 상담 횟수 제한 로직을 성공적으로 분리/구현했습니다.
- **Performance Optimization**: Next.js의 서버 컴포넌트와 클라이언트 컴포넌트를 적재적소에 배치하여 배포된 환경에서 빠른 로딩 속도를 달성했습니다.

## 💻 Getting Started
프로젝트를 로컬 환경에서 실행하려면 아래 명령어를 입력하세요.

```bash
git clone https://github.com/Samuel-0930/TypeBridge.git
cd TypeBridge
npm install
npm run dev
```

---
**Developed with Antigravity AI**
