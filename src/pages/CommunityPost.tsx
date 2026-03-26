import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { usePost } from "../hooks/usePosts";
import { useAuth } from "../context/AuthContext";
import { useLang } from "../context/LanguageContext";

const CATEGORY_COLOR: Record<string, string> = {
  "여행후기":  "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300",
  "질문/답변": "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  "정보공유":  "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  "자유게시판":"bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
};

const CATEGORY_EN: Record<string, string> = {
  "여행후기": "Travel Review",
  "질문/답변": "Q&A",
  "정보공유": "Tips & Info",
  "자유게시판": "Free Board",
};

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "방금 전";
  if (m < 60) return `${m}분 전`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}시간 전`;
  return new Date(iso).toLocaleDateString("ko-KR", { year: "numeric", month: "short", day: "numeric" });
}

export default function CommunityPost() {
  const { id } = useParams<{ id: string }>();
  const { t } = useLang();
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const { post, liked, loading, toggleLike, addComment } = usePost(id ?? "");

  const [commentCountry, setCommentCountry] = useState("");
  const [commentText, setCommentText] = useState("");
  const [commentSubmitted, setCommentSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !commentText.trim()) return;
    setSubmitting(true);
    await addComment(commentText.trim(), profile?.nickname ?? "익명", commentCountry.trim() || undefined);
    setCommentCountry("");
    setCommentText("");
    setCommentSubmitted(true);
    setSubmitting(false);
    setTimeout(() => setCommentSubmitted(false), 3000);
  };

  if (loading) {
    return (
      <main className="pt-24 text-center py-40">
        <p className="text-stone-400 text-sm">불러오는 중...</p>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="pt-24 text-center py-40">
        <p className="text-5xl mb-4">📭</p>
        <p className="text-xl font-bold text-stone-700 dark:text-stone-200">
          {t("Post not found.", "게시글을 찾을 수 없습니다.")}
        </p>
        <Link to="/community" className="mt-6 inline-block text-teal-600 font-medium hover:underline">
          ← {t("Back to Board", "게시판으로")}
        </Link>
      </main>
    );
  }

  return (
    <main className="pt-20 pb-24 min-h-screen bg-stone-50 dark:bg-stone-900">
      <div className="max-w-3xl mx-auto px-4 mt-8">

        {/* 뒤로가기 */}
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-stone-500 dark:text-stone-400 hover:text-teal-600 dark:hover:text-teal-400 flex items-center gap-1"
          >
            ← {t("Back", "목록으로")}
          </button>
          <span className="text-stone-300 dark:text-stone-600">|</span>
          <Link to="/community" className="text-sm text-stone-400 hover:text-teal-500">
            {t("Community Board", "커뮤니티 게시판")}
          </Link>
        </div>

        {/* ── 게시글 본문 ─────────────────────────────── */}
        <article className="bg-white dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700 overflow-hidden">

          {/* 헤더 */}
          <div className="px-6 pt-6 pb-4 border-b border-stone-100 dark:border-stone-700">
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${CATEGORY_COLOR[post.category]}`}>
                {t(CATEGORY_EN[post.category] ?? post.category, post.category)}
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-stone-800 dark:text-stone-100 leading-snug mb-4">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-stone-500 dark:text-stone-400">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center text-white text-xs font-bold">
                  {post.author.charAt(0).toUpperCase()}
                </div>
                <span className="font-semibold text-stone-700 dark:text-stone-200">{post.author}</span>
                {post.country && (
                  <span className="text-xs bg-stone-100 dark:bg-stone-700 px-2 py-0.5 rounded-full">{post.country}</span>
                )}
              </div>
              <span>{timeAgo(post.date)}</span>
              <span>👁 {post.views}</span>
              <span>💬 {post.comments.length}</span>
            </div>
          </div>

          {/* 본문 */}
          <div className="px-6 py-6">
            <div className="prose prose-stone dark:prose-invert max-w-none text-sm leading-relaxed text-stone-700 dark:text-stone-300 whitespace-pre-wrap">
              {post.content}
            </div>
          </div>

          {/* 추천 버튼 */}
          <div className="px-6 pb-6 flex justify-center">
            <button
              onClick={toggleLike}
              disabled={!user}
              title={!user ? "로그인이 필요합니다" : undefined}
              className={`flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-sm border-2 transition-all duration-150 ${
                liked
                  ? "bg-rose-500 border-rose-500 text-white shadow-md"
                  : "bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-600 text-stone-600 dark:text-stone-300 hover:border-rose-300 hover:text-rose-500 disabled:opacity-50 disabled:cursor-not-allowed"
              }`}
            >
              {liked ? "❤️" : "🤍"} {t("Like", "추천")}
              <span className={`font-bold ${liked ? "text-white" : "text-rose-400"}`}>{post.likes}</span>
            </button>
          </div>
        </article>

        {/* ── 댓글 섹션 ───────────────────────────────── */}
        <section className="mt-6">
          <h2 className="font-bold text-stone-700 dark:text-stone-200 mb-4">
            💬 {t("Comments", "댓글")} {post.comments.length > 0 && <span className="font-normal text-stone-400">({post.comments.length})</span>}
          </h2>

          {/* 댓글 목록 */}
          {post.comments.length > 0 && (
            <div className="space-y-3 mb-5">
              {post.comments.map((comment) => (
                <div
                  key={comment.id}
                  className="bg-white dark:bg-stone-800 rounded-xl border border-stone-100 dark:border-stone-700 px-5 py-4"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-xs font-bold">
                        {comment.author.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-semibold text-sm text-stone-700 dark:text-stone-200">{comment.author}</span>
                      {comment.country && (
                        <span className="text-xs bg-stone-100 dark:bg-stone-700 text-stone-500 dark:text-stone-400 px-2 py-0.5 rounded-full">
                          {comment.country}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-stone-400">{timeAgo(comment.date)}</span>
                  </div>
                  <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">{comment.content}</p>
                </div>
              ))}
            </div>
          )}

          {/* 댓글 작성 폼 */}
          <div className="bg-white dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700 p-5">
            {user ? (
              <>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center text-white text-xs font-bold">
                    {profile?.nickname?.charAt(0).toUpperCase() ?? "U"}
                  </div>
                  <span className="text-sm font-semibold text-stone-700 dark:text-stone-200">{profile?.nickname}</span>
                  <span className="text-xs text-stone-400">으로 댓글 달기</span>
                </div>
                <form onSubmit={handleCommentSubmit} className="space-y-3">
                  <input
                    value={commentCountry}
                    onChange={(e) => setCommentCountry(e.target.value)}
                    placeholder={t("Country (optional)", "국가 (선택)")}
                    maxLength={30}
                    className="w-36 px-3 py-2 rounded-lg border border-stone-200 dark:border-stone-600 bg-stone-50 dark:bg-stone-700 text-sm text-stone-700 dark:text-stone-200 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-teal-300"
                  />
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder={t("Leave a comment...", "댓글을 입력하세요...")}
                    rows={3}
                    maxLength={500}
                    className="w-full px-3 py-2 rounded-lg border border-stone-200 dark:border-stone-600 bg-stone-50 dark:bg-stone-700 text-sm text-stone-700 dark:text-stone-200 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-teal-300 resize-none"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-stone-400">{commentText.length}/500</span>
                    <button
                      type="submit"
                      disabled={!commentText.trim() || submitting}
                      className="px-5 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors"
                    >
                      {commentSubmitted ? "✓ " + t("Posted!", "등록됨!") : t("Comment", "댓글 등록")}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center py-4">
                <p className="text-sm text-stone-500 dark:text-stone-400 mb-3">댓글을 작성하려면 로그인이 필요합니다</p>
                <Link
                  to="/login"
                  className="inline-block px-5 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold transition-colors"
                >
                  로그인
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* 목록으로 */}
        <div className="mt-8 text-center">
          <Link
            to="/community"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-stone-200 dark:border-stone-600 text-stone-600 dark:text-stone-300 text-sm font-medium hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
          >
            ← {t("Back to Board", "목록으로")}
          </Link>
        </div>
      </div>
    </main>
  );
}
