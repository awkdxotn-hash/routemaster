import { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";

export type PostCategory = "여행후기" | "질문/답변" | "정보공유" | "자유게시판";

export interface Comment {
  id: string;
  post_id: string;
  author: string;
  country?: string;
  content: string;
  date: string;
}

export interface Post {
  id: string;
  category: PostCategory;
  title: string;
  content: string;
  author: string;
  country?: string;
  date: string;
  views: number;
  likes: number;
  comments: Comment[];
}

function mapPost(row: Record<string, unknown>): Post {
  const comments = ((row.comments as Record<string, unknown>[]) ?? []).map(mapComment);
  return {
    id: row.id as string,
    category: row.category as PostCategory,
    title: row.title as string,
    content: row.content as string,
    author: row.author as string,
    country: row.country as string | undefined,
    date: row.created_at as string,
    views: row.views as number,
    likes: row.likes as number,
    comments,
  };
}

function mapComment(row: Record<string, unknown>): Comment {
  return {
    id: row.id as string,
    post_id: row.post_id as string,
    author: row.author as string,
    country: row.country as string | undefined,
    content: row.content as string,
    date: row.created_at as string,
  };
}

// ── 게시판 목록용 훅 ──────────────────────────────────────
export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    setLoading(true);
    const { data } = await supabase
      .from("posts")
      .select("*, comments(*)")
      .order("created_at", { ascending: false });
    setPosts((data ?? []).map(mapPost));
    setLoading(false);
  }

  return { posts, loading, refetch: fetchPosts };
}

// ── 개별 게시글용 훅 ──────────────────────────────────────
export function usePost(id: string) {
  const { user } = useAuth();
  const [post, setPost] = useState<Post | null>(null);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const viewedRef = useRef(false);

  useEffect(() => {
    if (!id) return;
    fetchPost();
  }, [id]);

  useEffect(() => {
    if (!id || !user) { setLiked(false); return; }
    supabase
      .from("post_likes")
      .select("id")
      .eq("post_id", id)
      .eq("user_id", user.id)
      .maybeSingle()
      .then(({ data }) => setLiked(!!data));
  }, [id, user?.id]);

  async function fetchPost() {
    setLoading(true);
    const { data } = await supabase
      .from("posts")
      .select("*, comments(*)")
      .eq("id", id)
      .single();
    if (data) {
      setPost(mapPost(data as Record<string, unknown>));
      if (!viewedRef.current) {
        viewedRef.current = true;
        await supabase.rpc("increment_post_views", { p_post_id: id });
      }
    }
    setLoading(false);
  }

  const toggleLike = async () => {
    if (!user || !post) return;
    if (liked) {
      await supabase.from("post_likes").delete()
        .eq("post_id", id).eq("user_id", user.id);
      await supabase.from("posts").update({ likes: Math.max(0, post.likes - 1) }).eq("id", id);
      setPost((p) => p ? { ...p, likes: Math.max(0, p.likes - 1) } : p);
      setLiked(false);
    } else {
      await supabase.from("post_likes").insert({ post_id: id, user_id: user.id });
      await supabase.from("posts").update({ likes: post.likes + 1 }).eq("id", id);
      setPost((p) => p ? { ...p, likes: p.likes + 1 } : p);
      setLiked(true);
    }
  };

  const addComment = async (content: string, author: string, country?: string) => {
    if (!user) return;
    const { data } = await supabase
      .from("comments")
      .insert({ post_id: id, user_id: user.id, author, content, country })
      .select()
      .single();
    if (data) {
      setPost((p) => p ? { ...p, comments: [...p.comments, mapComment(data as Record<string, unknown>)] } : p);
    }
  };

  return { post, liked, loading, toggleLike, addComment, refetch: fetchPost };
}

// ── 게시글 생성 ───────────────────────────────────────────
export async function createPost(data: {
  category: PostCategory;
  title: string;
  content: string;
  author: string;
  country?: string;
  user_id: string;
}): Promise<Post | null> {
  const { data: inserted } = await supabase
    .from("posts")
    .insert({ ...data, views: 0, likes: 0 })
    .select()
    .single();
  if (!inserted) return null;
  return mapPost({ ...inserted as Record<string, unknown>, comments: [] });
}

// ── 게시글 삭제 ───────────────────────────────────────────
export async function deletePost(id: string): Promise<void> {
  await supabase.from("posts").delete().eq("id", id);
}

// ── 관리자용 전체 조회 ────────────────────────────────────
export async function getAllPostsAdmin(): Promise<Post[]> {
  const { data } = await supabase
    .from("posts")
    .select("*, comments(*)")
    .order("created_at", { ascending: false });
  return (data ?? []).map(mapPost);
}
