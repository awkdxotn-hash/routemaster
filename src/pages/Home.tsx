import { Link } from "react-router-dom";
import { useLang } from "../context/LanguageContext";
import { regions, routes } from "../data/routes";
import RouteCard from "../components/RouteCard";

// 별빛 파티클 (모듈 레벨 고정)
const STARS = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  x: ((i * 18.3 + 5) % 140) / 140 * 100,
  y: ((i * 11.7 + 3) % 60),
  r: 0.6 + (i % 3) * 0.5,
  dur: 2 + (i % 5) * 0.8,
  delay: -(i % 7) * 0.6,
  opacity: 0.3 + (i % 4) * 0.18,
}));

// 창문 불빛
const WINDOWS = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  x: 550 + ((i * 7.3) % 540),
  y: 240 + ((i * 11.1) % 200),
  dur: 1.5 + (i % 4) * 0.7,
  delay: -(i % 8) * 0.4,
  color: ["#ffd54f", "#ff9800", "#42a5f5", "#fff176", "#ffcc02"][i % 5],
}));

export default function Home() {
  const { t } = useLang();

  const totalRoutes = routes.length;
  const totalRegions = regions.length;
  const totalThemes = [...new Set(routes.flatMap((r) => r.themes))].length;

  const featured = routes
    .filter((r) =>
      [
        "gangwon-east-coast", "gyeongnam-south-sea", "jeonnam-yeosu",
        "jeju-east-sunrise", "busan-beach-village", "seoul-hidden-alleys",
        "gyeongbuk-gyeongju", "jeonnam-suncheon",
      ].includes(r.id)
    )
    .slice(0, 8);

  return (
    <main style={{ background: "#07070f" }}>
      <style>{`
        @keyframes twinkle {
          0%,100% { opacity: var(--sop); transform: scale(1); }
          50%      { opacity: calc(var(--sop) * 2.5); transform: scale(1.6); }
        }
        @keyframes winBlink {
          0%,100% { opacity: 0.15; }
          50%      { opacity: 0.85; }
        }
        @keyframes cloudDrift {
          from { transform: translateX(-120px); }
          to   { transform: translateX(120px); }
        }
        @keyframes auraPulse {
          0%,100% { opacity: 0.07; transform: scale(1); }
          50%      { opacity: 0.18; transform: scale(1.08); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes gradShift {
          0%,100% { background-position: 0% 50%; }
          50%      { background-position: 100% 50%; }
        }
        @keyframes riverShimmer {
          0%,100% { opacity: 0.35; }
          50%      { opacity: 0.55; }
        }
        .star     { animation: twinkle ease-in-out infinite; }
        .win      { animation: winBlink ease-in-out infinite; }
        .cloud    { animation: cloudDrift ease-in-out infinite alternate; }
        .aura     { animation: auraPulse ease-in-out infinite; }
        .river-sh { animation: riverShimmer ease-in-out 4s infinite; }
        .hero-a   { animation: slideUp 1s cubic-bezier(.16,1,.3,1) both; }
        .hero-b   { animation: slideUp 1s .15s cubic-bezier(.16,1,.3,1) both; }
        .hero-c   { animation: slideUp 1s .3s  cubic-bezier(.16,1,.3,1) both; }
        .hero-d   { animation: slideUp 1s .45s cubic-bezier(.16,1,.3,1) both; }
        .sky-bg {
          background: linear-gradient(-45deg,#050510,#0a0820,#080d25,#060318,#0a0628);
          background-size: 400% 400%;
          animation: gradShift 22s ease infinite;
        }
        .gold-text {
          background: linear-gradient(135deg,#d4a843 0%,#f5e17a 45%,#e8c97a 60%,#c9a84c 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .divider-gold {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(201,168,76,0.55), transparent);
        }
        .gold-border-card {
          border: 1px solid rgba(201,168,76,0.15);
          background: linear-gradient(135deg,rgba(255,255,255,0.03),rgba(201,168,76,0.02));
          transition: all 0.4s cubic-bezier(.16,1,.3,1);
        }
        .gold-border-card:hover {
          border-color: rgba(201,168,76,0.5);
          transform: translateY(-5px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.5), 0 0 28px rgba(201,168,76,0.14);
        }
        .why-card {
          border: 1px solid rgba(255,255,255,0.05);
          background: linear-gradient(135deg,rgba(255,255,255,0.025),rgba(201,168,76,0.015));
          transition: all 0.35s ease;
        }
        .why-card:hover {
          border-color: rgba(201,168,76,0.28);
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.45);
        }
      `}</style>

      {/* ══ Hero ══════════════════════════════════════════════ */}
      <section className="sky-bg relative min-h-screen flex items-center justify-center overflow-hidden pt-16">

        {/* 서울 야경 SVG 씬 */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1440 700"
          preserveAspectRatio="xMidYMax slice"
        >
          <defs>
            {/* 하늘 그라디언트 */}
            <linearGradient id="skyG" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#030310"/>
              <stop offset="55%"  stopColor="#0a0820"/>
              <stop offset="100%" stopColor="#151030"/>
            </linearGradient>
            {/* 한강 그라디언트 */}
            <linearGradient id="riverG" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#0e1535" stopOpacity="0.9"/>
              <stop offset="100%" stopColor="#050510" stopOpacity="1"/>
            </linearGradient>
            {/* 도시 불빛 glow */}
            <radialGradient id="cityGlow" cx="50%" cy="80%" r="50%">
              <stop offset="0%"   stopColor="#ff9500" stopOpacity="0.12"/>
              <stop offset="100%" stopColor="#ff9500" stopOpacity="0"/>
            </radialGradient>
            {/* 롯데타워 glow */}
            <radialGradient id="lotteGlow" cx="50%" cy="0%" r="100%">
              <stop offset="0%"   stopColor="#42a5f5" stopOpacity="0.25"/>
              <stop offset="100%" stopColor="#42a5f5" stopOpacity="0"/>
            </radialGradient>
            {/* 달 glow */}
            <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="#fffde7" stopOpacity="0.9"/>
              <stop offset="40%"  stopColor="#fff9c4" stopOpacity="0.5"/>
              <stop offset="100%" stopColor="#fffde7" stopOpacity="0"/>
            </radialGradient>
          </defs>

          {/* 하늘 */}
          <rect width="1440" height="700" fill="url(#skyG)"/>

          {/* 도시 환경광 */}
          <rect width="1440" height="700" fill="url(#cityGlow)"/>

          {/* ─ 달 ─ */}
          <circle cx="1260" cy="80" r="38" fill="url(#moonGlow)" opacity="0.8"/>
          <circle cx="1260" cy="80" r="28" fill="#fffde7" opacity="0.92"/>
          <circle cx="1267" cy="74" r="20" fill="#fffde7" opacity="0.3"/>

          {/* ─ 구름들 ─ */}
          <g className="cloud" style={{ animationDuration: "28s", animationDelay: "0s", transformOrigin: "200px 100px" }}>
            <ellipse cx="200" cy="100" rx="80" ry="20" fill="white" opacity="0.04"/>
            <ellipse cx="240" cy="90"  rx="50" ry="14" fill="white" opacity="0.03"/>
          </g>
          <g className="cloud" style={{ animationDuration: "36s", animationDelay: "-12s", transformOrigin: "1000px 130px" }}>
            <ellipse cx="1000" cy="130" rx="100" ry="22" fill="white" opacity="0.03"/>
            <ellipse cx="1060" cy="118" rx="60"  ry="15" fill="white" opacity="0.025"/>
          </g>
          <g className="cloud" style={{ animationDuration: "44s", animationDelay: "-22s", transformOrigin: "600px 90px" }}>
            <ellipse cx="600" cy="90" rx="90" ry="18" fill="white" opacity="0.025"/>
          </g>

          {/* ─ 별들 ─ */}
          {STARS.map((s) => (
            <circle
              key={s.id}
              className="star"
              cx={s.x * 14.4}
              cy={s.y * 3.5}
              r={s.r}
              fill="white"
              style={{
                animationDuration: `${s.dur}s`,
                animationDelay: `${s.delay}s`,
                "--sop": s.opacity,
                opacity: s.opacity,
              } as React.CSSProperties}
            />
          ))}

          {/* ══ 경복궁 ══ */}
          {/* 기단 */}
          <rect x="30" y="448" width="320" height="18" rx="2" fill="#0d0d1f"/>
          <rect x="50" y="435" width="280" height="15" rx="1" fill="#0d0d1f"/>
          {/* 건물 본체 */}
          <rect x="80" y="395" width="220" height="42" fill="#0e0e20"/>
          {/* 근정전 지붕 — 한옥 팔작지붕 */}
          <path d="M40,395 Q90,345 190,368 Q290,345 340,395 Z" fill="#0d0d1f"/>
          {/* 처마 끝 장식 */}
          <path d="M38,396 Q35,392 40,390 Q45,395 42,398 Z" fill="#0d0d1f"/>
          <path d="M342,396 Q345,392 340,390 Q335,395 338,398 Z" fill="#0d0d1f"/>
          {/* 지붕 상단 장식 */}
          <path d="M170,348 L190,330 L210,348 Z" fill="#0d0d1f"/>
          <rect x="188" y="320" width="4" height="12" fill="#0d0d1f"/>
          {/* 작은 창문 불빛들 */}
          <rect x="100" y="408" width="12" height="18" rx="1" fill="#ffd54f" opacity="0.35"/>
          <rect x="124" y="408" width="12" height="18" rx="1" fill="#ffd54f" opacity="0.28"/>
          <rect x="148" y="408" width="12" height="18" rx="1" fill="#ffd54f" opacity="0.32"/>
          <rect x="172" y="408" width="12" height="18" rx="1" fill="#ffd54f" opacity="0.3"/>
          <rect x="196" y="408" width="12" height="18" rx="1" fill="#ffd54f" opacity="0.35"/>
          <rect x="220" y="408" width="12" height="18" rx="1" fill="#ffd54f" opacity="0.25"/>
          <rect x="244" y="408" width="12" height="18" rx="1" fill="#ffd54f" opacity="0.33"/>
          {/* 등불 효과 */}
          <circle cx="130" cy="395" r="5" fill="#ff9800" opacity="0.5"/>
          <circle cx="190" cy="395" r="5" fill="#ff9800" opacity="0.5"/>
          <circle cx="250" cy="395" r="5" fill="#ff9800" opacity="0.5"/>
          {/* 앞 담장 */}
          <rect x="0"   y="462" width="100" height="10" rx="1" fill="#0a0a1a"/>
          <rect x="250" y="462" width="150" height="10" rx="1" fill="#0a0a1a"/>

          {/* ══ 남산 언덕 ══ */}
          <ellipse cx="500" cy="460" rx="220" ry="65" fill="#080818"/>

          {/* ══ N서울타워 (남산타워) ══ */}
          {/* 기단 건물 */}
          <rect x="476" y="410" width="48" height="25" rx="2" fill="#0e0e22"/>
          {/* 타워 하단 기둥 (넓은 부분) */}
          <path d="M490,410 L494,310 L506,310 L510,410 Z" fill="#0d0d20"/>
          {/* 전망대 플랫폼 */}
          <rect x="481" y="295" width="38" height="18" rx="2" fill="#151528"/>
          {/* 전망대 원통 */}
          <rect x="486" y="270" width="28" height="27" rx="3" fill="#151528"/>
          <ellipse cx="500" cy="270" rx="16" ry="6" fill="#1a1a30"/>
          {/* 타워 상단 가는 기둥 */}
          <rect x="498" y="200" width="4" height="70" fill="#0d0d20"/>
          {/* 안테나 */}
          <rect x="499" y="155" width="2" height="48" fill="#0d0d20"/>
          {/* 타워 불빛 */}
          <circle cx="500" cy="200" r="3" fill="#ff4444" opacity="0.8"/>
          <circle cx="500" cy="175" r="2" fill="#ff4444" opacity="0.7"/>
          <rect x="488" y="275" width="6" height="4" fill="#ffd54f" opacity="0.4"/>
          <rect x="498" y="275" width="6" height="4" fill="#ffd54f" opacity="0.4"/>
          <rect x="506" y="275" width="6" height="4" fill="#ffd54f" opacity="0.4"/>
          {/* 타워 glow */}
          <circle cx="500" cy="270" r="40" fill="#42a5f5" opacity="0.04"/>

          {/* ══ 서울 도심 빌딩군 ══ */}
          {/* 중간 빌딩들 */}
          <rect x="700" y="340" width="38" height="130" fill="#0b0b1e"/>
          <rect x="744" y="310" width="30" height="160" fill="#0d0d22"/>
          <rect x="780" y="355" width="42" height="115" fill="#0a0a1c"/>
          <rect x="828" y="325" width="35" height="145" fill="#0c0c20"/>
          <rect x="869" y="345" width="28" height="125" fill="#0b0b1e"/>
          <rect x="903" y="300" width="36" height="170" fill="#0d0d22"/>
          <rect x="945" y="360" width="32" height="110" fill="#0a0a1c"/>
          <rect x="983" y="330" width="40" height="140" fill="#0c0c20"/>
          {/* 빌딩 창문들 */}
          {WINDOWS.map((w) => (
            <rect
              key={w.id}
              className="win"
              x={w.x} y={w.y}
              width="4" height="5" rx="0.5"
              fill={w.color}
              style={{
                animationDuration: `${w.dur}s`,
                animationDelay: `${w.delay}s`,
              }}
            />
          ))}

          {/* ══ 롯데월드타워 ══ */}
          {/* glow */}
          <ellipse cx="1130" cy="400" rx="80" ry="120" fill="url(#lotteGlow)"/>
          {/* 타워 본체 — 아래 넓고 위로 좁아지는 형태 */}
          <path d="M1098,470 L1112,280 L1120,200 L1124,120 L1126,60 L1134,60 L1136,120 L1140,200 L1148,280 L1162,470 Z" fill="#0d0d20"/>
          {/* 타워 하단 */}
          <path d="M1085,470 L1098,470 L1097,440 L1088,440 Z" fill="#0d0d20"/>
          <path d="M1162,470 L1175,470 L1173,440 L1163,440 Z" fill="#0d0d20"/>
          {/* 꼭대기 첨탑 */}
          <path d="M1126,60 L1130,8 L1134,60 Z" fill="#0e0e22"/>
          {/* 타워 창문들 */}
          <rect x="1118" y="100" width="4" height="6" fill="#ffd54f" opacity="0.5"/>
          <rect x="1124" y="100" width="4" height="6" fill="#42a5f5" opacity="0.4"/>
          <rect x="1117" y="130" width="5" height="6" fill="#ffd54f" opacity="0.4"/>
          <rect x="1124" y="130" width="5" height="6" fill="#ffd54f" opacity="0.45"/>
          <rect x="1115" y="165" width="6" height="6" fill="#fff176" opacity="0.4"/>
          <rect x="1123" y="165" width="6" height="6" fill="#fff176" opacity="0.35"/>
          <rect x="1113" y="205" width="7" height="6" fill="#ffd54f" opacity="0.4"/>
          <rect x="1122" y="205" width="7" height="6" fill="#42a5f5" opacity="0.35"/>
          <rect x="1110" y="250" width="8" height="6" fill="#ffd54f" opacity="0.35"/>
          <rect x="1122" y="250" width="8" height="6" fill="#ffd54f" opacity="0.3"/>
          {/* 꼭대기 불빛 */}
          <circle cx="1130" cy="12" r="3" fill="#ff4444" opacity="0.9"/>
          <circle cx="1130" cy="50" r="2" fill="#42a5f5" opacity="0.7"/>
          {/* 타워 하단 기단 */}
          <rect x="1080" y="465" width="100" height="8" rx="1" fill="#0c0c1e"/>
          <rect x="1070" y="470" width="120" height="6" rx="1" fill="#0b0b1c"/>

          {/* ══ 한강 ══ */}
          <rect x="0" y="490" width="1440" height="120" fill="url(#riverG)"/>
          {/* 한강 물결 반사 */}
          <path className="river-sh" d="M0,500 Q180,495 360,502 Q540,509 720,500 Q900,491 1080,500 Q1260,509 1440,500 L1440,510 Q1260,519 1080,510 Q900,501 720,510 Q540,519 360,512 Q180,505 0,510 Z" fill="white" opacity="0.04"/>
          {/* 롯데타워 반사 */}
          <path d="M1110,510 L1118,560 L1122,590 L1130,610 L1138,590 L1142,560 L1150,510 Z" fill="#42a5f5" opacity="0.06"/>
          {/* 남산타워 반사 */}
          <rect x="497" y="510" width="6" height="60" fill="#ffd54f" opacity="0.05"/>
          {/* 경복궁 반사 */}
          <rect x="150" y="510" width="80" height="40" fill="#ffd54f" opacity="0.04"/>
          {/* 반포 잠수교 실루엣 */}
          <rect x="0"   y="488" width="1440" height="6" rx="1" fill="#0c0c1e"/>
          <rect x="60"  y="484" width="18"   height="8" fill="#0b0b1c"/>
          <rect x="200" y="484" width="18"   height="8" fill="#0b0b1c"/>
          <rect x="340" y="484" width="18"   height="8" fill="#0b0b1c"/>
          <rect x="480" y="484" width="18"   height="8" fill="#0b0b1c"/>
          <rect x="620" y="484" width="18"   height="8" fill="#0b0b1c"/>
          <rect x="760" y="484" width="18"   height="8" fill="#0b0b1c"/>
          <rect x="900" y="484" width="18"   height="8" fill="#0b0b1c"/>
          <rect x="1040" y="484" width="18"  height="8" fill="#0b0b1c"/>
          <rect x="1180" y="484" width="18"  height="8" fill="#0b0b1c"/>
          <rect x="1360" y="484" width="18"  height="8" fill="#0b0b1c"/>

          {/* ─ 하단 어둠 ─ */}
          <rect x="0" y="600" width="1440" height="100" fill="#05050f"/>
        </svg>

        {/* 텍스트 콘텐츠 */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">

          <div className="hero-a inline-flex items-center gap-2.5 rounded-full px-5 py-2 mb-8 text-xs tracking-widest uppercase font-medium"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(201,168,76,0.35)",
              color: "#e8c97a",
              backdropFilter: "blur(12px)",
            }}
          >
            <span>🇰🇷</span>
            {t("Your Ultimate Korea Travel Guide", "한국 여행의 모든 것")}
          </div>

          <h1 className="hero-b font-extrabold leading-[1.1] mb-5"
            style={{ fontSize: "clamp(2.8rem, 8vw, 6.5rem)" }}
          >
            <span className="block" style={{ color: "rgba(240,235,225,0.95)" }}>
              {t("Korea Travel,", "한국 여행,")}
            </span>
            <span className="gold-text block mt-2">
              {t("Made Easy.", "이제 쉬워집니다.")}
            </span>
          </h1>

          <div className="divider-gold max-w-sm mx-auto mb-6" />

          <p className="hero-b text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ color: "rgba(200,190,175,0.75)" }}
          >
            {t(
              "From Seoul's iconic landmarks to hidden countryside gems — expertly curated routes that make planning your perfect Korean trip effortless.",
              "서울 명소부터 숨겨진 지방 보석 같은 곳까지 — 완벽한 한국 여행 계획, 이제 어렵지 않습니다."
            )}
          </p>

          <div className="hero-c flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              to="/routes"
              className="px-9 py-4 rounded-2xl font-bold text-lg transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #c9a84c, #e8c97a, #c9a84c)",
                color: "#07070f",
                boxShadow: "0 4px 28px rgba(201,168,76,0.45)",
              }}
            >
              {t("Explore Routes →", "루트 탐색하기 →")}
            </Link>
            <a
              href="#regions"
              className="px-9 py-4 rounded-2xl font-medium text-lg transition-all hover:scale-105"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "rgba(230,225,215,0.88)",
                backdropFilter: "blur(10px)",
              }}
            >
              {t("Browse by Region", "지역별 보기")}
            </a>
          </div>

          <div className="hero-d flex items-center justify-center gap-10"
            style={{ color: "rgba(180,165,145,0.6)" }}
          >
            {[
              { val: totalRoutes,  label: t("Routes", "여행 루트") },
              { val: totalRegions, label: t("Regions", "지역") },
              { val: totalThemes,  label: t("Themes", "테마") },
            ].map((s, i) => (
              <div key={s.label} className="flex items-center gap-10">
                {i > 0 && <div style={{ width: 1, height: 40, background: "rgba(201,168,76,0.22)" }} />}
                <div className="text-center">
                  <p className="text-3xl font-extrabold leading-none" style={{ color: "#e8c97a" }}>
                    {s.val}
                  </p>
                  <p className="text-xs tracking-widest uppercase mt-1">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 지역별 카드 ══════════════════════════════════════════ */}
      <section id="regions" style={{ background: "#07070f" }} className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "#c9a84c" }}>
              {t("Explore", "탐색")}
            </p>
            <h2 className="text-4xl font-extrabold mb-4" style={{ color: "rgba(240,235,225,0.95)" }}>
              {t("Explore by Region", "지역별 탐색")}
            </h2>
            <div className="divider-gold max-w-xs mx-auto mb-4" />
            <p style={{ color: "rgba(170,155,135,0.65)" }}>
              {t(
                "Each region has its own personality — pick the one that speaks to you.",
                "각 지역마다 고유한 개성이 있습니다. 당신의 스타일에 맞는 곳을 선택하세요."
              )}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {regions.map((region) => (
              <Link key={region.id} to={`/routes?region=${region.id}`} className="gold-border-card rounded-2xl block">
                <div className="p-7 flex flex-col items-center text-center h-44 justify-center">
                  <span className="text-5xl mb-3 block">{region.emoji}</span>
                  <h3 className="text-base font-bold mb-1" style={{ color: "rgba(240,235,225,0.95)" }}>
                    {t(region.nameEn, region.nameKo)}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(170,155,135,0.6)" }}>
                    {t(region.taglineEn, region.taglineKo)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 추천 루트 ════════════════════════════════════════════ */}
      <section style={{ background: "#040408" }} className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <p className="text-xs tracking-widest uppercase mb-2" style={{ color: "#c9a84c" }}>
                {t("Handpicked", "엄선")}
              </p>
              <h2 className="text-4xl font-extrabold" style={{ color: "rgba(240,235,225,0.95)" }}>
                {t("Featured Routes", "추천 루트")}
              </h2>
              <div className="divider-gold mt-3 mb-2" style={{ maxWidth: 200 }} />
              <p className="text-sm" style={{ color: "rgba(160,145,125,0.65)" }}>
                {t("Handpicked experiences you won't find in guidebooks.", "가이드북에 없는 엄선된 여행 경험.")}
              </p>
            </div>
            <Link to="/routes" className="text-sm font-semibold hidden sm:block transition-opacity hover:opacity-70"
              style={{ color: "#c9a84c" }}>
              {t("View all →", "전체 보기 →")}
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featured.map((route) => (
              <RouteCard key={route.id} route={route} />
            ))}
          </div>
          <div className="text-center mt-8 sm:hidden">
            <Link to="/routes" className="text-sm font-semibold" style={{ color: "#c9a84c" }}>
              {t("View all →", "전체 보기 →")}
            </Link>
          </div>
        </div>
      </section>

      {/* ══ 왜 지방인가? ════════════════════════════════════════ */}
      <section style={{ background: "#07070f" }} className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "#c9a84c" }}>
              {t("Why Rural", "지방 여행의 이유")}
            </p>
            <h2 className="text-4xl font-extrabold mb-3" style={{ color: "rgba(240,235,225,0.95)" }}>
              {t("Why Go Rural?", "왜 지방 여행인가요?")}
            </h2>
            <div className="divider-gold max-w-xs mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                emoji: "😌", titleEn: "No Crowds", titleKo: "혼잡함 없음",
                descEn: "Experience Korea without the selfie sticks and tour buses — just you and the scenery.",
                descKo: "셀카봉과 관광버스 없이 — 오직 당신과 풍경만.",
              },
              {
                emoji: "🤝", titleEn: "Local Connections", titleKo: "현지인과의 연결",
                descEn: "Meet real Koreans in their hometown — guesthouse owners, market vendors, village elders.",
                descKo: "고향에 사는 진짜 한국인을 만나세요 — 게스트하우스 주인, 시장 상인, 마을 어른.",
              },
              {
                emoji: "💰", titleEn: "Budget-Friendly", titleKo: "저렴한 여행비",
                descEn: "Accommodation and food cost a fraction of Seoul prices — stretch your trip further.",
                descKo: "서울 대비 훨씬 저렴한 숙박비와 식비 — 더 오래 여행하세요.",
              },
            ].map((item) => (
              <div key={item.titleEn} className="why-card rounded-2xl p-8 text-center">
                <div className="text-4xl mb-5">{item.emoji}</div>
                <h3 className="text-lg font-bold mb-3" style={{ color: "rgba(240,235,225,0.92)" }}>
                  {t(item.titleEn, item.titleKo)}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(160,145,125,0.7)" }}>
                  {t(item.descEn, item.descKo)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ═════════════════════════════════════════════════ */}
      <section className="py-20 text-center px-4 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0e0a01, #1e1402, #0e0a01)",
          borderTop: "1px solid rgba(201,168,76,0.12)",
        }}
      >
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(201,168,76,0.07) 0%, transparent 70%)" }}
        />
        <div className="relative z-10 max-w-2xl mx-auto">
          <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "#c9a84c" }}>
            {t("Start Your Journey", "여정을 시작하세요")}
          </p>
          <h2 className="text-4xl font-extrabold mb-4" style={{ color: "rgba(240,235,225,0.95)" }}>
            {t("Ready to Explore?", "탐험 준비 됐나요?")}
          </h2>
          <div className="divider-gold max-w-xs mx-auto mb-6" />
          <p className="mb-10" style={{ color: "rgba(190,175,150,0.65)" }}>
            {t("Find your perfect Korean travel route today.", "오늘 당신만의 완벽한 한국 여행 루트를 찾아보세요.")}
          </p>
          <Link
            to="/routes"
            className="inline-block px-10 py-4 rounded-2xl font-bold text-lg transition-all hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #c9a84c, #e8c97a, #c9a84c)",
              color: "#07070f",
              boxShadow: "0 4px 32px rgba(201,168,76,0.45)",
            }}
          >
            {t("Browse All Routes →", "모든 루트 보기 →")}
          </Link>
        </div>
      </section>
    </main>
  );
}
