import ArticleClient from "./ArticleClient";
import { connectToDatabase } from "@/lib/mongodb";
import Article from "@/models/Article";

/**
 * 🚀 Disable static generation
 * This prevents filename-too-long errors
 */
export const dynamic = "force-dynamic";

interface ArticleType {
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

function decodeSlug(slug: string): string {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

/**
 * ✅ Next.js 15 requires params to be Promise
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://chessnaami.ir";

  try {
    await connectToDatabase();

    const slug = decodeSlug(id);

    const article = await Article.findOne({
      title: slug,
    }).lean<ArticleType>();

    if (!article) {
      return {
        title: "مقاله یافت نشد - ChessNaami",
        description: "مقاله مورد نظر وجود ندارد یا حذف شده است",
      };
    }

    const imageUrl = article.titleImage.startsWith("http")
      ? article.titleImage
      : `${baseUrl}${article.titleImage}`;

    return {
      title: `${article.title} - ChessNaami`,
      description: article.desc,
      openGraph: {
        title: article.title,
        description: article.desc,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: article.title,
          },
        ],
        type: "article",
        url: `${baseUrl}/articles/${encodeURIComponent(article.title)}`,
        siteName: "ChessNaami",
      },
      twitter: {
        card: "summary_large_image",
        title: article.title,
        description: article.desc,
        images: [imageUrl],
      },
      alternates: {
        canonical: `${baseUrl}/articles/${encodeURIComponent(article.title)}`,
      },
    };
  } catch (err) {
    console.error("Metadata error:", err);
    return {
      title: "خطا در بارگذاری مقاله - ChessNaami",
      description:
        "متاسفانه مشکلی در بارگذاری مقاله به وجود آمده است",
    };
  }
}

export default function MainArticlesDetailsPage() {
  return <ArticleClient />;
}
