import ArticleClient from "./ArticleClient";

interface Article {
  _id: string;
  title: string;
  content: string;
  cats: string[];
  titleImage: string;
  views: string;
  likes: string;
  importantText: string;
  desc: string;
  time: string;
  publishDate: string;
  publisherName: string;
  publisherImage: string;
  publisherTag: string;
  comments: string;
  createdAt: string;
  isSpecial: boolean;
}

// Helper function to decode URL parameters
function decodeSlug(slug: string): string {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

// SERVER-SIDE METADATA
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://chessnaami.ir";
  const { id } = await params;
  const slug = decodeSlug(id);

  try {
    const res = await fetch(`${baseUrl}/admin/api/articles`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRET_TOKEN}`,
      },
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Article fetch failed");

    const articles = await res.json();
    const mainArticle = articles.find((article: Article) => 
      article.title === slug || 
      decodeURIComponent(article.title) === slug
    );

    if (!mainArticle) {
      return {
        title: "مقاله یافت نشد - ChessNaami",
        description: "مقاله مورد نظر وجود ندارد یا حذف شده است",
      };
    }

    // Ensure image URL is absolute
    const imageUrl = mainArticle.titleImage.startsWith('http') 
      ? mainArticle.titleImage 
      : `${baseUrl}${mainArticle.titleImage}`;

    return {
      title: `${mainArticle.title} - ChessNaami`,
      description: mainArticle.desc,
      openGraph: {
        title: mainArticle.title,
        description: mainArticle.desc,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: mainArticle.title,
          },
        ],
        type: "article",
        url: `${baseUrl}/articles/${encodeURIComponent(mainArticle.title)}`,
        siteName: "ChessNaami",
      },
      twitter: {
        card: "summary_large_image",
        title: mainArticle.title,
        description: mainArticle.desc,
        images: [imageUrl],
      },
      alternates: {
        canonical: `${baseUrl}/articles/${encodeURIComponent(mainArticle.title)}`,
      },
    };
  } catch (err) {
    console.error("Metadata generation error:", err);
    return {
      title: "خطا در بارگذاری مقاله - ChessNaami",
      description: "متاسفانه مشکلی در بارگذاری مقاله به وجود آمده است",
    };
  }
}

// Generate static params for better performance
export async function generateStaticParams() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://chessnaami.ir";
    const res = await fetch(`${baseUrl}/admin/api/articles`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRET_TOKEN}`,
      },
      // Cache for 1 hour for static generation
      next: { revalidate: 3600 }
    });

    if (!res.ok) throw new Error("Articles fetch failed");

    const articles = await res.json();
    
    return articles.map((article: Article) => ({
      id: encodeURIComponent(article.title),
    }));
  } catch (err) {
    console.error("Static params generation error:", err);
    return [];
  }
}

export default async function MainArticlesDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  return <ArticleClient />;
}