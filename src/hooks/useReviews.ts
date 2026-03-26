import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";

export interface Review {
  id: string;
  routeId: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  country?: string;
}

function mapRow(row: Record<string, unknown>): Review {
  return {
    id: row.id as string,
    routeId: row.route_id as string,
    author: row.author as string,
    rating: row.rating as number,
    text: row.text as string,
    date: row.created_at as string,
    country: row.country as string | undefined,
  };
}

export function useReviews(routeId: string) {
  const { user, profile } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    if (!routeId) return;
    supabase
      .from("route_reviews")
      .select("*")
      .eq("route_id", routeId)
      .order("created_at", { ascending: false })
      .then(({ data }) => setReviews((data ?? []).map(mapRow)));
  }, [routeId]);

  const addReview = async (data: Omit<Review, "id" | "routeId" | "date">) => {
    if (!user) return;
    const { data: inserted } = await supabase
      .from("route_reviews")
      .insert({
        route_id: routeId,
        user_id: user.id,
        author: profile?.nickname ?? data.author,
        country: data.country,
        rating: data.rating,
        text: data.text,
      })
      .select()
      .single();
    if (inserted) setReviews((prev) => [mapRow(inserted), ...prev]);
  };

  return { reviews, addReview };
}

export async function getAllReviews(): Promise<Review[]> {
  const { data } = await supabase
    .from("route_reviews")
    .select("*")
    .order("created_at", { ascending: false });
  return (data ?? []).map(mapRow);
}

export async function deleteReview(id: string): Promise<void> {
  await supabase.from("route_reviews").delete().eq("id", id);
}
