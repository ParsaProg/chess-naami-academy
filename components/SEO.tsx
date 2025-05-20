import Head from 'next/head';

export default function SEO({ title, description, ogImage }: {title: string, description: string, ogImage: string}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://chessnaami.ir" />
    </Head>
  );
}