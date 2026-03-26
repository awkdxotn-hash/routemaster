import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";
import { getAllPostsAdmin, deletePost } from "../hooks/usePosts";
import { getAllReviews, deleteReview } from "../hooks/useReviews";
import type { Post } from "../hooks/usePosts";
import type { Review } from "../hooks/useReviews";

type Tab = "posts" | "reviews" | "users";

interface Profile {
  id: string;
  nickname: string;
  is_admin: boolean;
  created_at: string;
  email?: string;
}

export default function Admin() {
  const { profile, loading } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("posts");

  const [posts, setPosts] = useState<Post[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [users, setUsers] = useState<Profile[]>([]);
  const [dataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    if (!loading && !profile?.is_admin) navigate("/");
  }, [loading, profile]);

  useEffect(() => {
    if (!profile?.is_admin) return;
    loadTab(tab);
  }, [tab, profile?.is_admin]);

  async function loadTab(t: Tab) {
    setDataLoading(true);
    if (t === "posts") {
      setPosts(await getAllPostsAdmin());
    } else if (t === "reviews") {
      setReviews(await getAllReviews());
    } else {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });
      setUsers(data ?? []);
    }
    setDataLoading(false);
  }

  const handleDeletePost = async (id: string) => {
    if (!confirm("이 게시글을 삭제하시겠습니까?")) return;
    await deletePost(id);
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleDeleteReview = async (id: string) => {
    if (!confirm("이 후기를 삭제하시겠습니까?")) return;
    await deleteReview(id);
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  const handleToggleAdmin = async (userId: string, currentIsAdmin: boolean) => {
    if (!confirm(`관리자 권한을 ${currentIsAdmin ? "제거" : "부여"}하시겠습니까?`)) return;
    await supabase.from("profiles").update({ is_admin: !currentIsAdmin }).eq("id", userId);
    setUsers((prev) => prev.map((u) => u.id === userId ? { ...u, is_admin: !currentIsAdmin } : u));
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-stone-400">로딩 중...</div>;
  }

  if (!profile?.is_admin) return null;

  return (
    <main className="pt-20 pb-20 min-h-screen bg-stone-50 dark:bg-stone-900">
      <div className="max-w-6xl mx-auto px-4 mt-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-stone-800 dark:text-stone-100">관리자 대시보드</h1>
          <p className="text-sm text-stone-400 mt-1">게시글, 후기, 유저를 관리합니다</p>
        </div>

        {/* 탭 */}
        <div className="flex gap-2 mb-6">
          {([
            { key: "posts" as Tab, label: "게시글", count: posts.length },
            { key: "reviews" as Tab, label: "루트 후기", count: reviews.length },
            { key: "users" as Tab, label: "유저", count: users.length },
          ]).map(({ key, label, count }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                tab === key
                  ? "bg-teal-600 text-white"
                  : "bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-600 hover:border-teal-300"
              }`}
            >
              {label} {tab === key && count > 0 && <span className="ml-1 opacity-70">({count})</span>}
            </button>
          ))}
        </div>

        {dataLoading ? (
          <div className="text-center py-20 text-stone-400">불러오는 중...</div>
        ) : (
          <>
            {/* 게시글 탭 */}
            {tab === "posts" && (
              <div className="bg-white dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700 overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-stone-50 dark:bg-stone-700/50 text-xs text-stone-500 dark:text-stone-400">
                    <tr>
                      <th className="px-4 py-3 text-left">제목</th>
                      <th className="px-4 py-3 text-left">카테고리</th>
                      <th className="px-4 py-3 text-left">작성자</th>
                      <th className="px-4 py-3 text-center">조회/추천</th>
                      <th className="px-4 py-3 text-left">작성일</th>
                      <th className="px-4 py-3 text-center">관리</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 dark:divide-stone-700">
                    {posts.length === 0 ? (
                      <tr><td colSpan={6} className="text-center py-10 text-stone-400">게시글 없음</td></tr>
                    ) : posts.map((p) => (
                      <tr key={p.id} className="hover:bg-stone-50 dark:hover:bg-stone-700/30">
                        <td className="px-4 py-3 max-w-xs">
                          <a href={`/community/${p.id}`} className="text-stone-800 dark:text-stone-100 hover:text-teal-600 truncate block font-medium">
                            {p.title}
                          </a>
                        </td>
                        <td className="px-4 py-3 text-stone-500 dark:text-stone-400 whitespace-nowrap">{p.category}</td>
                        <td className="px-4 py-3 text-stone-600 dark:text-stone-300 whitespace-nowrap">{p.author}</td>
                        <td className="px-4 py-3 text-center text-stone-400 whitespace-nowrap">👁 {p.views} · ❤️ {p.likes}</td>
                        <td className="px-4 py-3 text-stone-400 whitespace-nowrap text-xs">
                          {new Date(p.date).toLocaleDateString("ko-KR")}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={() => handleDeletePost(p.id)}
                            className="px-3 py-1 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 text-xs font-medium transition-colors"
                          >
                            삭제
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* 후기 탭 */}
            {tab === "reviews" && (
              <div className="bg-white dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700 overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-stone-50 dark:bg-stone-700/50 text-xs text-stone-500 dark:text-stone-400">
                    <tr>
                      <th className="px-4 py-3 text-left">루트 ID</th>
                      <th className="px-4 py-3 text-left">작성자</th>
                      <th className="px-4 py-3 text-center">별점</th>
                      <th className="px-4 py-3 text-left">내용</th>
                      <th className="px-4 py-3 text-left">작성일</th>
                      <th className="px-4 py-3 text-center">관리</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 dark:divide-stone-700">
                    {reviews.length === 0 ? (
                      <tr><td colSpan={6} className="text-center py-10 text-stone-400">후기 없음</td></tr>
                    ) : reviews.map((r) => (
                      <tr key={r.id} className="hover:bg-stone-50 dark:hover:bg-stone-700/30">
                        <td className="px-4 py-3 text-stone-500 dark:text-stone-400 text-xs font-mono">
                          <a href={`/routes/${r.routeId}`} className="hover:text-teal-600">{r.routeId}</a>
                        </td>
                        <td className="px-4 py-3 text-stone-600 dark:text-stone-300 whitespace-nowrap">
                          {r.author}{r.country && <span className="text-stone-400 ml-1">({r.country})</span>}
                        </td>
                        <td className="px-4 py-3 text-center text-amber-400">{"★".repeat(r.rating)}</td>
                        <td className="px-4 py-3 text-stone-600 dark:text-stone-300 max-w-xs">
                          <span className="truncate block">{r.text}</span>
                        </td>
                        <td className="px-4 py-3 text-stone-400 whitespace-nowrap text-xs">
                          {new Date(r.date).toLocaleDateString("ko-KR")}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={() => handleDeleteReview(r.id)}
                            className="px-3 py-1 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 text-xs font-medium transition-colors"
                          >
                            삭제
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* 유저 탭 */}
            {tab === "users" && (
              <div className="bg-white dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700 overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-stone-50 dark:bg-stone-700/50 text-xs text-stone-500 dark:text-stone-400">
                    <tr>
                      <th className="px-4 py-3 text-left">닉네임</th>
                      <th className="px-4 py-3 text-left">가입일</th>
                      <th className="px-4 py-3 text-center">관리자</th>
                      <th className="px-4 py-3 text-center">관리</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 dark:divide-stone-700">
                    {users.length === 0 ? (
                      <tr><td colSpan={4} className="text-center py-10 text-stone-400">유저 없음</td></tr>
                    ) : users.map((u) => (
                      <tr key={u.id} className="hover:bg-stone-50 dark:hover:bg-stone-700/30">
                        <td className="px-4 py-3 font-medium text-stone-800 dark:text-stone-100">{u.nickname}</td>
                        <td className="px-4 py-3 text-stone-400 text-xs">
                          {new Date(u.created_at).toLocaleDateString("ko-KR")}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {u.is_admin ? (
                            <span className="px-2 py-0.5 rounded-full bg-teal-100 text-teal-700 text-xs font-medium">관리자</span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full bg-stone-100 text-stone-400 text-xs">일반</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={() => handleToggleAdmin(u.id, u.is_admin)}
                            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                              u.is_admin
                                ? "bg-red-50 hover:bg-red-100 text-red-500"
                                : "bg-teal-50 hover:bg-teal-100 text-teal-600"
                            }`}
                          >
                            {u.is_admin ? "권한 제거" : "관리자 지정"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
