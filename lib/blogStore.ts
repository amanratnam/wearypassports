import { BlogPost } from "@/data/blogPosts";

const STORAGE_KEY = "wp_user_blogs";

export interface UserBlogPost extends BlogPost {
  isUserPost: true;
  publishedAt: string;
}

export function getUserPosts(): UserBlogPost[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveUserPost(post: Omit<UserBlogPost, "isUserPost" | "publishedAt">): UserBlogPost {
  const stored = getUserPosts();
  const newPost: UserBlogPost = {
    ...post,
    isUserPost: true,
    publishedAt: new Date().toISOString(),
  };
  // Replace if slug exists, otherwise prepend
  const idx = stored.findIndex((p) => p.slug === post.slug);
  if (idx >= 0) stored[idx] = newPost;
  else stored.unshift(newPost);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  return newPost;
}

export function getUserPost(slug: string): UserBlogPost | null {
  return getUserPosts().find((p) => p.slug === slug) ?? null;
}

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 60);
}
