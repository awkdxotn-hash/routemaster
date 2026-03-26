import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";

export function useLike(routeId: string) {
  const { user } = useAuth();
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (!routeId) return;
    fetchData();
  }, [routeId, user?.id]);

  async function fetchData() {
    const { count } = await supabase
      .from("route_likes")
      .select("*", { count: "exact", head: true })
      .eq("route_id", routeId);
    setLikes(count ?? 0);

    if (user) {
      const { data } = await supabase
        .from("route_likes")
        .select("id")
        .eq("route_id", routeId)
        .eq("user_id", user.id)
        .maybeSingle();
      setLiked(!!data);
    } else {
      setLiked(false);
    }
  }

  const toggle = async () => {
    if (!user) return;
    if (liked) {
      await supabase.from("route_likes").delete()
        .eq("route_id", routeId).eq("user_id", user.id);
      setLikes((n) => Math.max(0, n - 1));
      setLiked(false);
    } else {
      await supabase.from("route_likes").insert({ route_id: routeId, user_id: user.id });
      setLikes((n) => n + 1);
      setLiked(true);
    }
  };

  return { likes, liked, toggle };
}
