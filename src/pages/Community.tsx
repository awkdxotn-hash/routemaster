import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePosts } from "../hooks/usePosts";
import type { PostCategory } from "../hooks/usePosts";
import { useLang } from "../context/LanguageContext";

const CATEGORIES: { value: PostCategory | "전체"; label: string; en: string; color: string }[] = [
  { value: "전체",     label: "전체",      en: "All",          color: "bg-stone-100 text-stone-600 dark:bg-stone-700 dark:text-stone-300" },
  { value: "여행후기", label: "여행후기",  en: "Travel Review", color: "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300" },
  { value: "질문/답변", label: "질문/답변", en: "Q&A",           color: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300" },
  { value: "정보공유", label: "정보공유",  en: "Tips & Info",  color: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300" },
  { value: "자유게시판", label: "자유게시판", en: "Free Board",  color: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300" },
];

function categoryStyle(cat: PostCategory) {
  return CATEGORIES.find((c) => c.value === cat)?.color ?? "bg-stone-100 text-stone-600";
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "방금 전";
  if (m < 60) return `${m}분 전`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}시간 전`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d}일 전`;
  return new Date(iso).toLocaleDateString("ko-KR", { month: "short", day: "numeric" });
}

export default function Community() {
  const { t } = useLang();
  const navigate = useNavigate();
  const [selectedCat, setSelectedCat] = useState<PostCategory | "전체">("전체");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"latest" | "popular" | "views">("latest");

  const { posts: allPosts, loading } = usePosts();

  const filtered = useMemo(() => {
    let posts = allPosts.filter((p) => {
      if (selectedCat !== "전체" && p.category !== selectedCat) return false;
      if (search) {
        const q = search.toLowerCase();
        return p.title.toLowerCase().includes(q) || p.content.toLowerCase().includes(q) || p.author.toLowerCase().includes(q);
      }
      return true;
    });
    if (sortBy === "popular") posts = [...posts].sort((a, b) => b.likes - a.likes);
    else if (sortBy === "views") posts = [...posts].sort((a, b) => b.views - a.views);
    else posts = [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return posts;
  }, [selectedCat, search, sortBy, allPosts]);

  // 인기 게시글 top 5
  const hotPosts = [...allPosts].sort((a, b) => b.likes - a.likes).slice(0, 5);
  // 최근 게시글 top 5
  const recentPosts = [...allPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

  const totalComments = allPosts.reduce((s, p) => s + p.comments.length, 0);
  const totalLikes = allPosts.reduce((s, p) => s + p.likes, 0);

  return (
    <main className="pt-20 pb-20 min-h-screen bg-stone-50 dark:bg-stone-900">

      {/* ── 게시판 헤더 ─────────────────────────────── */}
      <div className="bg-gradient-to-r from-teal-700 to-emerald-700 text-white py-10 px-4">
        <div className="max-w-6xl mx-auto flex items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold mb-1">
              {t("Community Board", "커뮤니티 게시판")} 💬
            </h1>
            <p className="text-teal-200 text-sm">
              {t("Share travel tips, reviews, and questions with fellow travelers", "여행 팁, 후기, 질문을 자유롭게 나눠보세요")}
            </p>
          </div>
          <button
            onClick={() => navigate("/community/write")}
            className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-teal-700 font-bold text-sm hover:bg-teal-50 transition-colors shadow"
          >
            ✏️ {t("Write Post", "글쓰기")}
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-6 flex gap-6">

        {/* ── 메인 게시판 ─────────────────────────────── */}
        <div className="flex-1 min-w-0">

          {/* 카테고리 탭 */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCat(cat.value)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  selectedCat === cat.value
                    ? "bg-teal-600 text-white shadow-sm"
                    : "bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-600 hover:border-teal-300"
                }`}
              >
                {t(cat.en, cat.label)}
              </button>
            ))}
          </div>

          {/* 검색 + 정렬 */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative flex-1 max-w-xs">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-sm">🔍</span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t("Search posts...", "게시글 검색...")}
                className="w-full pl-8 pr-3 py-2 rounded-lg border border-stone-200 dark:border-stone-600 bg-white dark:bg-stone-800 text-sm text-stone-700 dark:text-stone-200 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-teal-300"
              />
            </div>
            <div className="flex gap-1 ml-auto">
              {(["latest", "popular", "views"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSortBy(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                    sortBy === s
                      ? "bg-teal-600 text-white border-teal-600"
                      : "bg-white dark:bg-stone-800 text-stone-500 dark:text-stone-400 border-stone-200 dark:border-stone-600 hover:border-teal-300"
                  }`}
                >
                  {s === "latest" ? t("Latest", "최신") : s === "popular" ? t("Popular", "인기") : t("Views", "조회순")}
                </button>
              ))}
            </div>
          </div>

          {/* 게시글 목록 */}
          <div className="bg-white dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700 overflow-hidden">
            {/* 테이블 헤더 (데스크탑) */}
            <div className="hidden md:grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 px-5 py-3 bg-stone-50 dark:bg-stone-700/50 text-xs font-semibold text-stone-500 dark:text-stone-400 border-b border-stone-100 dark:border-stone-700">
              <span>{t("Category", "분류")}</span>
              <span>{t("Title", "제목")}</span>
              <span className="text-center">{t("Author", "작성자")}</span>
              <span className="text-center">{t("Views", "조회")}</span>
              <span className="text-center">{t("Likes", "추천")}</span>
            </div>

            {loading ? (
              <div className="py-20 text-center text-stone-400">
                <p className="text-sm">불러오는 중...</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="py-20 text-center text-stone-400">
                <p className="text-3xl mb-3">📭</p>
                <p className="text-sm">{t("No posts found.", "게시글이 없습니다.")}</p>
              </div>
            ) : (
              <ul className="divide-y divide-stone-100 dark:divide-stone-700">
                {filtered.map((post) => (
                  <li key={post.id}>
                    {/* 데스크탑 행 */}
                    <Link
                      to={`/community/${post.id}`}
                      className="hidden md:grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 px-5 py-3.5 items-center hover:bg-teal-50/50 dark:hover:bg-teal-900/10 transition-colors"
                    >
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap ${categoryStyle(post.category)}`}>
                        {t(CATEGORIES.find(c => c.value === post.category)?.en ?? "", post.category)}
                      </span>
                      <div className="min-w-0">
                        <span className="font-medium text-sm text-stone-800 dark:text-stone-100 hover:text-teal-600 dark:hover:text-teal-400 truncate block">
                          {post.title}
                          {post.comments.length > 0 && (
                            <span className="ml-2 text-teal-500 text-xs">[{post.comments.length}]</span>
                          )}
                        </span>
                        <span className="text-xs text-stone-400">{timeAgo(post.date)}</span>
                      </div>
                      <div className="text-center text-xs text-stone-500 dark:text-stone-400 whitespace-nowrap">
                        <span className="font-medium text-stone-700 dark:text-stone-200">{post.author}</span>
                        {post.country && <span className="text-stone-400 ml-1">({post.country})</span>}
                      </div>
                      <span className="text-center text-xs text-stone-400 w-12">👁 {post.views}</span>
                      <span className="text-center text-xs text-rose-400 w-10">❤️ {post.likes}</span>
                    </Link>

                    {/* 모바일 카드 */}
                    <Link
                      to={`/community/${post.id}`}
                      className="md:hidden flex flex-col gap-1.5 px-4 py-3.5 hover:bg-teal-50/50 dark:hover:bg-teal-900/10 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryStyle(post.category)}`}>
                          {post.category}
                        </span>
                        <span className="text-xs text-stone-400 ml-auto">{timeAgo(post.date)}</span>
                      </div>
                      <p className="font-medium text-sm text-stone-800 dark:text-stone-100 leading-snug">
                        {post.title}
                        {post.comments.length > 0 && (
                          <span className="ml-1.5 text-teal-500 text-xs">[{post.comments.length}]</span>
                        )}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-stone-400">
                        <span>{post.author}{post.country && ` (${post.country})`}</span>
                        <span>👁 {post.views}</span>
                        <span>❤️ {post.likes}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* 글쓰기 버튼 (하단) */}
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => navigate("/community/write")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm transition-colors shadow-sm"
            >
              ✏️ {t("Write Post", "글쓰기")}
            </button>
          </div>
        </div>

        {/* ── 우측 사이드바 ────────────────────────────── */}
        <aside className="hidden lg:flex flex-col gap-5 w-60 shrink-0">

          {/* 통계 */}
          <div className="bg-white dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700 p-4">
            <h3 className="font-bold text-stone-700 dark:text-stone-200 text-sm mb-3">
              📊 {t("Stats", "현황")}
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-stone-500 dark:text-stone-400">{t("Posts", "게시글")}</span>
                <span className="font-bold text-stone-700 dark:text-stone-200">{allPosts.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500 dark:text-stone-400">{t("Comments", "댓글")}</span>
                <span className="font-bold text-stone-700 dark:text-stone-200">{totalComments}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500 dark:text-stone-400">{t("Likes", "좋아요")}</span>
                <span className="font-bold text-rose-500">{totalLikes}</span>
              </div>
            </div>
          </div>

          {/* 인기 게시글 */}
          <div className="bg-white dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700 p-4">
            <h3 className="font-bold text-stone-700 dark:text-stone-200 text-sm mb-3">
              🔥 {t("Hot Posts", "인기 게시글")}
            </h3>
            <ul className="space-y-2.5">
              {hotPosts.map((p, i) => (
                <li key={p.id} className="flex gap-2">
                  <span className={`shrink-0 w-5 h-5 rounded flex items-center justify-center text-xs font-bold ${
                    i === 0 ? "bg-rose-100 text-rose-600" :
                    i === 1 ? "bg-orange-100 text-orange-600" :
                    i === 2 ? "bg-amber-100 text-amber-600" :
                    "bg-stone-100 text-stone-500 dark:bg-stone-700 dark:text-stone-400"
                  }`}>{i + 1}</span>
                  <Link
                    to={`/community/${p.id}`}
                    className="text-xs text-stone-700 dark:text-stone-300 hover:text-teal-600 dark:hover:text-teal-400 leading-snug line-clamp-2"
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 최근 게시글 */}
          <div className="bg-white dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700 p-4">
            <h3 className="font-bold text-stone-700 dark:text-stone-200 text-sm mb-3">
              🕐 {t("Recent Posts", "최근 게시글")}
            </h3>
            <ul className="space-y-2.5">
              {recentPosts.map((p) => (
                <li key={p.id}>
                  <Link
                    to={`/community/${p.id}`}
                    className="text-xs text-stone-700 dark:text-stone-300 hover:text-teal-600 dark:hover:text-teal-400 leading-snug line-clamp-2 block"
                  >
                    {p.title}
                  </Link>
                  <span className="text-xs text-stone-400">{timeAgo(p.date)}</span>
                </li>
              ))}
            </ul>
          </div>

        </aside>
      </div>
    </main>
  );
}
