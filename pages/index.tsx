import Head from "next/head";
import { useEffect, useState } from "react";
import { blogParams } from "utils/zodParams";

const ogImageUrl = `${
  process.env.VERCEL_URL ? "https://" + process.env.VERCEL_URL : ""
}/api/landing`;

export default function Page() {
  const [nonce, setNonce] = useState(Math.random());

  useEffect(() => {
    // randomize nonce on window focus
    const handleFocus = () => setNonce(Math.random());
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);
  return (
    <div>
      <Head>
        <meta name="og:title" content="tRPC OG Image Playground" />
        <meta
          name="og:description"
          content="Playground for OG Image Generation using @vercel/og-image"
        />
        <meta name="og:image" content={ogImageUrl} />
        <meta data-rh="true" name="twitter:image" content={ogImageUrl} />
      </Head>
      <h1>A page with Open Graph Image.</h1>
      <main className="grid grid-cols-2 grid-flow-row">
        <div>
          <h2>Landing</h2>
          <img src={`/api/landing?random=${nonce}`} />
        </div>
        <div>
          <h2>Blog</h2>
          <img
            src={`/api/blog?${blogParams.toSearchString({
              title: "Lorem ipsum dolor sit amet consetetur sadipscing elitr",
              minRead: 69,
              isVideo: true,
            })}&random=${nonce}`}
          />
        </div>
      </main>
    </div>
  );
}
