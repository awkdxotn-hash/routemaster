import { Link } from "react-router-dom";
import { useLang } from "../context/LanguageContext";
import { regions, routes } from "../data/routes";
import RouteCard from "../components/RouteCard";

export default function Home() {
  const { t } = useLang();

  // 실제 데이터 기반 통계
  const totalRoutes = routes.length;
  const totalRegions = regions.length;
  const totalThemes = [...new Set(routes.flatMap((r) => r.themes))].length;

  // 추천 루트: 각 주요 지역에서 1개씩 선별
  const featured = routes.filter((r) =>
    ["gangwon-east-coast", "gyeongnam-south-sea", "jeonnam-yeosu", "jeju-east-sunrise",
     "busan-beach-village", "seoul-hidden-alleys", "gyeongbuk-gyeongju", "jeonnam-suncheon"].includes(r.id)
  ).slice(0, 8);

  return (
    <main>
      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-teal-900 via-emerald-900 to-stone-900 pt-16">
        {/* 배경 장식 */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 text-9xl">🏔️</div>
          <div className="absolute top-40 right-20 text-8xl">🌊</div>
          <div className="absolute bottom-32 left-32 text-7xl">🏯</div>
          <div className="absolute bottom-20 right-10 text-8xl">🌿</div>
          <div className="absolute top-1/2 left-1/4 text-6xl">⛵</div>
        </div>

        <div className="relative text-center px-4 max-w-4xl mx-auto">
          {/* 배지 */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm text-teal-200 mb-6">
            <span>🇰🇷</span>
            {t("Discover Rural Korea", "진짜 한국 지방을 발견하세요")}
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
            {t("Beyond Seoul.", "서울을 넘어.")}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-400">
              {t("Real Korea Awaits.", "진짜 한국이 기다립니다.")}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-stone-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            {t(
              "Curated travel routes through Gangwon mountains, southern island coasts, ancient Baekje kingdoms, and Korea's food heartland — all off the beaten path.",
              "강원도 산악, 남해 섬, 백제 왕국, 한국 음식의 수도까지 — 관광객이 모르는 진짜 한국 루트."
            )}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/routes"
              className="px-8 py-4 bg-teal-500 hover:bg-teal-400 text-white font-bold rounded-2xl text-lg shadow-lg shadow-teal-900/50 transition-all hover:scale-105"
            >
              {t("Explore Routes →", "루트 탐색하기 →")}
            </Link>
            <a
              href="#regions"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-medium rounded-2xl text-lg border border-white/20 transition-all"
            >
              {t("Browse by Region", "지역별 보기")}
            </a>
          </div>

          {/* 통계 — 실제 데이터 기반 */}
          <div className="flex items-center justify-center gap-8 mt-14 text-stone-400 text-sm">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{totalRoutes}</p>
              <p>{t("Routes", "여행 루트")}</p>
            </div>
            <div className="w-px h-8 bg-stone-700" />
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{totalRegions}</p>
              <p>{t("Regions", "지역")}</p>
            </div>
            <div className="w-px h-8 bg-stone-700" />
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{totalThemes}</p>
              <p>{t("Themes", "테마")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 지역별 카드 ──────────────────────────────────────── */}
      <section id="regions" className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-stone-800 dark:text-stone-100 mb-3">
            {t("Explore by Region", "지역별 탐색", "Explorar por región")}
          </h2>
          <p className="text-stone-500 dark:text-stone-400">
            {t(
              "Each region has its own personality — pick the one that speaks to you.",
              "각 지역마다 고유한 개성이 있습니다 — 당신의 스타일에 맞는 곳을 선택하세요.",
              "Cada región tiene su propia personalidad — elige la que más te inspire."
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {regions.map((region) => (
            <Link
              key={region.id}
              to={`/routes?region=${region.id}`}
              className="group relative rounded-2xl overflow-hidden cursor-pointer"
            >
              <div
                className={`h-52 bg-gradient-to-br ${region.color} flex flex-col items-center justify-center text-white p-6 group-hover:scale-105 transition-transform duration-300`}
              >
                <span className="text-5xl mb-3">{region.emoji}</span>
                <h3 className="text-xl font-bold">{t(region.nameEn, region.nameKo)}</h3>
                <p className="text-sm text-white/80 text-center mt-1">
                  {t(region.taglineEn, region.taglineKo)}
                </p>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-2xl" />
            </Link>
          ))}
        </div>
      </section>

      {/* ── 추천 루트 ──────────────────────────────────────── */}
      <section className="bg-stone-50 dark:bg-stone-800/50 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-stone-800 dark:text-stone-100">
                {t("Featured Routes", "추천 루트", "Rutas destacadas")}
              </h2>
              <p className="text-stone-500 dark:text-stone-400 mt-1">
                {t("Handpicked experiences you won't find in guidebooks.", "가이드북에 없는 엄선된 여행 경험.", "Experiencias únicas que no encontrarás en guías turísticas.")}
              </p>
            </div>
            <Link
              to="/routes"
              className="text-teal-600 font-semibold text-sm hover:text-teal-800 transition-colors hidden sm:block"
            >
              {t("View all →", "전체 보기 →")}
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featured.map((route) => (
              <RouteCard key={route.id} route={route} />
            ))}
          </div>
          <div className="text-center mt-6 sm:hidden">
            <Link to="/routes" className="text-teal-600 font-semibold text-sm hover:text-teal-800">
              {t("View all →", "전체 보기 →")}
            </Link>
          </div>
        </div>
      </section>

      {/* ── 왜 지방인가? ─────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-stone-800 dark:text-stone-100 mb-3">
            {t("Why Go Rural?", "왜 지방여행인가요?", "¿Por qué ir al campo?")}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              emoji: "😌",
              titleEn: "No Crowds", titleKo: "혼잡함 없음", titleEs: "Sin multitudes",
              descEn: "Experience Korea without the selfie sticks and tour buses — just you and the scenery.",
              descKo: "셀카봉과 관광버스 없이 — 오직 당신과 풍경만.",
              descEs: "Vive Corea sin palos para selfis ni autobuses turísticos — solo tú y el paisaje.",
            },
            {
              emoji: "🤝",
              titleEn: "Local Connections", titleKo: "현지인과의 연결", titleEs: "Conexiones locales",
              descEn: "Meet real Koreans in their hometown — guesthouse owners, market vendors, village elders.",
              descKo: "고향에서 사는 진짜 한국인을 만나세요 — 게스트하우스 주인, 시장 상인, 마을 어른.",
              descEs: "Conoce coreanos auténticos — dueños de pensiones, vendedores de mercado, ancianos del pueblo.",
            },
            {
              emoji: "💰",
              titleEn: "Budget-Friendly", titleKo: "저렴한 여행비", titleEs: "Económico",
              descEn: "Accommodation and food cost a fraction of Seoul prices — stretch your trip further.",
              descKo: "서울 대비 훨씬 저렴한 숙박비와 식비 — 더 오래 여행하세요.",
              descEs: "Alojamiento y comida a una fracción del precio de Seúl — viaja más por menos.",
            },
          ].map((item) => (
            <div key={item.titleEn} className="text-center p-8 rounded-2xl bg-white dark:bg-stone-800 border border-stone-100 dark:border-stone-700 shadow-sm">
              <div className="text-4xl mb-4">{item.emoji}</div>
              <h3 className="text-lg font-bold text-stone-800 dark:text-stone-100 mb-2">{t(item.titleEn, item.titleKo, item.titleEs)}</h3>
              <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed">{t(item.descEn, item.descKo, item.descEs)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA 배너 ─────────────────────────────────── */}
      <section className="bg-gradient-to-r from-teal-600 to-emerald-700 py-16 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          {t("Ready to Explore?", "탐험 준비 됐나요?")}
        </h2>
        <p className="text-teal-100 mb-8">
          {t("Find your perfect Korean countryside route today.", "오늘 당신만의 한국 지방 여행 루트를 찾아보세요.")}
        </p>
        <Link
          to="/routes"
          className="inline-block px-8 py-4 bg-white text-teal-700 font-bold rounded-2xl text-lg hover:bg-teal-50 transition-colors shadow-md"
        >
          {t("Browse All Routes →", "모든 루트 보기 →")}
        </Link>
      </section>
    </main>
  );
}
