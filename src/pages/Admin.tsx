import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";
import { getAllPostsAdmin, deletePost } from "../hooks/usePosts";
import { getAllReviews, deleteReview } from "../hooks/useReviews";
import { routes } from "../data/routes";
import type { Post } from "../hooks/usePosts";
import type { Review } from "../hooks/useReviews";

type Tab = "stats" | "picks" | "notices" | "posts" | "reviews" | "users";

interface Profile {
  id: string;
  nickname: string;
  is_admin: boolean;
  is_banned: boolean;
  created_at: string;
}

interface Notice {
  id: string;
  title: string;
  content: string;
  is_pinned: boolean;
  created_at: string;
}

interface Stats {
  users: number;
  posts: number;
  reviews: number;
  routeLikes: number;
  postLikes: number;
}

const TABS: { key: Tab; label: string; icon: string }[] = [
  { key: "stats",   label: "통계",       icon: "📊" },
  { key: "picks",   label: "관리자 픽",   icon: "⭐" },
  { key: "notices", label: "공지사항",    icon: "📢" },
  { key: "posts",   label: "게시글",      icon: "📝" },
  { key: "reviews", label: "루트 후기",   icon: "💬" },
  { key: "users",   label: "유저",        icon: "👥" },
];

export default function Admin() {
  const { profile, loading } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("stats");
  const [dataLoading, setDataLoading] = useState(false);

  const [stats, setStats] = useState<Stats>({ users: 0, posts: 0, reviews: 0, routeLikes: 0, postLikes: 0 });
  const [adminPicks, setAdminPicks] = useState<Set<string>>(new Set());
  const [notices, setNotices] = useState<Notice[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [users, setUsers] = useState<Profile[]>([]);

  // 공지사항 폼
  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeContent, setNoticeContent] = useState("");
  const [noticePinned, setNoticePinned] = useState(false);

  useEffect(() => {
    if (!loading && !profile?.is_admin) navigate("/");
  }, [loading, profile]);

  useEffect(() => {
    if (!profile?.is_admin) return;
    loadTab(tab);
  }, [tab, profile?.is_admin]);

  async function loadTab(t: Tab) {
    setDataLoading(true);
    if (t === "stats") {
      const [u, p, r, rl, pl] = await Promise.all([
        supabase.from("profiles").select("*", { count: "exact", head: true }),
        supabase.from("posts").select("*", { count: "exact", head: true }),
        supabase.from("route_reviews").select("*", { count: "exact", head: true }),
        supabase.from("route_likes").select("*", { count: "exact", head: true }),
        supabase.from("post_likes").select("*", { count: "exact", head: true }),
      ]);
      setStats({ users: u.count ?? 0, posts: p.count ?? 0, reviews: r.count ?? 0, routeLikes: rl.count ?? 0, postLikes: pl.count ?? 0 });
    } else if (t === "picks") {
      const { data } = await supabase.from("admin_picks").select("route_id");
      setAdminPicks(new Set((data ?? []).map((r: { route_id: string }) => r.route_id)));
    } else if (t === "notices") {
      const { data } = await supabase.from("notices").select("*").order("is_pinned", { ascending: false }).order("created_at", { ascending: false });
      setNotices(data ?? []);
    } else if (t === "posts") {
      setPosts(await getAllPostsAdmin());
    } else if (t === "reviews") {
      setReviews(await getAllReviews());
    } else {
      const { data } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
      setUsers(data ?? []);
    }
    setDataLoading(false);
  }

  // 관리자 픽 토글
  const handleTogglePick = async (routeId: string) => {
    if (adminPicks.has(routeId)) {
      await supabase.from("admin_picks").delete().eq("route_id", routeId);
      setAdminPicks((prev) => { const s = new Set(prev); s.delete(routeId); return s; });
    } else {
      await supabase.from("admin_picks").insert({ route_id: routeId });
      setAdminPicks((prev) => new Set([...prev, routeId]));
    }
  };

  // 공지사항 작성
  const handleAddNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeTitle.trim() || !noticeContent.trim()) return;
    const { data } = await supabase.from("notices").insert({ title: noticeTitle.trim(), content: noticeContent.trim(), is_pinned: noticePinned }).select().single();
    if (data) setNotices((prev) => [data, ...prev]);
    setNoticeTitle(""); setNoticeContent(""); setNoticePinned(false);
  };

  // 공지사항 삭제
  const handleDeleteNotice = async (id: string) => {
    if (!confirm("공지사항을 삭제하시겠습니까?")) return;
    await supabase.from("notices").delete().eq("id", id);
    setNotices((prev) => prev.filter((n) => n.id !== id));
  };

  // 게시글 숨김/공개
  const handleToggleHide = async (id: string, isHidden: boolean) => {
    await supabase.from("posts").update({ is_hidden: !isHidden }).eq("id", id);
    setPosts((prev) => prev.map((p) => p.id === id ? { ...p, is_hidden: !isHidden } : p));
  };

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

  const handleToggleAdmin = async (userId: string, isAdmin: boolean) => {
    if (!confirm(`관리자 권한을 ${isAdmin ? "제거" : "부여"}하시겠습니까?`)) return;
    await supabase.from("profiles").update({ is_admin: !isAdmin }).eq("id", userId);
    setUsers((prev) => prev.map((u) => u.id === userId ? { ...u, is_admin: !isAdmin } : u));
  };

  const handleToggleBan = async (userId: string, isBanned: boolean) => {
    if (!confirm(`유저를 ${isBanned ? "차단 해제" : "차단"}하시겠습니까?`)) return;
    await supabase.from("profiles").update({ is_banned: !isBanned }).eq("id", userId);
    setUsers((prev) => prev.map((u) => u.id === userId ? { ...u, is_banned: !isBanned } : u));
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-stone-400">로딩 중...</div>;
  if (!profile?.is_admin) return null;

  return (
    <main className="pt-20 pb-20 min-h-screen bg-stone-50 dark:bg-stone-900">
      <div className="max-w-6xl mx-auto px-4 mt-6">

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-stone-800 dark:text-stone-100">⚙️ 관리자 대시보드</h1>
          <p className="text-sm text-stone-400 mt-1">사이트 전체를 관리합니다</p>
        </div>

        {/* 탭 */}
        <div className="flex flex-wrap gap-2 mb-6">
          {TABS.map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                tab === key
                  ? "bg-teal-600 text-white"
                  : "bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-600 hover:border-teal-300"
              }`}
            >
              {icon} {label}
            </button>
          ))}
        </div>

        {dataLoading ? (
          <div className="text-center py-20 text-stone-400">불러오는 중...</div>
        ) : (
          <>
            {/* ── 통계 ── */}
            {tab === "stats" && (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  { label: "전체 유저", value: stats.users, icon: "👥", color: "bg-blue-50 text-blue-600" },
                  { label: "게시글", value: stats.posts, icon: "📝", color: "bg-purple-50 text-purple-600" },
                  { label: "루트 후기", value: stats.reviews, icon: "💬", color: "bg-teal-50 text-teal-600" },
                  { label: "루트 좋아요", value: stats.routeLikes, icon: "❤️", color: "bg-rose-50 text-rose-600" },
                  { label: "게시글 좋아요", value: stats.postLikes, icon: "👍", color: "bg-amber-50 text-amber-600" },
                ].map(({ label, value, icon, color }) => (
                  <div key={label} className={`rounded-xl p-5 ${color} border border-current/10`}>
                    <p className="text-2xl mb-1">{icon}</p>
                    <p className="text-3xl font-bold">{value.toLocaleString()}</p>
                    <p className="text-xs font-medium mt-1 opacity-70">{label}</p>
                  </div>
                ))}
              </div>
            )}

            {/* ── 관리자 픽 ── */}
            {tab === "picks" && (
              <div>
                <p className="text-sm text-stone-500 dark:text-stone-400 mb-4">
                  ⭐ 선택된 루트는 루트 목록에서 <strong>관리자 픽</strong>으로 표시됩니다. ({adminPicks.size}개 선택됨)
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {routes.map((route) => {
                    const isPick = adminPicks.has(route.id);
                    return (
                      <button
                        key={route.id}
                        onClick={() => handleTogglePick(route.id)}
                        className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                          isPick
                            ? "border-amber-400 bg-amber-50 dark:bg-amber-900/20"
                            : "border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:border-amber-300"
                        }`}
                      >
                        <span className="text-2xl shrink-0">{route.coverEmoji}</span>
                        <div className="flex-1 min-w-0">
                          <p className={`font-semibold text-sm truncate ${isPick ? "text-amber-700 dark:text-amber-400" : "text-stone-700 dark:text-stone-200"}`}>
                            {route.titleKo}
                          </p>
                          <p className="text-xs text-stone-400">{route.regionKo}</p>
                        </div>
                        <span className="text-lg shrink-0">{isPick ? "⭐" : "☆"}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── 공지사항 ── */}
            {tab === "notices" && (
              <div className="space-y-4">
                {/* 작성 폼 */}
                <div className="bg-white dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700 p-5">
                  <h3 className="font-semibold text-stone-800 dark:text-stone-100 mb-4">새 공지사항 작성</h3>
                  <form onSubmit={handleAddNotice} className="space-y-3">
                    <input
                      value={noticeTitle}
                      onChange={(e) => setNoticeTitle(e.target.value)}
                      placeholder="공지 제목"
                      maxLength={100}
                      className="w-full px-3 py-2.5 rounded-lg border border-stone-200 dark:border-stone-600 bg-stone-50 dark:bg-stone-700 text-sm text-stone-700 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-teal-300"
                    />
                    <textarea
                      value={noticeContent}
                      onChange={(e) => setNoticeContent(e.target.value)}
                      placeholder="공지 내용"
                      rows={4}
                      className="w-full px-3 py-2.5 rounded-lg border border-stone-200 dark:border-stone-600 bg-stone-50 dark:bg-stone-700 text-sm text-stone-700 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-teal-300 resize-none"
                    />
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 text-sm text-stone-600 dark:text-stone-300 cursor-pointer">
                        <input type="checkbox" checked={noticePinned} onChange={(e) => setNoticePinned(e.target.checked)} className="rounded" />
                        📌 상단 고정
                      </label>
                      <button type="submit" className="px-5 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold transition-colors">
                        등록
                      </button>
                    </div>
                  </form>
                </div>

                {/* 목록 */}
                <div className="space-y-2">
                  {notices.length === 0 ? (
                    <p className="text-center py-10 text-stone-400 text-sm">공지사항이 없습니다</p>
                  ) : notices.map((n) => (
                    <div key={n.id} className="bg-white dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            {n.is_pinned && <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">📌 고정</span>}
                            <p className="font-semibold text-stone-800 dark:text-stone-100 text-sm">{n.title}</p>
                          </div>
                          <p className="text-xs text-stone-500 dark:text-stone-400 whitespace-pre-wrap">{n.content}</p>
                          <p className="text-xs text-stone-300 mt-2">{new Date(n.created_at).toLocaleDateString("ko-KR")}</p>
                        </div>
                        <button onClick={() => handleDeleteNotice(n.id)} className="px-3 py-1 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 text-xs font-medium shrink-0">삭제</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── 게시글 ── */}
            {tab === "posts" && (
              <div className="bg-white dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700 overflow-x-auto">
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
                      <tr key={p.id} className={`hover:bg-stone-50 dark:hover:bg-stone-700/30 ${(p as Post & { is_hidden?: boolean }).is_hidden ? "opacity-40" : ""}`}>
                        <td className="px-4 py-3 max-w-xs">
                          <a href={`/community/${p.id}`} className="text-stone-800 dark:text-stone-100 hover:text-teal-600 truncate block font-medium">{p.title}</a>
                        </td>
                        <td className="px-4 py-3 text-stone-500 whitespace-nowrap">{p.category}</td>
                        <td className="px-4 py-3 text-stone-600 dark:text-stone-300 whitespace-nowrap">{p.author}</td>
                        <td className="px-4 py-3 text-center text-stone-400 whitespace-nowrap">👁 {p.views} · ❤️ {p.likes}</td>
                        <td className="px-4 py-3 text-stone-400 whitespace-nowrap text-xs">{new Date(p.date).toLocaleDateString("ko-KR")}</td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex items-center gap-1 justify-center">
                            <button
                              onClick={() => handleToggleHide(p.id, !!(p as Post & { is_hidden?: boolean }).is_hidden)}
                              className="px-3 py-1 rounded-lg bg-stone-50 hover:bg-stone-100 text-stone-500 text-xs font-medium transition-colors"
                            >
                              {(p as Post & { is_hidden?: boolean }).is_hidden ? "공개" : "숨김"}
                            </button>
                            <button onClick={() => handleDeletePost(p.id)} className="px-3 py-1 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 text-xs font-medium transition-colors">삭제</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* ── 후기 ── */}
            {tab === "reviews" && (
              <div className="bg-white dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-stone-50 dark:bg-stone-700/50 text-xs text-stone-500 dark:text-stone-400">
                    <tr>
                      <th className="px-4 py-3 text-left">루트</th>
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
                        <td className="px-4 py-3 text-xs font-mono text-stone-400">
                          <a href={`/routes/${r.routeId}`} className="hover:text-teal-600">{r.routeId}</a>
                        </td>
                        <td className="px-4 py-3 text-stone-600 dark:text-stone-300 whitespace-nowrap">
                          {r.author}{r.country && <span className="text-stone-400 ml-1">({r.country})</span>}
                        </td>
                        <td className="px-4 py-3 text-center text-amber-400">{"★".repeat(r.rating)}</td>
                        <td className="px-4 py-3 text-stone-600 dark:text-stone-300 max-w-xs"><span className="truncate block">{r.text}</span></td>
                        <td className="px-4 py-3 text-stone-400 whitespace-nowrap text-xs">{new Date(r.date).toLocaleDateString("ko-KR")}</td>
                        <td className="px-4 py-3 text-center">
                          <button onClick={() => handleDeleteReview(r.id)} className="px-3 py-1 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 text-xs font-medium transition-colors">삭제</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* ── 유저 ── */}
            {tab === "users" && (
              <div className="bg-white dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-stone-50 dark:bg-stone-700/50 text-xs text-stone-500 dark:text-stone-400">
                    <tr>
                      <th className="px-4 py-3 text-left">닉네임</th>
                      <th className="px-4 py-3 text-left">가입일</th>
                      <th className="px-4 py-3 text-center">상태</th>
                      <th className="px-4 py-3 text-center">관리자</th>
                      <th className="px-4 py-3 text-center">관리</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 dark:divide-stone-700">
                    {users.length === 0 ? (
                      <tr><td colSpan={5} className="text-center py-10 text-stone-400">유저 없음</td></tr>
                    ) : users.map((u) => (
                      <tr key={u.id} className={`hover:bg-stone-50 dark:hover:bg-stone-700/30 ${u.is_banned ? "opacity-50" : ""}`}>
                        <td className="px-4 py-3 font-medium text-stone-800 dark:text-stone-100">{u.nickname}</td>
                        <td className="px-4 py-3 text-stone-400 text-xs">{new Date(u.created_at).toLocaleDateString("ko-KR")}</td>
                        <td className="px-4 py-3 text-center">
                          {u.is_banned
                            ? <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-600 text-xs font-medium">차단됨</span>
                            : <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-600 text-xs font-medium">정상</span>
                          }
                        </td>
                        <td className="px-4 py-3 text-center">
                          {u.is_admin
                            ? <span className="px-2 py-0.5 rounded-full bg-teal-100 text-teal-700 text-xs font-medium">관리자</span>
                            : <span className="px-2 py-0.5 rounded-full bg-stone-100 text-stone-400 text-xs">일반</span>
                          }
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex items-center gap-1 justify-center">
                            <button
                              onClick={() => handleToggleBan(u.id, u.is_banned)}
                              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                                u.is_banned ? "bg-green-50 hover:bg-green-100 text-green-600" : "bg-orange-50 hover:bg-orange-100 text-orange-500"
                              }`}
                            >
                              {u.is_banned ? "차단 해제" : "차단"}
                            </button>
                            <button
                              onClick={() => handleToggleAdmin(u.id, u.is_admin)}
                              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                                u.is_admin ? "bg-red-50 hover:bg-red-100 text-red-500" : "bg-teal-50 hover:bg-teal-100 text-teal-600"
                              }`}
                            >
                              {u.is_admin ? "권한 제거" : "관리자"}
                            </button>
                          </div>
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
