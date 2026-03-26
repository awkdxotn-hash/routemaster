-- ============================================================
-- RouteMaster — Supabase Schema
-- Supabase SQL Editor에 붙여넣고 실행하세요
-- ============================================================

-- 1. profiles (auth.users 확장)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  nickname text not null,
  is_admin boolean default false,
  created_at timestamptz default now()
);
alter table public.profiles enable row level security;
create policy "profiles: 전체 조회 허용" on public.profiles for select using (true);
create policy "profiles: 본인만 수정" on public.profiles for update using (auth.uid() = id);

-- 2. route_likes
create table public.route_likes (
  id uuid default gen_random_uuid() primary key,
  route_id text not null,
  user_id uuid references auth.users on delete cascade not null,
  created_at timestamptz default now(),
  unique(route_id, user_id)
);
alter table public.route_likes enable row level security;
create policy "route_likes: 전체 조회" on public.route_likes for select using (true);
create policy "route_likes: 인증 유저 추가" on public.route_likes for insert with check (auth.uid() = user_id);
create policy "route_likes: 본인 삭제" on public.route_likes for delete using (auth.uid() = user_id);

-- 3. route_reviews
create table public.route_reviews (
  id uuid default gen_random_uuid() primary key,
  route_id text not null,
  user_id uuid references auth.users on delete cascade not null,
  author text not null,
  country text,
  rating integer not null check (rating between 1 and 5),
  text text not null,
  created_at timestamptz default now()
);
alter table public.route_reviews enable row level security;
create policy "route_reviews: 전체 조회" on public.route_reviews for select using (true);
create policy "route_reviews: 인증 유저 추가" on public.route_reviews for insert with check (auth.uid() = user_id);
create policy "route_reviews: 본인 삭제" on public.route_reviews for delete using (auth.uid() = user_id);
create policy "route_reviews: 관리자 삭제" on public.route_reviews for delete using (
  (select is_admin from public.profiles where id = auth.uid())
);

-- 4. posts
create table public.posts (
  id uuid default gen_random_uuid() primary key,
  category text not null,
  title text not null,
  content text not null,
  user_id uuid references auth.users on delete cascade not null,
  author text not null,
  country text,
  views integer default 0,
  likes integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table public.posts enable row level security;
create policy "posts: 전체 조회" on public.posts for select using (true);
create policy "posts: 인증 유저 추가" on public.posts for insert with check (auth.uid() = user_id);
create policy "posts: 본인 수정" on public.posts for update using (auth.uid() = user_id);
create policy "posts: 본인 삭제" on public.posts for delete using (auth.uid() = user_id);
create policy "posts: 관리자 삭제" on public.posts for delete using (
  (select is_admin from public.profiles where id = auth.uid())
);

-- 5. comments
create table public.comments (
  id uuid default gen_random_uuid() primary key,
  post_id uuid references public.posts on delete cascade not null,
  user_id uuid references auth.users on delete cascade not null,
  author text not null,
  country text,
  content text not null,
  created_at timestamptz default now()
);
alter table public.comments enable row level security;
create policy "comments: 전체 조회" on public.comments for select using (true);
create policy "comments: 인증 유저 추가" on public.comments for insert with check (auth.uid() = user_id);
create policy "comments: 본인 삭제" on public.comments for delete using (auth.uid() = user_id);
create policy "comments: 관리자 삭제" on public.comments for delete using (
  (select is_admin from public.profiles where id = auth.uid())
);

-- 6. post_likes
create table public.post_likes (
  id uuid default gen_random_uuid() primary key,
  post_id uuid references public.posts on delete cascade not null,
  user_id uuid references auth.users on delete cascade not null,
  created_at timestamptz default now(),
  unique(post_id, user_id)
);
alter table public.post_likes enable row level security;
create policy "post_likes: 전체 조회" on public.post_likes for select using (true);
create policy "post_likes: 인증 유저 추가" on public.post_likes for insert with check (auth.uid() = user_id);
create policy "post_likes: 본인 삭제" on public.post_likes for delete using (auth.uid() = user_id);

-- 7. 신규 유저 → profiles 자동 생성 트리거
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, nickname)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'nickname', split_part(new.email, '@', 1))
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 8. 조회수 증가 RPC (인증 없이 호출 가능)
create or replace function public.increment_post_views(p_post_id uuid)
returns void
language sql
security definer
as $$
  update public.posts set views = views + 1 where id = p_post_id;
$$;
grant execute on function public.increment_post_views(uuid) to anon, authenticated;

-- ============================================================
-- 최초 관리자 설정 방법:
-- 회원가입 후 아래 쿼리에서 이메일을 본인 이메일로 바꿔 실행:
-- update public.profiles set is_admin = true
--   where id = (select id from auth.users where email = 'your@email.com');
-- ============================================================
