import { Metadata } from "next";
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

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://chessnaami.ir";

  const res = await fetch(`${baseUrl}/admin/api/articles/${params.id}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRET_TOKEN}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    return {
      title: "مقاله یافت نشد",
      description: "خطا در بارگذاری مقاله",
    };
  }

  const article: Article = await res.json();

  return {
    title: article.title,
    description: article.desc,
    openGraph: {
      title: article.title,
      description: article.desc,
      images: [
        {
          url: `${article.titleImage}`,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      type: "article",
      url: `${baseUrl}/articles/${params.id}`,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.desc,
      images: [`${baseUrl}${article.titleImage}`],
    },
  };
}

export default function MainArticlesDetailsPage() {
  return <ArticleClient />;
}
