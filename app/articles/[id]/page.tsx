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

interface ArticlePageParams {
  id: string;
}

interface ArticlePageProps {
  params: ArticlePageParams;
}

// SERVER-SIDE METADATA
export async function generateMetadata(props: {
  params: { id: string };
}): Promise<Metadata> {
  const { params } = props;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://chessnaami.ir";
  const windowEncodeIdPathPart = params.id;
  const slug = decodeURIComponent(windowEncodeIdPathPart);

  try {
    const res = await fetch(`${baseUrl}/admin/api/articles`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRET_TOKEN}`,
      },
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Article fetch failed");

    const article = await res.json();
    const mainArticle = article.finde((value: Article) => value.title === slug);

    return {
      title: mainArticle.title,
      description: mainArticle.desc,
      openGraph: {
        title: mainArticle.title,
        description: mainArticle.desc,
        images: [
          {
            url: `${mainArticle.titleImage}`,
            width: 1200,
            height: 630,
            alt: mainArticle.title,
          },
        ],
        type: "article",
        url: `${baseUrl}/articles/${params.id}`,
      },
      twitter: {
        card: "summary_large_image",
        title: mainArticle.title,
        description: mainArticle.desc,
        images: [`${baseUrl}${mainArticle.titleImage}`],
      },
    };
  } catch (err) {
    console.error(err);
    return {
      title: "مقاله یافت نشد",
      description: "خطا در بارگذاری مقاله",
    };
  }
}

export default function MainArticlesDetailsPage() {
  return <ArticleClient />;
}
