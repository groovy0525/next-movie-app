import Head from "next/head";

interface SeoProps {
  title: string;
}

function Seo({ title }: SeoProps) {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
}

export default Seo;
