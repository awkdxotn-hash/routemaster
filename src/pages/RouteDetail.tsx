import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { routes } from "../data/routes";
import { useLang } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import { useLike } from "../hooks/useLikes";
import { useReviews } from "../hooks/useReviews";
import { routeTransport, HUBS } from "../data/transportHub";
import { getRouteImage } from "../data/routeImages";

// ── 구글 지도 URL 헬퍼 ────────────────────────────────────
function mapsSearchUrl(name: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name + " 한국")}`;
}

function mapsDirUrl(stops: { nameKo: string }[]) {
  const waypoints = stops.map((s) => encodeURIComponent(s.nameKo)).join("/");
  return `https://www.google.com/maps/dir/${waypoints}`;
}

const themeColors: Record<string, string> = {
  nature: "bg-emerald-100 text-emerald-700",
  food: "bg-orange-100 text-orange-700",
  history: "bg-amber-100 text-amber-700",
  culture: "bg-purple-100 text-purple-700",
  coastal: "bg-sky-100 text-sky-700",
};

// ── 후기 작성 폼 ───────────────────────────────────────────
function ReviewForm({ onAdd }: { onAdd: (data: { author: string; country?: string; rating: number; text: string }) => void }) {
  const { t } = useLang();
  const { user, profile } = useAuth();
  const [country, setCountry] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!user) {
    return (
      <div className="bg-stone-50 dark:bg-stone-800/60 rounded-xl border border-stone-100 dark:border-stone-700 p-4 text-center">
        <p className="text-sm text-stone-500 dark:text-stone-400 mb-3">후기를 작성하려면 로그인이 필요합니다</p>
        <a href="/login" className="inline-block px-4 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold transition-colors">
          로그인
        </a>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd({ author: profile?.nickname ?? "익명", country: country.trim() || undefined, rating, text: text.trim() });
    setCountry(""); setRating(5); setText("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-stone-50 dark:bg-stone-800/60 rounded-xl border border-stone-100 dark:border-stone-700 p-4 space-y-3">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center text-white text-xs font-bold">
          {profile?.nickname?.charAt(0).toUpperCase() ?? "U"}
        </div>
        <h4 className="font-semibold text-stone-700 dark:text-stone-200 text-sm">
          ✏️ {t("Write a Review", "후기 작성")} <span className="font-normal text-stone-400 text-xs">— {profile?.nickname}</span>
        </h4>
      </div>
      <input
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        placeholder={t("Country (optional)", "국가 (선택)")}
        maxLength={30}
        className="w-36 px-3 py-2 rounded-lg border border-stone-200 dark:border-stone-600 bg-white dark:bg-stone-700 text-sm text-stone-700 dark:text-stone-200 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-teal-300"
      />
      {/* 별점 */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-stone-500 dark:text-stone-400">{t("Rating:", "별점:")}</span>
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setRating(n)}
            className={`text-xl transition-transform hover:scale-110 ${n <= rating ? "text-amber-400" : "text-stone-200 dark:text-stone-600"}`}
          >
            ★
          </button>
        ))}
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={t("Share your experience on this route...", "이 루트에 대한 경험을 공유해주세요...")}
        rows={3}
        maxLength={500}
        className="w-full px-3 py-2 rounded-lg border border-stone-200 dark:border-stone-600 bg-white dark:bg-stone-700 text-sm text-stone-700 dark:text-stone-200 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-teal-300 resize-none"
      />
      <div className="flex items-center justify-between">
        <span className="text-xs text-stone-400">{text.length}/500</span>
        <button
          type="submit"
          disabled={!text.trim()}
          className="px-4 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors"
        >
          {submitted ? "✓ " + t("Posted!", "등록됨!") : t("Submit", "등록")}
        </button>
      </div>
    </form>
  );
}

// ── 교통 허브 아코디언 ──────────────────────────────────────
function TransportSection({ routeId }: { routeId: string }) {
  const { t } = useLang();
  const transport = routeTransport[routeId];
  const [activeHub, setActiveHub] = useState<string | null>(null);
  const [activeOption, setActiveOption] = useState<number>(0);

  if (!transport) return null;

  return (
    <div className="bg-white dark:bg-stone-800 rounded-2xl border border-stone-100 dark:border-stone-700 p-5">
      <h3 className="font-bold text-stone-800 dark:text-stone-100 mb-1">
        🚌 {t("Getting There", "교통 정보")}
      </h3>
      <p className="text-xs text-stone-500 dark:text-stone-400 mb-4">
        {t(`How to reach ${transport.firstStopEn}`, `${transport.firstStopKo}까지 이동 방법`)}
      </p>

      <div className="space-y-2">
        {HUBS.map((hub) => {
          const hubInfo = transport.hubs.find((h) => h.hubId === hub.id);
          if (!hubInfo) return null;
          const isOpen = activeHub === hub.id;

          return (
            <div key={hub.id} className="border border-stone-100 dark:border-stone-700 rounded-xl overflow-hidden">
              <button
                onClick={() => {
                  setActiveHub(isOpen ? null : hub.id);
                  setActiveOption(0);
                }}
                className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-stone-50 dark:hover:bg-stone-700/50 transition-colors"
              >
                <span className="flex items-center gap-2 font-medium text-sm text-stone-700 dark:text-stone-200">
                  <span className="text-lg">{hub.emoji}</span>
                  {t(hub.nameEn, hub.nameKo)}
                </span>
                <span className={`text-stone-400 text-sm transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>▾</span>
              </button>

              {isOpen && (
                <div className="px-4 pb-4 bg-stone-50 dark:bg-stone-800/60">
                  {/* 이동 수단 탭 */}
                  {hubInfo.options.length > 1 && (
                    <div className="flex gap-2 mb-3 pt-3">
                      {hubInfo.options.map((opt, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveOption(idx)}
                          className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                            activeOption === idx
                              ? "bg-teal-600 text-white border-teal-600"
                              : "bg-white dark:bg-stone-700 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-600"
                          }`}
                        >
                          {t(opt.methodEn, opt.method)}
                        </button>
                      ))}
                    </div>
                  )}

                  {hubInfo.options[activeOption] && (() => {
                    const opt = hubInfo.options[activeOption];
                    return (
                      <div>
                        {/* 시간 & 비용 */}
                        <div className="flex gap-4 mb-3 pt-2">
                          <div className="flex items-center gap-1.5 text-sm">
                            <span className="text-stone-400">⏱</span>
                            <span className="font-semibold text-stone-700 dark:text-stone-200">{opt.duration}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-sm">
                            <span className="text-stone-400">💳</span>
                            <span className="font-semibold text-teal-600 dark:text-teal-400">
                              {t(opt.costEn, opt.cost)}
                            </span>
                          </div>
                        </div>

                        {/* 단계별 안내 */}
                        <ol className="space-y-2">
                          {opt.steps.map((step, i) => (
                            <li key={i} className="flex gap-3 text-sm">
                              <span className="w-5 h-5 rounded-full bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                                {i + 1}
                              </span>
                              <span className="text-stone-600 dark:text-stone-300 leading-relaxed">
                                {t(step.en, step.ko)}
                              </span>
                            </li>
                          ))}
                        </ol>

                        {/* 지도 링크 */}
                        {opt.mapQuery && (
                          <a
                            href={`https://www.google.com/maps/search/${encodeURIComponent(opt.mapQuery)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 inline-flex items-center gap-1.5 text-xs text-teal-600 dark:text-teal-400 hover:underline"
                          >
                            🗺️ {t("View on Google Maps", "구글 지도에서 보기")}
                          </a>
                        )}
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── 메인 RouteDetail ────────────────────────────────────────
export default function RouteDetail() {
  const { id } = useParams<{ id: string }>();
  const { t } = useLang();
  const route = routes.find((r) => r.id === id);
  const { likes, liked, toggle } = useLike(id ?? "");
  const { reviews, addReview } = useReviews(id ?? "");
  const imageUrl = id ? getRouteImage(id) : undefined;
  const [imgError, setImgError] = useState(false);

  if (!route) {
    return (
      <main className="pt-24 text-center py-40">
        <p className="text-5xl mb-4">🗺️</p>
        <p className="text-xl font-bold text-stone-700">
          {t("Route not found.", "루트를 찾을 수 없습니다.")}
        </p>
        <Link to="/routes" className="mt-6 inline-block text-teal-600 font-medium hover:underline">
          ← {t("Back to Routes", "루트 목록으로")}
        </Link>
      </main>
    );
  }

  const avgRating = reviews.length > 0
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  return (
    <main className="pt-20 pb-24 min-h-screen">

      {/* ── 히어로 헤더 ─────────────────────────────────── */}
      <div className="relative bg-gradient-to-br from-teal-900 via-emerald-900 to-stone-900 py-16 text-white overflow-hidden">
        {/* 배경 사진 */}
        {imageUrl && !imgError && (
          <img
            src={imageUrl}
            alt={route.titleEn}
            onError={() => setImgError(true)}
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
        )}
        <div className="relative max-w-4xl mx-auto px-4">
          <Link
            to="/routes"
            className="inline-flex items-center gap-1 text-teal-300 text-sm hover:text-teal-200 mb-6"
          >
            ← {t("All Routes", "모든 루트")}
          </Link>

          <div className="flex items-start gap-5">
            <span className="text-6xl">{route.coverEmoji}</span>
            <div className="flex-1">
              <p className="text-teal-300 text-sm font-semibold uppercase tracking-wider mb-1">
                {t(route.region, route.regionKo)}
              </p>
              <h1 className="text-3xl md:text-4xl font-extrabold leading-tight mb-3">
                {t(route.titleEn, route.titleKo)}
              </h1>
              <p className="text-stone-300 text-base leading-relaxed max-w-2xl">
                {t(route.descEn, route.descKo)}
              </p>

              {/* 메타 */}
              <div className="flex flex-wrap gap-4 mt-5 text-sm text-stone-300">
                <span>🗓 {route.duration}</span>
                <span>
                  🎯{" "}
                  {t(
                    route.difficulty.charAt(0).toUpperCase() + route.difficulty.slice(1),
                    route.difficulty === "easy" ? "쉬움" : route.difficulty === "moderate" ? "보통" : "도전적"
                  )}
                </span>
                {avgRating && (
                  <span>⭐ {avgRating} ({reviews.length}{t(" reviews", "개 후기")})</span>
                )}
              </div>

              {/* 테마 태그 + 좋아요 버튼 */}
              <div className="flex flex-wrap items-center gap-2 mt-4">
                {route.themes.map((theme) => (
                  <span
                    key={theme}
                    className={`text-xs px-3 py-1 rounded-full font-medium ${themeColors[theme]}`}
                  >
                    {theme}
                  </span>
                ))}
                <button
                  onClick={toggle}
                  className={`ml-2 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold border transition-all duration-150 ${
                    liked
                      ? "bg-rose-500 border-rose-500 text-white shadow-md"
                      : "bg-white/10 border-white/30 text-white hover:bg-white/20"
                  }`}
                >
                  {liked ? "❤️" : "🤍"} {t("Like", "추천")} {likes > 0 && <span className="opacity-80">{likes}</span>}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-12 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* ── 사이드바 ──────────────────────────────────── */}
        <aside className="md:col-span-1 space-y-6">
          {/* 하이라이트 */}
          <div className="bg-teal-50 dark:bg-teal-900/20 rounded-2xl p-5 border border-teal-100 dark:border-teal-800">
            <h3 className="font-bold text-teal-800 dark:text-teal-300 mb-3">
              {t("Highlights", "하이라이트")}
            </h3>
            <ul className="space-y-2">
              {route.highlights.map((h) => (
                <li key={h} className="flex items-center gap-2 text-sm text-teal-700 dark:text-teal-400">
                  <span className="text-teal-400">✦</span> {h}
                </li>
              ))}
            </ul>
          </div>

          {/* 여행 팁 */}
          <div className="bg-amber-50 dark:bg-amber-900/10 rounded-2xl p-5 border border-amber-100 dark:border-amber-800">
            <h3 className="font-bold text-amber-800 dark:text-amber-300 mb-3">
              💡 {t("Travel Tips", "여행 팁")}
            </h3>
            <ul className="space-y-3">
              {route.tips.map((tip, i) => (
                <li key={i} className="text-sm text-amber-700 dark:text-amber-400 leading-relaxed">
                  {t(tip.en, tip.ko)}
                </li>
              ))}
            </ul>
          </div>

          {/* 지도 링크 */}
          <div className="flex flex-col gap-2">
            <a
              href={route.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold transition-colors"
            >
              🗺️ {t("Open in Google Maps", "구글 지도 열기")}
            </a>
            <a
              href={mapsDirUrl(route.days.flatMap((d) => d.stops))}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border-2 border-teal-600 text-teal-600 dark:text-teal-400 dark:border-teal-500 hover:bg-teal-50 dark:hover:bg-teal-900/20 text-sm font-semibold transition-colors"
            >
              🛣️ {t("Full Route on Maps", "전체 루트 지도로 보기")}
            </a>
          </div>

          {/* 교통 허브 */}
          <TransportSection routeId={route.id} />
        </aside>

        {/* ── 일정 ──────────────────────────────────────── */}
        <section className="md:col-span-2 space-y-10">
          <div>
            <h2 className="text-2xl font-bold text-stone-800 dark:text-stone-100 mb-6">
              {t("Itinerary", "여행 일정")}
            </h2>

            <div className="space-y-8">
              {route.days.map((day) => (
                <div key={day.day} className="relative">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center text-sm font-bold shrink-0">
                        {day.day}
                      </div>
                      <h3 className="font-bold text-stone-800 dark:text-stone-100 text-lg">
                        {t(day.titleEn, day.titleKo)}
                      </h3>
                    </div>
                    <a
                      href={mapsDirUrl(day.stops)}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={t("View day route on Google Maps", "이 날 루트 구글 지도로 보기")}
                      className="shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-700 text-xs font-medium hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                    >
                      🗺️ {t("Day Route", "당일 루트")}
                    </a>
                  </div>

                  <div className="ml-5 pl-8 border-l-2 border-teal-100 dark:border-teal-800 space-y-5">
                    {day.stops.map((stop, idx) => (
                      <div key={idx} className="relative">
                        <div className="absolute -left-[2.15rem] top-1.5 w-3 h-3 rounded-full bg-teal-300 border-2 border-white dark:border-stone-900" />
                        <div className="bg-white dark:bg-stone-800 rounded-xl border border-stone-100 dark:border-stone-700 shadow-sm p-4 group/stop">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <a
                              href={mapsSearchUrl(stop.nameKo)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-semibold text-stone-800 dark:text-stone-100 text-sm hover:text-teal-600 dark:hover:text-teal-400 transition-colors flex items-center gap-1"
                            >
                              {t(stop.nameEn, stop.nameKo)}
                              <span className="opacity-0 group-hover/stop:opacity-100 transition-opacity text-teal-500 text-xs">📍</span>
                            </a>
                            <span className="text-xs text-stone-400 shrink-0 bg-stone-50 dark:bg-stone-700 px-2 py-0.5 rounded-full">
                              ⏱ {stop.duration}
                            </span>
                          </div>
                          <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                            {t(stop.descEn, stop.descKo)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── 후기 섹션 ───────────────────────────────── */}
          <div>
            <h2 className="text-2xl font-bold text-stone-800 dark:text-stone-100 mb-6">
              💬 {t("Reviews", "후기")} {reviews.length > 0 && <span className="text-base font-normal text-stone-400">({reviews.length})</span>}
            </h2>

            <ReviewForm onAdd={addReview} />

            {reviews.length > 0 && (
              <div className="mt-6 space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="bg-white dark:bg-stone-800 rounded-xl border border-stone-100 dark:border-stone-700 p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
                          {review.author.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <span className="font-semibold text-sm text-stone-700 dark:text-stone-200">{review.author}</span>
                          {review.country && (
                            <span className="ml-2 text-xs text-stone-400 bg-stone-50 dark:bg-stone-700 px-2 py-0.5 rounded-full">{review.country}</span>
                          )}
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-amber-400 text-sm">{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</div>
                        <div className="text-xs text-stone-400 mt-0.5">
                          {new Date(review.date).toLocaleDateString("ko-KR")}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">{review.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>

      {/* ── 다른 루트 CTA ─────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-4 mt-16 text-center bg-stone-50 dark:bg-stone-800 rounded-3xl py-12 border border-stone-100 dark:border-stone-700">
        <p className="text-stone-500 dark:text-stone-400 mb-4">
          {t("Looking for more adventures?", "더 많은 여행지를 찾고 계신가요?")}
        </p>
        <Link
          to="/routes"
          className="inline-block px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl transition-colors"
        >
          {t("Browse All Routes →", "모든 루트 보기 →")}
        </Link>
      </div>
    </main>
  );
}
