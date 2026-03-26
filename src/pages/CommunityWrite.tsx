import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createPost } from "../hooks/usePosts";
import type { PostCategory } from "../hooks/usePosts";
import { useAuth } from "../context/AuthContext";
import { useLang } from "../context/LanguageContext";

const CATEGORIES: { value: PostCategory; label: string; en: string }[] = [
  { value: "여행후기",  label: "여행후기",   en: "Travel Review" },
  { value: "질문/답변", label: "질문/답변", en: "Q&A" },
  { value: "정보공유",  label: "정보공유",   en: "Tips & Info" },
  { value: "자유게시판", label: "자유게시판", en: "Free Board" },
];

export default function CommunityWrite() {
  const { t } = useLang();
  const navigate = useNavigate();
  const { user, profile } = useAuth();

  const [category, setCategory] = useState<PostCategory>("자유게시판");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [country, setCountry] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!user) {
    return (
      <main className="pt-20 pb-24 min-h-screen bg-stone-50 dark:bg-stone-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl mb-4">🔒</p>
          <p className="text-stone-600 dark:text-stone-300 mb-4">게시글을 작성하려면 로그인이 필요합니다</p>
          <Link to="/login" className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm transition-colors">
            로그인하기
          </Link>
        </div>
      </main>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim())  { setError(t("Please enter a title.", "제목을 입력해주세요.")); return; }
    if (!content.trim()){ setError(t("Please enter the content.", "내용을 입력해주세요.")); return; }

    setSubmitting(true);
    const post = await createPost({
      category,
      title: title.trim(),
      content: content.trim(),
      author: profile?.nickname ?? "익명",
      country: country.trim() || undefined,
      user_id: user.id,
    });

    if (post) {
      navigate(`/community/${post.id}`);
    } else {
      setError("게시글 등록에 실패했습니다. 다시 시도해주세요.");
      setSubmitting(false);
    }
  };

  return (
    <main className="pt-20 pb-24 min-h-screen bg-stone-50 dark:bg-stone-900">
      <div className="max-w-3xl mx-auto px-4 mt-8">

        {/* 뒤로가기 */}
        <div className="flex items-center gap-2 mb-6">
          <Link to="/community" className="text-sm text-stone-500 dark:text-stone-400 hover:text-teal-600 flex items-center gap-1">
            ← {t("Back to Board", "게시판으로")}
          </Link>
        </div>

        <div className="bg-white dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700 overflow-hidden">
          {/* 헤더 */}
          <div className="px-6 py-5 border-b border-stone-100 dark:border-stone-700 bg-stone-50 dark:bg-stone-700/50">
            <h1 className="text-xl font-bold text-stone-800 dark:text-stone-100">
              ✏️ {t("Write a Post", "새 게시글 작성")}
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="px-6 py-6 space-y-5">

            {/* 작성자 정보 */}
            <div className="flex gap-3 items-center p-3 rounded-lg bg-stone-50 dark:bg-stone-700/50 border border-stone-100 dark:border-stone-700">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
                {profile?.nickname?.charAt(0).toUpperCase() ?? "U"}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-stone-700 dark:text-stone-200">{profile?.nickname}</p>
                <p className="text-xs text-stone-400">로그인된 계정으로 게시됩니다</p>
              </div>
              <input
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder={t("Country (optional)", "국가 (선택)")}
                maxLength={30}
                className="w-36 px-3 py-2 rounded-lg border border-stone-200 dark:border-stone-600 bg-white dark:bg-stone-700 text-sm text-stone-700 dark:text-stone-200 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-teal-300"
              />
            </div>

            {/* 카테고리 */}
            <div>
              <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-1.5">
                {t("Category", "카테고리")} <span className="text-rose-400">*</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => setCategory(cat.value)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                      category === cat.value
                        ? "bg-teal-600 text-white border-teal-600"
                        : "bg-white dark:bg-stone-700 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-600 hover:border-teal-300"
                    }`}
                  >
                    {t(cat.en, cat.label)}
                  </button>
                ))}
              </div>
            </div>

            {/* 제목 */}
            <div>
              <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-1.5">
                {t("Title", "제목")} <span className="text-rose-400">*</span>
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t("Enter post title...", "제목을 입력하세요...")}
                maxLength={100}
                className="w-full px-3 py-2.5 rounded-lg border border-stone-200 dark:border-stone-600 bg-stone-50 dark:bg-stone-700 text-sm text-stone-700 dark:text-stone-200 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-teal-300"
              />
              <div className="text-right text-xs text-stone-400 mt-1">{title.length}/100</div>
            </div>

            {/* 본문 */}
            <div>
              <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-1.5">
                {t("Content", "내용")} <span className="text-rose-400">*</span>
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={t(
                  "Share your travel experience, tips, or questions...",
                  "여행 경험, 팁, 질문 등을 자유롭게 작성해주세요..."
                )}
                rows={16}
                maxLength={5000}
                className="w-full px-3 py-2.5 rounded-lg border border-stone-200 dark:border-stone-600 bg-stone-50 dark:bg-stone-700 text-sm text-stone-700 dark:text-stone-200 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-teal-300 resize-none leading-relaxed"
              />
              <div className="text-right text-xs text-stone-400 mt-1">{content.length}/5000</div>
            </div>

            {/* 에러 */}
            {error && (
              <p className="text-sm text-rose-500 bg-rose-50 dark:bg-rose-900/20 px-4 py-2.5 rounded-lg">
                ⚠️ {error}
              </p>
            )}

            {/* 버튼 */}
            <div className="flex items-center justify-between pt-2">
              <Link
                to="/community"
                className="px-5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-600 text-stone-600 dark:text-stone-300 text-sm font-medium hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors"
              >
                {t("Cancel", "취소")}
              </Link>
              <button
                type="submit"
                disabled={submitting}
                className="flex items-center gap-2 px-7 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-60 text-white font-bold text-sm transition-colors shadow-sm"
              >
                {submitting ? "게시 중..." : `📝 ${t("Publish", "게시하기")}`}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
