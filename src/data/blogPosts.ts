export interface BlogPost {
  slug: string;
  title: string;
  headline: string;
  metaDescription: string;
  author: string;
  authorRole: string;
  authorCredentials: string;
  date: string;
  datePublished: string;
  dateModified: string;
  category: string;
  readTime: string;
  excerpt: string;
  relatedTreatmentUrl?: string;
  relatedTreatmentName?: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "clear-aligners-cost-bangalore",
    title: "Clear Aligners Cost in Bangalore (2026 Guide) | Aureva Dental Hennur",
    headline: "Clear Aligners Cost in Bangalore (2026 Guide) | Aureva Dental Hennur",
    metaDescription: "Transparent breakdown of clear aligners cost in Bangalore (₹55,000 to ₹2,50,000+), invisible braces brands, 3D digital scans, and timelines by Dr. Shweta Singh at Aureva Dental.",
    author: "Dr. Shweta Singh, BDS",
    authorRole: "Clinical Director & Dental Surgeon",
    authorCredentials: "Dr. Shweta Singh, BDS — Clinical Director, Aureva Dental",
    date: "September 2026",
    datePublished: "2026-09-01",
    dateModified: "2026-09-07",
    category: "Orthodontics & Clear Aligners",
    readTime: "5 min read",
    excerpt: "A transparent breakdown of clear aligners cost in Bangalore (₹55,000 to ₹2,50,000+), factors determining price, invisible braces vs. metal brackets, and what to expect during your 3D digital smile scan.",
    relatedTreatmentUrl: "/treatments/clear-aligners",
    relatedTreatmentName: "Clear Aligners & Invisible Braces"
  }
];

export function getAllBlogPosts(): BlogPost[] {
  return BLOG_POSTS;
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
